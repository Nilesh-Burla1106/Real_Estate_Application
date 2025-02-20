import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

const DailyExpensesChart = ({ selectedProject }) => {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Daily Expenses',
        align: 'center',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    },
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/expenses')
      .then(response => {
        const expenses = response.data;
        const filteredExpenses = selectedProject
          ? expenses.filter(exp => exp.projectName === selectedProject)
          : expenses;

        const aggregatedData = aggregateExpensesByDate(filteredExpenses);
        updateChart(aggregatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedProject]);

  const aggregateExpensesByDate = (expenses) => {
    const aggregated = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date] += parseFloat(expense.paymentAmount);
      return acc;
    }, {});

    return Object.keys(aggregated).map(date => ({ date, total: aggregated[date] }));
  };

  const updateChart = (aggregatedData) => {
    const dates = aggregatedData.map(item => item.date);
    const totals = aggregatedData.map(item => item.total);

    setData({
      series: [{ name: 'Total Expenses', data: totals }],
      options: {
        ...data.options,
        xaxis: { categories: dates },
      },
    });
  };

  return (
    <div>
      <ApexCharts
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default DailyExpensesChart;
