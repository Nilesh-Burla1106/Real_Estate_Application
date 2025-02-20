const express = require('express');
const router = express.Router();
const Call = require('../models/Call');
const twilioController = require('../controllers/twilioController');

// Get all calls
router.get('/', async (req, res) => {
  try {
    const calls = await Call.find();
    res.status(200).json(calls); // Added status 200 for successful response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new call
router.post('/', async (req, res) => {
  const { customerName, phoneNumber, date, time, duration, outcome, notes } = req.body;

  // Basic validation for required fields
  if (!customerName || !phoneNumber || !date || !time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Ensure phone number is numeric
  if (!/^\d+$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  const call = new Call({
    customerName,
    phoneNumber,
    date,
    time,
    duration,
    outcome,
    notes,
  });

  try {
    const newCall = await call.save();
    res.status(201).json(newCall); // Status 201 for successful creation
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific call by ID
router.get('/:id', async (req, res) => {
  try {
    const call = await Call.findById(req.params.id);
    if (!call) return res.status(404).json({ message: 'Call not found' });
    res.status(200).json(call);
  } catch (error) {
    // Error handling for invalid IDs (CastError)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid call ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update a specific call by ID
router.put('/:id', async (req, res) => {
  const { customerName, phoneNumber, date, time, duration, outcome, notes } = req.body;

  // Ensure that if updating phone number, it is valid
  if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  try {
    const updatedCall = await Call.findByIdAndUpdate(
      req.params.id,
      { customerName, phoneNumber, date, time, duration, outcome, notes },
      { new: true, runValidators: true } // Ensure the updated document is returned
    );
    if (!updatedCall) return res.status(404).json({ message: 'Call not found' });
    res.status(200).json(updatedCall);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific call by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCall = await Call.findByIdAndDelete(req.params.id);
    if (!deletedCall) return res.status(404).json({ message: 'Call not found' });
    res.status(200).json({ message: 'Call deleted successfully' });
  } catch (error) {
    // Handle invalid ID errors
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid call ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
