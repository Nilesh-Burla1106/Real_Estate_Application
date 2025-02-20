import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import 'animate.css'; // Import Animate.css for animations

const MonthlyExpensesChart = () => {
  const [chartType, setChartType] = useState('line'); // State to toggle between bar and line
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',  // Default to line chart
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top', // Enable values on top of bars
          }
        }
      },
      dataLabels: {
        enabled: true,  // Enable for both line and bar charts
        formatter: (val) => `₹${val.toFixed(2)}`,
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: 'Monthly Expenses Report',
        align: 'center',
      },
      colors: ['#008FFB'], // Default color for bar chart
      tooltip: {
        y: {
          formatter: (val) => `₹${val.toFixed(2)}`,
        }
      },
    }
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/expenses')
      .then(response => {
        const expenses = response.data;
        const aggregatedData = aggregateExpensesByMonth(expenses);
        updateChart(aggregatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const aggregateExpensesByMonth = (expenses) => {
    const aggregated = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!acc[month]) acc[month] = 0;
      acc[month] += parseFloat(expense.paymentAmount);
      return acc;
    }, {});

    return Object.keys(aggregated).map(month => ({ month, total: aggregated[month] }));
  };

  const updateChart = (aggregatedData) => {
    const categories = aggregatedData.map(item => item.month);
    const seriesData = aggregatedData.map(item => item.total);

    setChartData(prevData => ({
      ...prevData,
      series: [{
        name: 'Total Expenses',
        data: seriesData,
      }],
      options: {
        ...prevData.options,
        xaxis: {
          categories: categories,
        }
      }
    }));
  };

  const handleChartTypeChange = (type) => {
    setChartType(type); // Update the chart type (line or bar)

    // Update the color and dataLabels based on the type
    const color = type === 'line' ? ['#008FFB'] : ['#FF4560'];
    setChartData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        chart: {
          type: type, // Change chart type here
        },
        colors: color, // Update the color
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top', // Show data labels on bars
            }
          }
        },
        dataLabels: {
          enabled: true, // Enable data labels for both line and bar
        }
      }
    }));
  };

  return (
    <div className="container">
      <div className="text-center mb-4">
        <button
          onClick={() => handleChartTypeChange('line')}
          className="btn btn-primary animate__animated animate__bounceIn mr-2"
          style={{
            marginRight: '10px',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            fontWeight: 'bold',
          }}
        >
          Show Line Graph
        </button>
        <button
          onClick={() => handleChartTypeChange('bar')}
          className="btn btn-danger animate__animated animate__bounceIn"
          style={{
            backgroundColor: '#ff4560',
            borderColor: '#ff4560',
            fontWeight: 'bold',
          }}
        >
          Show Bar Graph
        </button>
      </div>

      <div id="chart" className="animate__animated animate__fadeIn">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type={chartType} // Pass the dynamic type here as well
          height={350} />
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;
