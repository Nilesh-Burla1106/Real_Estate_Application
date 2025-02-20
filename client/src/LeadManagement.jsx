// LeadManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', status: '' });

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await axios.get('/leads');
      setLeads(response.data);
    };

    fetchLeads();
  }, []);

  const addLead = async () => {
    await axios.post('/leads', newLead);
    setNewLead({ name: '', status: '' });
    // Refresh leads list
    const response = await axios.get('/leads');
    setLeads(response.data);
  };

  return (
    <div>
      <h2>Lead Management</h2>
      <input
        type="text"
        placeholder="Lead Name"
        value={newLead.name}
        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={newLead.status}
        onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
      />
      <button onClick={addLead}>Add Lead</button>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>{lead.name} - {lead.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeadManagement;
