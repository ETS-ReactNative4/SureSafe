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
      logDate: { type: Date },
      logData: [
        {
          userID: { type: String },
          logDate: { type: Date },
          status: { type: String },
          exposure: { type: String },
          geolocation: {
            longitude: { type: String },
            latitude: { type: String },
          },
          time: { type: Date },
        },
      ],
    },
  ],
  Visits: [
    {
      visitDate: { type: Date },
      visitData: [
        {
          visitTime: { type: Date },
          visitName: { type: String },
        },
      ],
    },
  ],
  realTimeLogs: [
    {
      userID: { type: String },
      logDate: { type: Date },
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