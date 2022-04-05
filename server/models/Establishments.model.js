const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentsSchema = new Schema({
  estabName: { type: String },
  estabAddress: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  qrcode: { type: String },
  visitors: [
    {
      userId: { type: String },
      visitDate: { type: Date },
      firstName: { type: String },
      lastName: { type: String },
      municipality: { type: String },
      barangay: { type: String },
      number: { type: Number },
    },
  ],
});

const Establishments = mongoose.model("Establishments", EstablishmentsSchema);

module.exports = Establishments;
