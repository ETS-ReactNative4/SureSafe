const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CasesSchema = new Schema({
  userID: { type: String },
  name: { type: String },
  municipality: { type: String },
  barangay: { type: String },
  date: { type: Date },
  exposure: { type: String },
  totalExposed: { type: Number },
  totalPotential: { type: Number },
  totalVisits: { type: Number },
  status: { type: String },
});

const Cases = mongoose.model("Cases", CasesSchema);

module.exports = Cases;
