const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  codes: [
    {
      code: { type: String },
      used: { type: Boolean },
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
