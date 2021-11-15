const Tracing = require("../models/Tracing.model");
const Users = require("../models/Users.model");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const geolin = require("geolib");
const capitalize = require("../utils/CapitalizeFirst");

function getMinutes(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}

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
              const dateToday = new Date();
              const contactUser = {
                userID: userID,
                geolocation: geolocation,
                logDate: dateToday,
                time: 0,
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
    const userData = await Users.findOne({ _id: _id });
    const { realTimeLogs, Logs } = userData;
    const updatedData = [];
    for (let x = 0; x < realTimeLogs.length; x++) {
      const findUsers = Logs.find((user) => {
        if (user.userID === realTimeLogs[x].userID) {
          const dateToday = new Date();
          const logDate = new Date(user.logDate);
          if (`${dateToday}`.substr(0, 15) == `${logDate}`.substr(0, 15)) {
            return user;
          }
        }
      });

      if (findUsers) {
        updatedData.push({
          userID: findUsers.userID,
          logDate: findUsers.logDate,
          time: findUsers.time + realTimeLogs[x].time,
          status: realTimeLogs[x].status,
          exposure: realTimeLogs[x].exposure,
        });
      } else {
        updatedData.push({
          userID: realTimeLogs[x].userID,
          logDate: realTimeLogs[x].logDate,
          time: realTimeLogs[x].time,
          status: realTimeLogs[x].status,
          exposure: realTimeLogs[x].exposure,
        });
      }
    }
    for (let x = 0; x < Logs.length; x++) {
      const findUsers = updatedData.find((user) => {
        if (user.userID === Logs[x].userID) {
          return user;
        }
      });
      if (!findUsers) {
        updatedData.push(Logs[x]);
      }
    }
    console.log(updatedData);
    await Users.updateOne(
      { _id: _id },
      { realTimeLogs: [], Logs: updatedData }
    );

    return res.status(201).send({
      title: "Successfully Remove!",
      message: "User tracing Remove!",
      statusCode: 201,
      data: deleteUser,
    });
  } catch (err) {
    console.log(err);
    // ERROR.error(`${err.message} Users Controller`);
    return res.status(400).send({
      title: "Someting went wrong!",
      message: "Someting went wrong. Please try again or try again later.",
      statusCode: 400,
    });
  }
};

const updateLogs = async (UID, LOGS) => {
  const findUser = await Users.findOne({ _id: UID });
  let updatedData = [];
  if (findUser.Logs.length === 0) {
    updatedData.push({
      userID: LOGS.userID,
      logDate: LOGS.logDate,
      time: LOGS.time,
      status: LOGS.status,
      exposure: LOGS.exposure,
    });
  } else {
    for (let i = 0; i < findUser.Logs.length; i++) {
      const userLogs = findUser.Logs[i];
      if (LOGS.userID === userLogs.userID) {
        updatedData.push({
          userID: userLogs.userID,
          logDate: userLogs.logDate,
          time: userLogs.time + LOGS.time,
          status: userLogs.status,
          exposure: userLogs.exposure,
        });
      } else {
        updatedData.push({
          userID: LOGS.userID,
          logDate: LOGS.logDate,
          time: LOGS.time,
          status: LOGS.status,
          exposure: LOGS.exposure,
        });
      }
    }
  }
  await Users.updateOne({ _id: UID }, { Logs: updatedData });
};

exports.updateTracing = async (req, res) => {
  try {
    const { _id } = req.params;

    const userData = await Users.findOne({ _id: _id });

    const { realTimeLogs } = userData;
    let updatedData = [];

    for (let i = 0; i < realTimeLogs.length; i++) {
      const { userID, logDate, time } = realTimeLogs[i];
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
          const dateToday = new Date();
          const min = getMinutes(logDate, dateToday);
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
            time: min,
          };
          updatedData.push(update);
          await Users.updateOne({ _id: _id }, { realTimeLogs: updatedData });
        } else {
          await updateLogs(_id, realTimeLogs[i]);
          await Users.updateOne({ _id: _id }, { realTimeLogs: updatedData });
        }
      } else {
        await updateLogs(_id, realTimeLogs[i]);
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
