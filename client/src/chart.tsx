import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, BarElement, Tooltip, Legend, Chart } from 'chart.js';
import 'chart.js/auto'; // Ensure all necessary components are included

// Register necessary components
Chart.register(CategoryScale, BarElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Number of Calls per Day',
        data: data.values,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default ChartComponent;
