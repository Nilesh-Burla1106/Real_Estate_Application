const Report = require('../models/Report');
const CustomerResponse = require('../models/CustomerResponse');
const Expense = require('../models/Expense');

exports.getDailyReports = async (req, res) => {
    const reports = await Report.find();
    res.json(reports);
};

exports.getCustomerResponses = async (req, res) => {
    const responses = await CustomerResponse.find();
    res.json(responses);
};

exports.getDailyExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
};