const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CasesSchema = new Schema({
  userID: { type: String },
  name: { type: String },
  municipality: { type: String },
  barangay: { type: String },
  date: { type: Date },
  image: { type: String },
  exposure: { type: String },
  totalExposed: { type: Number },
  totalPotential: { type: Number },
  totalVisits: { type: Number },
  Visits: [
    {
      visitDate: { type: Date },
      estabID: { type: String },
      estabName: { type: String },
      estabAddress: { type: String },
    },
  ],
  potentials: [],
  exposed: [],
  status: { type: String },
  phone: { type: Number },
  email: { type: String },
});

const Cases = mongoose.model("Cases", CasesSchema);

module.exports = Cases;
