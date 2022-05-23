const Admin = require("../models/Admin.model");
const Cases = require("../models/Cases.model");
const Users = require("../models/Users.model");
const Tracing = require("../models/Tracing.model");
const Establishments = require("../models/Establishments.model");
const { nanoid, customAlphabet } = require("nanoid");
const xl = require("excel4node");

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

const headingColumnNames = [
  "userID",
  "suresafeID",
  "Name",
  "Address",
  "Date",
  "Exposed",
  "Potential",
  "Visits",
  "Exposure",
  "Status",
];

exports.reportExposed = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Exposed" });

    let data = [];
    for (let i = 0; i < exposed.length; i++) {
      let userIdentification = exposed[i].userID.substring(
        exposed[i].userID.length - 4,
        exposed[i].userID.length
      );
      data.push({
        userID: `${exposed[i].userID}`,
        suresafeID: `SS-${userIdentification}`,
        Name: `${exposed[i].name}`,
        Address: `${exposed[i].barangay}, ${exposed[i].municipality}`,
        Date: `${exposed[i].date}`,
        totalExposed: `${exposed[i].totalExposed}`,
        totalPotential: `${exposed[i].totalPotential}`,
        totalVisits: `${exposed[i].totalVisits}`,
        exposure: `${exposed[i].exposure}`,
        status: `${exposed[i].status}`,
      });
    }

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Exposed");
    const newName = customAlphabet("1234567890abcdef", 7);

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });

    const fileName = `${newName()}.xlsx`;
    wb.write(`./suresafe/${fileName}`);

    return res.status(201).send({
      title: `Report Generated`,
      message: `Report Generated`,
      statusCode: 201,
      fileName: fileName,
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

exports.reportInfected = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Infected" });

    let data = [];
    for (let i = 0; i < exposed.length; i++) {
      let userIdentification = exposed[i].userID.substring(
        exposed[i].userID.length - 4,
        exposed[i].userID.length
      );
      data.push({
        userID: `${exposed[i].userID}`,
        suresafeID: `SS-${userIdentification}`,
        Name: `${exposed[i].name}`,
        Address: `${exposed[i].barangay}, ${exposed[i].municipality}`,
        Date: `${exposed[i].date}`,
        totalExposed: `${exposed[i].totalExposed}`,
        totalPotential: `${exposed[i].totalPotential}`,
        totalVisits: `${exposed[i].totalVisits}`,
        exposure: `${exposed[i].exposure}`,
        status: `${exposed[i].status}`,
      });
    }

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Infected");
    const newName = customAlphabet("1234567890abcdef", 7);

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });

    const fileName = `${newName()}.xlsx`;
    wb.write(`./suresafe/${fileName}`);

    return res.status(201).send({
      title: `Report Generated`,
      message: `Report Generated`,
      statusCode: 201,
      fileName: fileName,
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

exports.reportPotential = async (req, res) => {
  try {
    const exposed = await Cases.find({ status: "Potential" });

    let data = [];
    for (let i = 0; i < exposed.length; i++) {
      let userIdentification = exposed[i].userID.substring(
        exposed[i].userID.length - 4,
        exposed[i].userID.length
      );
      data.push({
        userID: `${exposed[i].userID}`,
        suresafeID: `SS-${userIdentification}`,
        Name: `${exposed[i].name}`,
        Address: `${exposed[i].barangay}, ${exposed[i].municipality}`,
        Date: `${exposed[i].date}`,
        totalExposed: `${exposed[i].totalExposed}`,
        totalPotential: `${exposed[i].totalPotential}`,
        totalVisits: `${exposed[i].totalVisits}`,
        exposure: `${exposed[i].exposure}`,
        status: `${exposed[i].status}`,
      });
    }

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Potential");
    const newName = customAlphabet("1234567890abcdef", 7);

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });

    const fileName = `${newName()}.xlsx`;
    wb.write(`./suresafe/${fileName}`);

    return res.status(201).send({
      title: `Report Generated`,
      message: `Report Generated`,
      statusCode: 201,
      fileName: fileName,
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
