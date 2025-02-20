const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Project = require('../models/Project'); // Import the Project model

// GET all customers with populated project details
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('project'); // Populate project details
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// POST new customer
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update an existing customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).send('Error updating customer');
  }
});

// DELETE: Remove a customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting customer');
  }
});

module.exports = router;
