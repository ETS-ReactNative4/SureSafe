const Admin = require("../models/Admin.model");
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
