const Users = require("../models/Users.model");

exports.addLogs = async (req, res) => {
  try {
    const { ids, userID } = req.body;
    const userData = await Users.findById(userID);
    console.log(userData);
    let arrLogs = [];
    const logs = userData.Logs;
    for (let i = 0; i < ids.length; i++) {
      const obj = {
        userID: ids[i].id,
        logDate: new Date(),
        time: ids[i].time,
        status: "Covid Free",
        exposure: "Not Exposed",
      };
      arrLogs.push(obj);
      if (i == ids.length - 1) {
        await Users.updateOne({ _id: userID }, { Logs: [...arrLogs, ...logs] });
      }
    }

    return res.status(201).send({
      title: "Successfully Added!",
      message: ` successfully added!`,
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
