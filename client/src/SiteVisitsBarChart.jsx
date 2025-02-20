import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SiteVisitsBarChart({ data }) {
    const formattedData = data.map(visit => ({
        date: visit.date,
        client: visit.client
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="client" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default SiteVisitsBarChart;
