const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
});

// POST a new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    customerName: req.body.customerName,
    date: req.body.date,
    callDetails: req.body.callDetails,
    paymentAmount: req.body.paymentAmount,
    paymentStatus: req.body.paymentStatus,
    customerResponse: req.body.customerResponse,
    projectName: req.body.projectName // Include projectName here
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: 'Error creating expense', error: err.message });
  }
});

// PUT (update) an expense by ID
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Update all fields including projectName
    expense.customerName = req.body.customerName;
    expense.date = req.body.date;
    expense.callDetails = req.body.callDetails;
    expense.paymentAmount = req.body.paymentAmount;
    expense.paymentStatus = req.body.paymentStatus;
    expense.customerResponse = req.body.customerResponse;
    expense.projectName = req.body.projectName; // Include projectName in update

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: 'Error updating expense', error: err.message });
  }
});

// DELETE an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

module.exports = router;
