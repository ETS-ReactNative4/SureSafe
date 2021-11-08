const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  userID: { type: String },
  name: { type: String },
  date: { type: Date },
  statusType: { type: String },
  totalVisits: { type: Number },
  totalLogs: { type: Number },
  time: { type: Number },
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
