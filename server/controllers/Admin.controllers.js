const Admin = require("../models/Admin.model");
const Cases = require("../models/Cases.model");
const Users = require("../models/Users.model");
const Tracing = require("../models/Tracing.model");
const Establishments = require("../models/Establishments.model");
const { nanoid } = require("nanoid");

exports.addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newAdmin = new Admin({
      username,
      password,
    });
    const save = await newAdmin.save();

    return res.status(201).send({
      title: "Successfully Added!",
      message: "Admin successfully added!",
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

exports.addCode = async (req, res) => {
  try {
    const { adminID } = req.params;
    const code = nanoid(10);
    const updateAdmin = await Admin.updateOne(
      { _id: adminID },
      {
        $push: {
          codes: {
            code: code,
            used: false,
          },
        },
      }
    );

    return res.status(201).send({
      title: "Successfully Added!",
      message: `${code} successfully added!`,
      statusCode: 201,
      data: updateAdmin,
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

exports.getExposed = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Exposed" });

    return res.status(201).send({
      title: "Successfully Fetched",
      message: `Exposed list`,
      statusCode: 201,
      data: exposed,
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

exports.getInfected = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Infected" });

    return res.status(201).send({
      title: "Successfully Fetched",
      message: `Exposed list`,
      statusCode: 201,
      data: exposed,
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

exports.getPotential = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Potential" });

    return res.status(201).send({
      title: "Successfully Fetched",
      message: `Exposed list`,
      statusCode: 201,
      data: exposed,
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

exports.dashboard = async (req, res) => {
  try {
    const getCases = await Cases.find();
    const getUsers = await Users.find();
    const getTracing = await Tracing.find();
    const getEstablishments = await Establishments.find();

    let infected = 0;
    let exposed = 0;
    let potential = 0;
    let totalCases = 0;
    let geotracing = getTracing.length;
    let users = getUsers.length;
    for (let i = 0; i < getCases.length; i++) {
      if (getCases[i].status === "Infected") {
        infected = 1 + infected;
        totalCases = 1 + totalCases;
      } else if (getCases[i].status === "Exposed") {
        exposed = 1 + exposed;
        totalCases = 1 + totalCases;
      } else if (getCases[i].status === "Potential") {
        potential = 1 + potential;
        totalCases = 1 + totalCases;
      }
    }

    return res.status(201).send({
      title: `Retrived Status`,
      message: `Retrived Status`,
      statusCode: 201,
      data: {
        infected,
        exposed,
        potential,
        geotracing,
        users,
        totalCases,
        establisments: getEstablishments.length,
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
