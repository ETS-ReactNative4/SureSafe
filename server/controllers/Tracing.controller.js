const Tracing = require("../models/Tracing.model");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.sendGeo = async (req, res) => {
  const { _id, geolocation } = req.body;
  const userExist = await Tracing.findOne({ userID: _id });

  if (userExist) {
    const updateUserGeo = await Tracing.updateOne(
      { userID: _id },
      { geolocation }
    );

    return res.status(201).send({
      title: "Successfully Updated!",
      message: "User tracing Updated!",
      statusCode: 201,
      data: updateUserGeo,
    });
  }

  const newUser = new Tracing({ userID: _id, geolocation });
  const saveUser = await newUser.save();

  return res.status(201).send({
    title: "Successfully Added!",
    message: "User tracing Added!",
    statusCode: 201,
    data: saveUser,
  });
};
