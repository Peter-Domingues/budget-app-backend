const mongoose = require("mongoose");

const SpendingSchema = new mongoose.Schema({
  font: String,
  amount: Number,
  dueDate: Date,
  isChecked: Boolean,
});

const Bill = mongoose.model("bill", SpendingSchema);

module.exports = {
  Bill,
};
