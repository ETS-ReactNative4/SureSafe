const Users = require("../models/Users.model");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vonage = require("@vonage/server-sdk");
const passwordComplexity = require("joi-password-complexity");
const moment = require("moment");
const { ERROR, INFO } = require("../utils/logger");
const ilocosSur = require("../utils/IlocosSur.json");

const vonage = new Vonage({
  apiKey: process.env.vonageKey,
  apiSecret: process.env.vonageSecret,
});

exports.userCreate = async (req, res) => {
  try {
    console.log(req.body);
    const validation = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      agreement: Joi.boolean().required(),
    });

    // Request Validations
    const { error } = validation.validate(req.body);
    if (error)
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "Its look like your information is not accepted. Please try again.",
        statusCode: 401,
      });

    const emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(409).send({
        title: "Email is Used!",
        message: `Email is already in use. Please try use different email.`,
        statusCode: 409,
      });

    const complexityOptions = {
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    };

    const errorPass = passwordComplexity(complexityOptions).validate(
      req.body.password
    );

    if (errorPass.error)
      return res.status(406).send({
        title: "Invalid Password!",
        message:
          "Password must be atleast 8 characters, 1 number, 1 lowercase and uppercase, 1 symbol",
        statusCode: 406,
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
      email: req.body.email,
      password: hashedPassword,
      agreement: req.body.agreement,
    });

    const saveUser = await user.save();
    INFO.info(`User ${user._id} Created`);
    return res.status(201).json({
      user: user._id,
      title: "Successfully Created!",
      message:
        "Your accout is created. Please press ok to add your information.",
      statusCode: 201,
      data: saveUser,
    });
  } catch (err) {
    console.log(err);
    ERROR.error(`${err.message} Users Controller`);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

exports.addInfo = async (req, res) => {
  const { _id, firstName, lastName, municipality, barangay } = req.body;
  try {
    const validation = Joi.object({
      _id: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      municipality: Joi.string().required(),
      barangay: Joi.string().required(),
    });

    const { error } = validation.validate(req.body);
    if (error)
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "Its look like your information is not accepted. Please try again.",
        statusCode: 401,
      });

    if (!ilocosSur[municipality]) {
      return res.status(401).send({
        title: "Invalid Municipality!",
        message: `${municipality} is not a municipality in Ilocos Sur`,
        statusCode: 401,
      });
    } else if (!ilocosSur[municipality].barangay_list.includes(barangay)) {
      return res.status(401).send({
        title: "Invalid Barangay!",
        message: `${barangay} is not a barangay in ${municipality}`,
        statusCode: 401,
      });
    }

    const update = await Users.updateOne(
      { _id },
      {
        firstName,
        lastName,
        municipality,
        barangay,
      }
    );
    INFO.info(`User ${req.params._id} info is Updated!`);
    return res.status(200).send({
      title: "Successfully Updated!",
      message: "User info Updated!",
      statusCode: 200,
      data: update,
    });
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

exports.addNumber = async (req, res) => {
  const { _id, number, date } = req.body;
  try {
    const validation = Joi.object({
      _id: Joi.string().required(),
      number: Joi.number().required(),
      date: Joi.date().required(),
    });

    const { error } = validation.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error,
        statusCode: 400,
      });

    const code = Math.floor(1000 + Math.random() * 9000);
    const time = moment(date).add(5, "m").toDate();
    await Users.updateOne(
      { _id },
      {
        number,
        verify: {
          code,
          time,
        },
      }
    );

    const from = "SureSafe";
    const to = `63${number}`;
    const text = `${code} is your SureSafe verification code. Valid for 5 minutes.`;

    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        ERROR.error(`${err.message} Users Controller`);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message sent successfully.");
        } else {
          ERROR.error(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    });
    return res.status(200).send({
      message: "User number Updated! ",
      statusCode: 200,
    });
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    return res
      .status(400)
      .send({ message: "Someting went wrong.", statusCode: 400 });
  }
};

exports.checkOTP = async (req, res) => {
  const { _id, code, date } = req.body;
  try {
    const validation = Joi.object({
      _id: Joi.string().required(),
      code: Joi.number().required(),
      date: Joi.date().required(),
    });

    const { error } = validation.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error,
        statusCode: 400,
      });

    const user = await Users.findById(_id);

    if (user) {
      const userCode = user.verify.code;
      const userTime = user.verify.time;
      if (code == userCode) {
        if (moment(date).isAfter(userTime)) {
          return res.status(202).send({
            message: "User is Verified",
            verified: true,
            statusCode: 202,
          });
        } else {
          return res.status(401).send({
            message: "Code is Expired! Please Try Again.",
            verified: false,
            statusCode: 401,
          });
        }
      } else {
        return res.status(403).send({
          message: "Wrong code! Please Try Again.",
          verified: false,
          statusCode: 403,
        });
      }
    } else {
      return res.status(404).send({
        message: "User not Found.",
        verified: false,
        statusCode: 404,
      });
    }
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    return res
      .status(400)
      .send({ message: "Someting went wrong.", statusCode: 400 });
  }
};
