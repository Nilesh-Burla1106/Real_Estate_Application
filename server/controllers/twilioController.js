// controllers/twilioController.js

const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Handle initiating a call
exports.initiateCall = (req, res) => {
  const { phoneNumber } = req.body;

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml', // Replace with your TwiML or URL to handle the call
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio phone number
    })
    .then(call => res.json({ sid: call.sid }))
    .catch(error => res.status(500).json({ error: error.message }));
};

