const Users = require("../models/Users.model");
const Tracing = require("../models/Tracing.model");
const Data = require("../models/Data.model");
const Cases = require("../models/Cases.model");
const Admin = require("../models/Admin.model");
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

    const emailExist = await Users.findOne({
      email: req.body.email.toLowerCase(),
    });
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
      userState: {
        status: "Covid Free",
        exposure: "Not Exposed",
      },
      role: "User",
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
    const user = await Users.findOne({ email: req.body.email.toLowerCase() });
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
    const { firstName, lastName, municipality, barangay, number, email, role } =
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
      role: role,
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

exports.changeRole = async (req, res) => {
  try {
    const { _id, role, code } = req.body;
    console.log("asghjfj");
    const getAdmins = await Admin.find();
    const codes = getAdmins[0]?.codes;
    const findCode = codes.find((value) => value.code === code);
    if (findCode) {
      if (findCode.used) {
        return res.status(400).send({
          title: `Code is Invalid`,
          message: `${code} is now used already.`,
          statusCode: 400,
          data: updateUser,
        });
      } else {
        const updateUser = await Users.updateOne(
          { _id },
          {
            role,
          }
        );
        const updatedCode = [];
        for (let i = 0; i < codes.length; i++) {
          if (codes[i].code === code) {
            updatedCode.push({
              code: codes[i].code,
              used: true,
            });
          } else {
            updatedCode.push({
              code: codes[i].code,
              used: codes[i].used,
            });
          }
        }
        await Users.updateOne(
          { _id: getAdmins[0]?._id },
          {
            codes: updatedCode,
          }
        );
        if (updateUser) {
          return res.status(201).send({
            title: `Successfully Changed`,
            message: `Your role is changed to ${role}. You can now add cases!`,
            statusCode: 201,
            data: updateUser,
          });
        }
      }
    } else {
      return res.status(405).send({
        title: `Code is Invalid`,
        message: `${code} is not a valid code. Please Try Again.`,
        statusCode: 405,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await Users.findOne({ _id: userID });
    if (findUser) {
      return res.status(201).send({
        title: `Retrived Notifications`,
        message: `Retrived Notifications`,
        statusCode: 201,
        data: findUser.notifications,
      });
    }
  } catch (err) {}
};

exports.getStatus = async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await Users.findOne({ _id: userID });
    const getData = await Data.find();
    const getCases = await Cases.find();
    const getUsers = await Users.find();
    const getTracing = await Tracing.find();

    let infected = 0;
    let exposed = 0;
    let recovered = 0;
    let potential = 0;
    let geotracing = getTracing.length;
    let users = getUsers.length;
    for (let i = 0; i < getCases.length; i++) {
      if (getCases[i].status === "Infected") {
        infected = 1 + infected;
      } else if (getCases[i].status === "Exposed") {
        exposed = 1 + exposed;
      }
    }
    for (let i = 0; i < getData.length; i++) {
      if (getData[i].statusType === "Potential") {
        potential = 1 + potential;
      } else if (getData[i].statusType === "Recovered") {
        recovered = 1 + recovered;
      }
    }

    return res.status(201).send({
      title: `Retrived Status`,
      message: `Retrived Status`,
      statusCode: 201,
      data: {
        userState: findUser.userState,
        infected,
        exposed,
        recovered,
        potential,
        geotracing,
        users,
        total: getCases.length,
        logs: findUser.Logs.length,
        visits: findUser.Visits.length,
        sharedLogs: findUser.sharedLogs.length,
        sharedVisits: findUser.sharedVisits.length,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.userID });
    const {
      _id,
      firstName,
      lastName,
      municipality,
      barangay,
      number,
      email,
      role,
      lastLogs,
      lastVisits,
    } = findUser;

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
      userID: _id,
      firstName: firstName,
      lastName: lastName,
      municipality: muni,
      barangay: brgy,
      number: `+63${number}`,
      email: email.toLowerCase(),
      role: role,
      lastVisits: lastVisits ? lastVisits : "None",
      lastLogs: lastLogs ? lastLogs : "None",
    };

    return res.status(200).json({
      message: "User data retrived!",
      data: DATA,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};
