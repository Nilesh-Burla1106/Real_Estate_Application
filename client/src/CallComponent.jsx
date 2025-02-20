import React, { useState } from 'react';
import axios from 'axios';

function CallComponent() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCall = () => {
        axios.post('http://localhost:3001/api/call', { toPhoneNumber: phoneNumber })
            .then(response => {
                alert('Call initiated successfully');
            })
            .catch(err => {
                console.error('Error making call:', err);
                alert('Failed to initiate call');
            });
    };

    return (
        <div className="call-container">
            <h2>Make a Call</h2>
            <input 
                type="text" 
                placeholder="Enter phone number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
            />
            <button onClick={handleCall}>Call</button>
        </div>
    );
}

export default CallComponent;
