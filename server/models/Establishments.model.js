const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentsSchema = new Schema({
  estabName: { type: String },
  estabAddress: { type: String },
});

const Establishments = mongoose.model("Establishments", EstablishmentsSchema);

module.exports = Establishments;
