// routes/twilioRoutes.js

const express = require('express');
const router = express.Router();
const { initiateCall } = require('../controllers/twilioController');

// Route to initiate a call
router.post('/calls', initiateCall);

module.exports = router;
  