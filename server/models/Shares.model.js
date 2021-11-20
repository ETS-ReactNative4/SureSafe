const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SharesSchema = new Schema({
  userID: { type: String },
  shareDate: { type: Date },
  shareType: { type: String },
  logs: [],
  visits: [],
});

const Shares = mongoose.model("Shares", SharesSchema);

module.exports = Shares;
