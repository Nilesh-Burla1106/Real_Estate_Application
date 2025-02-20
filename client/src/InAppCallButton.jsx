// InAppCallButton.jsx
import React, { useState } from 'react';
import axios from 'axios';

const InAppCallButton = ({ to }) => {
  const [isCalling, setIsCalling] = useState(false);

  const startCall = async () => {
    setIsCalling(true);
    try {
      await axios.post('/start-call', { to, from: 'your_twilio_phone_number' });
      alert('Call started');
    } catch (error) {
      alert('Error starting call');
    }
    setIsCalling(false);
  };

  return (
    <button onClick={startCall} disabled={isCalling}>
      {isCalling ? 'Calling...' : 'Start Call'}
    </button>
  );
};

export default InAppCallButton;
