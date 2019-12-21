const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String
});

module.exports = mongoose.model("Home", homeSchema);
