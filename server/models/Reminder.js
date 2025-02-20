const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String, // New field for adding a description
    required: true, // Making it required as per the frontend logic
  },
  recurrence: {
    type: String, // Optional field if you want to include recurrence (e.g., 'daily', 'weekly')
    default: null,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
