const Tracing = require("../models/Tracing.model");
const Users = require("../models/Users.model");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const geolin = require("geolib");
const capitalize = require("../utils/CapitalizeFirst");

const dateToday = new Date();

exports.addTracing = async (req, res) => {
  try {
    const { _id, geolocation } = req.body;
    const userExist = await Tracing.findOne({ userID: _id });

    if (userExist) {
      const updateUserGeo = await Tracing.updateOne(
        { userID: _id },
        { geolocation }
      );

      const usersTracing = await Tracing.find();
      const { longitude, latitude } = geolocation;

      for (let i = 0; i < usersTracing.length; i++) {
        const { getDistance } = geolin;

        if (usersTracing[i].userID != _id) {
          const from = { latitude: latitude, longitude: longitude };
          const to = {
            latitude: usersTracing[i].geolocation.latitude,
            longitude: usersTracing[i].geolocation.longitude,
          };
          const distance = getDistance(from, to, (accuracy = 0.01));

          console.log("METERS AWAY", distance - 3);
          if (distance - 3 < 1) {
            const user = await Users.findById(_id);
            const realtimelogs = await user.realTimeLogs;
            const { userID, geolocation } = usersTracing[i];
            let cache = 0;
            for (let x = 0; x < realtimelogs.length; x++) {
              if (realtimelogs[x].userID == userID) {
                cache = cache + 1;
              }
            }

            if (cache == 0) {
              const contactUser = {
                userID: userID,
                geolocation: geolocation,
              };
              await Users.updateOne(
                { _id: _id },
                { $push: { realTimeLogs: contactUser } }
              );
            }
          }
        }
      }

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
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

exports.removeTracing = async (req, res) => {
  try {
    const { _id } = req.body;

    const deleteUser = await Tracing.deleteOne({ userID: _id });

    return res.status(201).send({
      title: "Successfully Remove!",
      message: "User tracing Remove!",
      statusCode: 201,
      data: deleteUser,
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

exports.updateTracing = async (req, res) => {
  try {
    const { _id } = req.params;

    const userData = await Users.findOne({ _id: _id });

    const { realTimeLogs } = userData;
    let updatedData = [];

    for (let i = 0; i < realTimeLogs.length; i++) {
      const { userID, logDate } = realTimeLogs[i];
      const findUserTracing = await Tracing.findOne({ userID: userID });
      const thisUserTracing = await Tracing.findOne({ userID: _id });
      if (findUserTracing) {
        const { getDistance } = geolin;

        const from = {
          latitude: thisUserTracing?.geolocation.latitude,
          longitude: thisUserTracing?.geolocation.longitude,
        };
        const to = {
          latitude: findUserTracing.geolocation.latitude,
          longitude: findUserTracing.geolocation.longitude,
        };
        const distance = getDistance(from, to, (accuracy = 0.01));

        console.log("METERS AWAY", distance - 3);
        if (distance - 3 < 1) {
          const findUser = await Users.findById(userID);
          const update = {
            userID: userID,
            logDate: logDate,
            status: findUser?.userState?.status,
            exposure: findUser?.userState?.exposure,
            geolocation: {
              longitude: findUserTracing.geolocation.longitude,
              latitude: findUserTracing.geolocation.latitude,
            },
            time: dateToday,
          };
          updatedData.push(update);
          await Users.updateOne({ _id: _id }, { realTimeLogs: updatedData });
        } else {
          await Users.updateOne(
            { _id: _id },
            { $push: { Logs: realTimeLogs[i] } }
          );
          await Users.updateOne({ _id: _id }, { realTimeLogs: updatedData });
        }
      } else {
        await Users.updateOne(
          { _id: _id },
          { $push: { Logs: realTimeLogs[i] } }
        );
        await Users.updateOne({ _id: _id }, { realTimeLogs: updatedData });
      }
    }

    const latestData = await Users.findOne({ _id: _id });

    return res.status(201).send({
      title: "Successfully Updated Tracing!",
      message: "User tracing is Updated!",
      statusCode: 201,
      data: latestData.realTimeLogs,
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

exports.getTracing = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await Users.findById(userID);

    const fullAddress = `${capitalize.capitalize(
      user?.barangay
    )}, ${capitalize.capitalize(user?.municipality)}`;
    const fullName = `${user?.firstName} ${user?.lastName}`;

    const data = {
      Logs: user?.Logs,
      address: fullAddress,
      name: fullName,
      total: user?.Logs.length,
    };

    return res.status(200).send({
      title: "Successfully Retrieve Tracing!",
      message: "User tracing Retrieve!",
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
