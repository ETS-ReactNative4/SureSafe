const Establishments = require("../models/Establishments.model");
const Users = require("../models/Users.model");
const capitalize = require("../utils/CapitalizeFirst");

exports.addEstablishment = async (req, res) => {
  try {
    const { estabName, estabAddress } = req.body;

    const newEstab = new Establishments({
      estabName: estabName,
      estabAddress: estabAddress,
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
    let arr = [];
    const { Visits } = user;
    if (filter == "Today") {
      for (let i = 0; i < Visits.length; i++) {
        const visitDate = new Date(Visits[i].visitDate);
        if (
          visitDate.toString().substr(0, 15) ==
          dateToday.toString().substr(0, 15)
        ) {
          arr.push(Visits[i]);
        }
      }
    } else if (filter == "All") {
      arr = Visits;
    }

    const fullAddress = `${capitalize.capitalize(
      user?.barangay
    )}, ${capitalize.capitalize(user?.municipality)}`;
    const fullName = `${user?.firstName} ${user?.lastName}`;

    const data = {
      Visits: arr,
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
