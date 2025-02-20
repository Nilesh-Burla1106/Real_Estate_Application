// routes/admin.js

const express = require('express');
const router = express.Router();
const Telecaller = require('../models/Call');  // Assuming a Mongoose model for Telecaller
const Advisor = require('../models/SiteVisit');  // Assuming a Mongoose model for Advisor
const Expense = require('../models/Expense');  // Assuming a Mongoose model for Expense

// Get Telecaller Overview
router.get('/telecaller/overview', async (req, res) => {
  try {
    const telecallerData = await Telecaller.aggregate([
      {
        $group: {
          _id: "$name",
          callsMade: { $sum: "$callsMade" },
          followUps: { $sum: "$followUps" },
          conversions: { $sum: "$conversions" }
        }
      }
    ]);

    res.json(telecallerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching telecaller data' });
  }
});

// Get Advisor Overview
router.get('/advisor/overview', async (req, res) => {
  try {
    const advisorData = await Advisor.aggregate([
      {
        $group: {
          _id: "$name",
          siteVisits: { $sum: "$siteVisits" },
          clientPreferences: { $sum: "$clientPreferences" },
          conversions: { $sum: "$conversions" }
        }
      }
    ]);

    res.json(advisorData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching advisor data' });
  }
});

// Get Expenses Summary
router.get('/expenses/summary', async (req, res) => {
  try {
    const expensesSummary = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    res.json(expensesSummary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching expenses data' });
  }
});

module.exports = router;
