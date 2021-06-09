const Establishments = require("../models/Establishments.model");

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
