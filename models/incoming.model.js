const mongoose = require("mongoose");

const incomingSchema = new mongoose.Schema({
  font: String,
  amount: Number,
  dueDate: Date,
  isChecked: Boolean,
});

const Incoming = mongoose.model("incoming", incomingSchema);

module.exports = {
  Incoming,
};
