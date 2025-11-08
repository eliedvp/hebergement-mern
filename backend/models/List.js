const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("List", listSchema);
