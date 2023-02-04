const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  font: String,
  amount: Number,
  dueDate: Date,
  isChecked: Boolean,
  type: String,
});

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = {
  Invoice,
};
