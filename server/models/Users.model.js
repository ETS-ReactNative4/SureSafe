const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  agreement: { type: Boolean, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  municipality: { type: String, default: "" },
  barangay: { type: String, default: "" },
  number: { type: Number, default: "" },
  verify: {
    code: { type: Number },
    time: { type: Date },
  },
  userState: {
    status: { type: String },
    exposure: { type: String },
    geolocation: {
      longitude: { type: String },
      latitude: { type: String },
    },
  },
  Logs: [
    {
      userID: { type: String },
      logDate: { type: Date },
      status: { type: String },
      exposure: { type: String },
      time: { type: Number },
    },
  ],
  Visits: [
    {
      visitDate: { type: Date },
      estabID: { type: String },
      estabName: { type: String },
      estabAddress: { type: String },
    },
  ],
  realTimeLogs: [
    {
      userID: { type: String },
      logDate: { type: Date, default: Date.now },
      status: { type: String },
      exposure: { type: String },
      geolocation: {
        longitude: { type: String },
        latitude: { type: String },
      },
      time: { type: Date },
    },
  ],
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
