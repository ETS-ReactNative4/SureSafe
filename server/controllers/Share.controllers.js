const Shares = require("../models/Shares.model");
const Users = require("../models/Users.model");
const Data = require("../models/Data.model");
const Cases = require("../models/Cases.model");
const Establishments = require("../models/Establishments.model");
const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: process.env.vonageKey,
  apiSecret: process.env.vonageSecret,
});

exports.shareLogsExposed = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await Users.findOne({ _id: userID });

    const userLogs = user.Logs;

    let Potentials = [];
    let totalPotential = 0;
    for (let i = 0; i < userLogs.length; i++) {
      const userData = await Users.findOne({ _id: userLogs[i].userID });
      const ifCase = await Cases.findOne({ userID: userLogs[i].userID });

      if (!ifCase) {
        if (parseInt(userLogs[i].time) >= 1) {
          Potentials.push(userLogs[i]);
          totalPotential = 1 + totalPotential;
          const number =
            `${userData.number}`.charAt(0) === "0"
              ? `+63${`${userData.number}`.substring(1)}`
              : `+63${userData.number}`;
          vonage.message.sendSms(
            "Suresafe",
            number,
            `[SURESAFE] POTENTIALY EXPOSED:\n\nYou have been potentialy exposed to a SureSafe user. \nPlease do self isolation for 5 days. Thank you! \n\n`
          );

          await Users.updateOne(
            { _id: userLogs[i].userID },
            {
              lastLogs: new Date(),
              userState: {
                status: "Potential",
                exposure: "Limited",
              },
              $push: {
                notifications: {
                  clicked: false,
                  title: "Potential",
                  date: new Date(),
                  permission: false,
                  type: "Person",
                },
              },
            }
          );
          const ifCase = await Cases.findOne({ userID: userData._id });
          if (!ifCase) {
            const newCase = new Cases({
              userID: userData._id,
              name: `${userData.firstName} ${userData.lastName}`,
              municipality: userData.municipality,
              barangay: userData.barangay,
              image: userData.picture,
              date: new Date(),
              totalExposed: 0,
              totalPotential: 0,
              totalVisits: userData.Visits.length,
              potentials: [],
              exposed: [],
              exposure: "Limited",
              status: "Potential",
              phone: userData.number,
              email: userData.email,
            });
            await newCase.save();
          }
        }
      }
    }

    let exposure;
    if (totalPotential >= 20) {
      exposure = "Broad";
    } else if (totalPotential >= 10) {
      exposure = "Extensive";
    } else {
      exposure = "Limited";
    }

    const ifCase = await Cases.findOne({ userID: user._id });
    if (!ifCase) {
      const newCase = new Cases({
        userID: user._id,
        name: `${user.firstName} ${user.lastName}`,
        municipality: user.municipality,
        barangay: user.barangay,
        image: user.picture,
        date: new Date(),
        totalExposed: 0,
        totalPotential: totalPotential,
        totalVisits: user.Visits.length,
        potentials: Potentials,
        exposed: [],
        exposure: exposure,
        status: "Exposed",
        phone: user.number,
        email: user.email,
      });
      await newCase.save();
    } else {
      await Cases.updateOne(
        { userID: user._id },
        {
          totalPotential: totalPotential,
          potentials: Potentials,
        }
      );
    }

    await Users.updateOne(
      { _id: userID },
      {
        lastLogs: new Date(),
        userState: {
          status: "Exposed",
          exposure: exposure,
        },
      }
    );

    return res.status(201).send({
      title: "Successfully Added!",
      message: "Shared Successfully Added!",
      statusCode: 201,
      // data: saveShare,
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

exports.shareLogsInfected = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await Users.findOne({ _id: userID });

    const userLogs = user.Logs;

    let Exposed = [];
    let totalExposed = 0;
    for (let i = 0; i < userLogs.length; i++) {
      const userData = await Users.findOne({ _id: userLogs[i].userID });
      const ifCase = await Cases.findOne({ userID: userLogs[i].userID });

      if (!ifCase) {
        if (parseInt(userLogs[i].time) >= 1) {
          Exposed.push(userLogs[i]);
          totalExposed = 1 + totalExposed;
          const number =
            `${userData.number}`.charAt(0) === "0"
              ? `+63${`${userData.number}`.substring(1)}`
              : `+63${userData.number}`;
          vonage.message.sendSms(
            "Suresafe",
            number,
            `[SURESAFE] EXPOSED:\n\nYou have been exposed to a SureSafe user. \nPlease do self
            quarantine in 15 days. Thank you! \n\n`
          );

          await Users.updateOne(
            { _id: userLogs[i].userID },
            {
              lastLogs: new Date(),
              userState: {
                status: "Exposed",
                exposure: "Limited",
              },
              $push: {
                notifications: {
                  clicked: false,
                  title: "Exposed",
                  date: new Date(),
                  permission: true,
                  type: "Person",
                },
              },
            }
          );
          const ifCase = await Cases.findOne({ userID: userData._id });
          if (!ifCase) {
            const newCase = new Cases({
              userID: userData._id,
              name: `${userData.firstName} ${userData.lastName}`,
              municipality: userData.municipality,
              barangay: userData.barangay,
              image: userData.picture,
              date: new Date(),
              totalExposed: 0,
              totalPotential: 0,
              totalVisits: userData.Visits.length,
              potentials: [],
              exposed: [],
              exposure: "Limited",
              status: "Exposed",
              userData: userData.number,
              email: userData.email,
            });
            await newCase.save();
          }
        }
      }
    }

    let exposure;
    if (totalExposed >= 20) {
      exposure = "Broad";
    } else if (totalExposed >= 10) {
      exposure = "Extensive";
    } else {
      exposure = "Limited";
    }

    const ifCase = await Cases.findOne({ userID: user._id });
    if (!ifCase) {
      const newCase = new Cases({
        userID: user._id,
        name: `${user.firstName} ${user.lastName}`,
        municipality: user.municipality,
        barangay: user.barangay,
        image: user.picture,
        date: new Date(),
        totalExposed: totalExposed,
        totalPotential: 0,
        totalVisits: user.Visits.length,
        potentials: [],
        exposed: Exposed,
        exposure: exposure,
        status: "Infected",
        phone: user.number,
        email: user.email,
      });
      await newCase.save();
    }

    await Users.updateOne(
      { _id: userID },
      {
        lastLogs: new Date(),
        userState: {
          status: "Infected",
          exposure: exposure,
        },
      }
    );

    return res.status(201).send({
      title: "Successfully Added!",
      message: "Shared Successfully Added!",
      statusCode: 201,
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

exports.shareVisits = async (req, res) => {
  try {
    const estabID = req.params.estabID;
    const establishment = await Establishments.findOne({ _id: estabID });

    if (establishment) {
      const visitors = establishment.visitors;
      let userIds = [];
      for (let i = 0; i < visitors.length; i++) {
        const user = visitors[i];
        const userData = await Users.findOne({ _id: user.userId });
        const ifCase = await Cases.findOne({ userID: user.userId });

        if (!ifCase) {
          const number =
            `${userData.number}`.charAt(0) === "0"
              ? `+63${`${userData.number}`.substring(1)}`
              : `+63${userData.number}`;
          vonage.message.sendSms(
            "Suresafe",
            number,
            `[SURESAFE] POTENTIALY EXPOSED:\n\nYou have been potentialy exposed. \nA Establishment you 
            recently visited have been exposed to an infected person. \nPlease do self isolation for 5 days. Thank you! \n\n`
          );

          if (!userIds.includes(`${user.userId}`)) {
            await Users.updateOne(
              { _id: user.userId },
              {
                userState: {
                  status: "Potential",
                  exposure: "Limited",
                },
                $push: {
                  notifications: {
                    clicked: false,
                    title: "Potential",
                    date: new Date(),
                    permission: false,
                    type: "Establishment",
                  },
                },
              }
            );
            const newCase = new Cases({
              userID: userData._id,
              name: `${userData.firstName} ${userData.lastName}`,
              municipality: userData.municipality,
              barangay: userData.barangay,
              image: userData.picture,
              date: new Date(),
              totalExposed: 0,
              totalPotential: 0,
              totalVisits: userData.Visits.length,
              potentials: [],
              exposed: [],
              exposure: "Limited",
              status: "Potential",
              userData: userData.number,
              email: userData.email,
            });
            await newCase.save();
          }
          userIds.push(`${user.userId}`);
        }
      }

      return res.status(200).send({
        title: "Successfully Shared",
        message: "Shared Successfully Added!",
        statusCode: 200,
      });
    } else {
      return res.status(400).send({
        title: "Someting went wrong!",
        message: "Someting went wrong. Please try again or try again later.",
        statusCode: 400,
      });
    }
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
    const { userID } = req.params;
    const getAllExposed = await Cases.find({ status: "Exposed" });
    const getAllInfected = await Cases.find({ status: "Infected" });
    const getUser = await Users.findById(userID);
    return res.status(201).send({
      title: "Successfully Added!",
      message: "Shared Successfully Added!",
      statusCode: 201,
      data: [...getAllInfected, ...getAllExposed],
      role: getUser.role,
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
