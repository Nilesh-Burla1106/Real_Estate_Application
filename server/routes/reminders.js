const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// Create a new reminder
router.post('/', async (req, res) => {
  try {
    const { title, date, time , description , recurrence } = req.body;
    const newReminder = new Reminder({ title, date, time , description, recurrence });
    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reminder', error });
  }
});

// Get all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reminders', error });
  }
});

// Update a reminder by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reminder', error });
  }
});

// Delete a reminder by ID
router.delete('/:id', async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reminder', error });
  }
});

module.exports = router;
