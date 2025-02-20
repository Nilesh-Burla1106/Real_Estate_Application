import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

const ProjectExpensesChart = ({ selectedProject }) => {
  const [expenses, setExpenses] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expenses');
        const fetchedExpenses = response.data;
        setExpenses(fetchedExpenses);
        calculateCustomersCount(fetchedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateCustomersCount = (expenses) => {
    const uniqueCustomers = new Set(expenses.map(exp => exp.customerId));
    setCustomersCount(uniqueCustomers.size);
  };

  const filteredExpenses = expenses.filter(exp => exp.projectName === selectedProject);

  // Prepare data for the chart
  const expenseCategories = [...new Set(filteredExpenses.map(exp => exp.category))];
  const expenseValues = expenseCategories.map(category =>
    filteredExpenses
      .filter(exp => exp.category === category)
      .reduce((total, exp) => total + exp.paymentAmount, 0)
  );

  const chartData = {
    series: [{
      name: 'Expenses',
      data: expenseValues,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: expenseCategories,
      },
      title: {
        text: `Expenses for Project: ${selectedProject} (Total Customers: ${customersCount})`,
        align: 'center',
      },
    },
  };

  return (
    <div>
      {filteredExpenses.length > 0 ? (
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      ) : (
        <p>No expenses recorded for this project.</p>
      )}
    </div>
  );
};

export default ProjectExpensesChart;
