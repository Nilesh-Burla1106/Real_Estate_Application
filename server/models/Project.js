const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  details: { type: String }, // Additional project details
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }], // Reference to customer model
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }]    // Reference to expense model
});

module.exports = mongoose.model('Project', projectSchema);
