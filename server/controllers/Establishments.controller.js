const Establishments = require("../models/Establishments.model");
const Users = require("../models/Users.model");
const capitalize = require("../utils/CapitalizeFirst");
const Vonage = require("@vonage/server-sdk");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcryptjs");

const vonage = new Vonage({
  apiKey: process.env.vonageKey,
  apiSecret: process.env.vonageSecret,
});

exports.addEstablishment = async (req, res) => {
  try {
    const { name, municipality, barangay, email, password, number } = req.body;

    const emailExist = await Establishments.findOne({
      email: email.toLowerCase(),
    });
    if (emailExist)
      return res.status(409).send({
        title: "Email is Used!",
        message: `Email is already in use.`,
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

    const errorPass = passwordComplexity(complexityOptions).validate(password);

    if (errorPass.error)
      return res.status(406).send({
        title: "Invalid Password!",
        message:
          "Password must be atleast 8 characters, 1 number, 1 lowercase and uppercase, 1 symbol",
        statusCode: 406,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEstab = new Establishments({
      email: email.toLowerCase(),
      password: hashedPassword,
      estabName: name,
      estabAddress: `${barangay}, ${municipality}`,
      number: number,
    });
    const save = await newEstab.save();

    return res.status(201).send({
      title: "Successfully Added!",
      message: "Establishment successfully added!",
      statusCode: 201,
      data: save,
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

exports.addQrCode = async (req, res) => {
  try {
    const update = await Establishments.updateOne(
      { _id: req.body.id },
      {
        qrcode: req.files["qrcode"][0].path,
      }
    );

    const text = `Your QR Code is ready. http://localhost:8082/${req.files["qrcode"][0].path} click the link to download.`;
    vonage.message.sendSms(
      "Suresafe",
      `+63${req.body.number}`,
      text,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
          }
        }
      }
    );

    return res.status(201).send({
      title: "Successfully Updated!",
      message: "User info Updated!",
      link: `http://localhost:8082/${req.files["qrcode"][0].path}`,
      statusCode: 201,
      data: update,
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

exports.addVisit = async (req, res) => {
  try {
    const { estabID, userID } = req.body;

    const findEstab = await Establishments.findById(estabID);
    const date = new Date();

    if (!findEstab)
      return res.status(404).send({
        title: "Establishiment don't Exist",
        message:
          "Establishment don't exist, please try again or contact the establishiment owner.",
        statusCode: 404,
      });

    const userUpdate = await Users.updateOne(
      { _id: userID },
      {
        $push: {
          Visits: {
            visitDate: date,
            estabID: findEstab._id,
            estabName: findEstab.estabName,
            estabAddress: findEstab.estabAddress,
          },
        },
      }
    );

    return res.status(201).send({
      title: "Successfully Added!",
      message: `${findEstab.estabName} successfully added!`,
      statusCode: 201,
      data: userUpdate,
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

exports.getVisits = async (req, res) => {
  try {
    const { userID } = req.params;
    const { filter } = req.query;
    const dateToday = new Date();

    const user = await Users.findById(userID);
    // let arr = [];
    // const { Visits } = user;
    // if (filter == "Today") {
    //   for (let i = 0; i < Visits.length; i++) {
    //     const visitDate = new Date(Visits[i].visitDate);
    //     if (
    //       visitDate.toString().substr(0, 15) ==
    //       dateToday.toString().substr(0, 15)
    //     ) {
    //       arr.push(Visits[i]);
    //     }
    //   }
    // } else if (filter == "All") {
    //   arr = Visits;
    // }

    const fullAddress = `${capitalize.capitalize(
      user?.barangay
    )}, ${capitalize.capitalize(user?.municipality)}`;
    const fullName = `${user?.firstName} ${user?.lastName}`;

    const data = {
      Visits: user.Visits,
      address: fullAddress,
      name: fullName,
      total: user?.Visits.length,
    };

    return res.status(200).send({
      title: "Visits Retrived",
      message: "Visits successfully retrived",
      statusCode: 200,
      data: data,
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
