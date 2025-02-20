const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Expense model

// Add new expense
router.post('/add', async (req, res) => {
    const { projectId, description, amount } = req.body;
    try {
        const newExpense = new Expense({ projectId, description, amount });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding expense' });
    }
});

// Get expenses for a specific project
router.get('/:projectId', async (req, res) => {
    try {
        const expenses = await Expense.find({ projectId: req.params.projectId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching expenses' });
    }
});

module.exports = router;
