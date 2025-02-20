const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  callDetails: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  customerResponse: { type: String },
  projectName: { type: String, required: true }  // Reference to project
});

module.exports = mongoose.model('Expense', expenseSchema);
