// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  date: String,
  time: String,
  callsMade: Number,
  place: String,
  project: String,
  leadStatus: String,
  oldLeadResponses: String,
  description: String,
});

module.exports = mongoose.model('Customer', customerSchema);
