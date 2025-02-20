const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173",
  }));

// Twilio credentials (replace these with your actual Twilio credentials)
const accountSid = 'AC65cebb58bfa9051e82b84db8063405a6';
const authToken = '834ce026d4cad11ca8f7908c2d12523d';
const client = new twilio(accountSid, authToken);

// API endpoint to initiate the call
app.post('/api/call', (req, res) => {
    const { toPhoneNumber } = req.body;

    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',  // Twilio will use this URL for call behavior
            to: toPhoneNumber,  // Phone number entered in the frontend
            from: '+16614262260'  // Your Twilio phone number
        })
        .then(call => {
            console.log(`Call initiated with SID: ${call.sid}`);
            res.json({ message: 'Call initiated successfully', sid: call.sid });
        })
        .catch(err => {
            console.error('Error initiating call:', err);
            res.status(500).json({ message: 'Failed to initiate call', error: err });
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
