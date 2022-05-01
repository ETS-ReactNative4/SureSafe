const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TracingSchema = new Schema({
  userID: { type: String, unique: true },
  geolocation: {
    longitude: { type: String },
    latitude: { type: String },
  },
});

const Tracing = mongoose.model("Tracing", TracingSchema);

module.exports = Tracing;
