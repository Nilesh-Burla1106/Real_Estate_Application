const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Ensure phone number is a string
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Could be stored as string or Date depending on format
  duration: { type: Number }, // Optional
  outcome: { type: String }, // Optional
  notes: { type: String },  // Optional
});

module.exports = mongoose.model('Call', callSchema);
