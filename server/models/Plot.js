// models/Plot.js
const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  serialNumber: String,
  lengthWidth: String,
  areaSqm: Number,
  areaSqft: Number,
  ownerName: String,
  bookingDate: Date
});

module.exports = mongoose.model('Plot', plotSchema);
