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
      email: req.body.email.toLowerCase(),
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
    if (error) {
      console.log(error);
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "Its look like your information is not accepted. Please try again.",
        statusCode: 401,
      });
    }

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
    INFO.info(`User ${_id} info is Updated!`);
    return res.status(201).send({
      title: "Successfully Updated!",
      message: "User info Updated!",
      statusCode: 201,
      data: update,
    });
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    console.log(err);
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
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "Its look like your information is not accepted. Please try again.",
        statusCode: 401,
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
    return res.status(201).send({
      title: "Check your number!",
      message: `OTP has been sent to +63${number}. Press OK to enter your Code.`,
      statusCode: 201,
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
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "Its look like your information is not accepted. Please try again.",
        statusCode: 401,
      });

    const user = await Users.findById(_id);

    if (user) {
      const userCode = user.verify.code;
      const userTime = user.verify.time;
      if (code == userCode) {
        if (moment(userTime).isAfter(date)) {
          const token = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30d",
          });
          return res.status(202).send({
            title: "Code Verified!",
            message: "Code has been successfully verified!",
            token: token,
            loggedIN: "true",
            verified: "true",
            statusCode: 202,
          });
        } else {
          return res.status(401).send({
            title: "Code Expired!",
            message: "Code is Expired! Please Try Again.",
            verified: "false",
            statusCode: 401,
          });
        }
      } else {
        return res.status(403).send({
          title: "Invalid Code!",
          message: "Wrong code! Please Try Again.",
          verified: "false",
          statusCode: 403,
        });
      }
    } else {
      return res.status(404).send({
        title: "Invalid User!",
        message: "Invalid User! Please Try Again.",
        verified: "false",
        statusCode: 404,
      });
    }
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const validation = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    // Request Validations
    const { error } = validation.validate(req.body);
    if (error)
      return res.status(401).send({
        title: "Something went Wrong!",
        message:
          "It's look like your information is not accepted. Please try again.",
        statusCode: 401,
      });

    // Check if email exists
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({
        title: `"Email or Password is Invalid`,
        message: "Email or Password is wrong. Please try again.",
        statusCode: 404,
      });

    // Check if password valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(403).send({
        title: `Invalid Password`,
        message: "Password is Invalid. Please try again.",
        statusCode: 403,
      });

    // Create and assign token
    const payload = {
      _id: user._id,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .header("authToken", token)
      .send({
        title: `Logged In`,
        message: `Successfully Logged In! Welcome back ${user.firstName} ${user.lastName}`,
        statusCode: 200,
        userID: user._id,
        token: token,
        verified: "true",
        loggedIN: "true",
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

exports.getUser = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.userID });
    const { firstName, lastName, municipality, barangay, number, email } =
      findUser;

    function capitalize(words) {
      var separateWord = words.toLowerCase().split(" ");
      for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] =
          separateWord[i].charAt(0).toUpperCase() +
          separateWord[i].substring(1);
      }
      return separateWord.join(" ");
    }

    const brgy = capitalize(barangay.toLowerCase());
    const muni = capitalize(municipality.toLowerCase());
    const DATA = {
      firstName: firstName,
      lastName: lastName,
      municipality: muni,
      barangay: brgy,
      number: `+63${number}`,
      email: email.toLowerCase(),
    };

    return res.status(200).json({
      message: "User data retrived!",
      data: DATA,
      statusCode: 200,
    });
  } catch (err) {
    ERROR.error(`${err.message} Users Controller`);
    console.log(err);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};
