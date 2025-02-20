const express = require('express');
const router = express.Router();
const Customer = require('./models/Customer'); // Assuming Mongoose model is Customer
const Call = require('./models/Call');
const ClientPreference = require('./models/ClientPreference');
const Expense = require('./models/Expense');
const SiteVisit = require('./models/SiteVisit');

// Fetch customer data
router.get('/api/reports/customers', async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers data', error });
    }
});

// Fetch call data
router.get('/api/reports/calls', async (req, res) => {
    try {
        const calls = await Call.find({});
        res.json(calls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching calls data', error });
    }
});

// Fetch client preference data
router.get('/api/reports/client-preferences', async (req, res) => {
    try {
        const preferences = await ClientPreference.find({});
        res.json(preferences);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client preferences data', error });
    }
});

// Fetch expense data
router.get('/api/reports/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find({});
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses data', error });
    }
});

// Fetch site visit data
router.get('/api/reports/site-visits', async (req, res) => {
    try {
        const visits = await SiteVisit.find({});
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching site visits data', error });
    }
});

module.exports = router;
