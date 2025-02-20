// plotRoutes.js
const express = require('express');
const router = express.Router();
const Plot = require('../models/Plot');

// Route to add a new plot
router.post('/', async (req, res) => {
  try {
    const newPlot = new Plot(req.body);
    await newPlot.save();
    res.status(201).json(newPlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to retrieve all plots
router.get('/', async (req, res) => {
  try {
    const plots = await Plot.find();
    res.json(plots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
