const Shares = require("../models/Shares.model");
const Users = require("../models/Users.model");
const Data = require("../models/Data.model");
const Cases = require("../models/Cases.model");

exports.shareLogs = async (req, res) => {
  try {
    const { userID, status } = req.body;
    const user = await Users.findOne({ _id: userID });
    const newShare = new Shares({
      userID: userID,
      shareType: "Logs",
      shareDate: new Date(),
      shares: user.Logs,
    });
    const saveShare = await newShare.save();

    const userLogs = user.Logs;
    if (status === "Recovered" || status === "Vacinated") {
      const newData = new Data({
        userID: user._id,
        name: `${user.firstName} ${user.lastName}`,
        date: new Date(),
        totalVisits: user.Visits.length,
        totalLogs: user.Logs.length,
        statusType: status,
        time: parseInt(userLogs[i].time),
      });
      await newData.save();
    } else {
      let totalExposed = 0;
      let totalPotential = 0;
      for (let i = 0; i < userLogs.length; i++) {
        const userData = await Users.findOne({ _id: userLogs[i].userID });
        const config = {
          userID: userData._id,
          name: `${userData.firstName} ${userData.lastName}`,
          date: new Date(),
          totalVisits: userData.Visits.length,
          totalLogs: userData.Logs.length,
          time: parseInt(userLogs[i].time),
        };
        if (status === "Infected" || status === "Death") {
          if (parseInt(userLogs[i].time) >= 5) {
            const newData = new Data({
              ...config,
              statusType: "Exposed",
            });
            await newData.save();
            totalExposed = 1 + totalExposed;
          } else {
            const newData = new Data({
              ...config,
              statusType: "Potential",
            });
            await newData.save();
            totalPotential = 1 + totalPotential;
          }
        } else if (status === "Exposed") {
          if (parseInt(userLogs[i].time) >= 5) {
            const newData = new Data({
              ...config,
              statusType: "Potential",
            });
            await newData.save();
            totalPotential = 1 + totalPotential;
          }
        }
      }

      let exposure;
      if (totalExposed >= 20 && totalPotential >= 20) {
        exposure = "Broad";
      } else if (totalExposed >= 10 && totalPotential >= 10) {
        exposure = "Extensive";
      } else {
        exposure = "Limited";
      }

      if (totalExposed !== 0 || totalPotential !== 0) {
        const newCase = new Cases({
          userID: user._id,
          name: `${user.firstName} ${user.lastName}`,
          municipality: user.municipality,
          barangay: user.barangay,
          date: new Date(),
          totalExposed: totalExposed,
          totalPotential: totalPotential,
          exposure: exposure,
          status: status,
        });
        await newCase.save();
      }
    }

    return res.status(201).send({
      title: "Successfully Added!",
      message: "Shared Successfully Added!",
      statusCode: 201,
      data: saveShare,
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

exports.getCases = async (req, res) => {
  try {
    const getAll = await Cases.find();
    return res.status(201).send({
      title: "Successfully Added!",
      message: "Shared Successfully Added!",
      statusCode: 201,
      data: getAll,
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
