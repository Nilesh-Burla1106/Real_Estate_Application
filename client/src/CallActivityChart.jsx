import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { Container, Card } from 'react-bootstrap';

const CallActivityChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 400,
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 10,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${val} calls`;
        },
        style: {
          colors: ['#333'],
        },
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: (val) => new Date(val).toLocaleDateString(),
        },
      },
      yaxis: {
        title: {
          text: 'Number of Calls',
        },
      },
      colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9'],
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val) => `${val} calls`,
        },
      },
      title: {
        text: 'Call Activity Report',
        align: 'center',
      },
      annotations: {
        yaxis: [
          {
            y: 10, // Reference line for the target
            borderColor: 'red',
            label: {
              borderColor: 'red',
              style: {
                color: '#fff',
                background: 'red',
              },
              text: 'Target',
            },
          },
        ],
      },
    },
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/calls')
      .then(response => {
        processData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const processData = (calls) => {
    const callsByDate = calls.reduce((acc, call) => {
      const date = call.date;
      if (!acc[date]) {
        acc[date] = { date, calls: 0 };
      }
      acc[date].calls++;
      return acc;
    }, {});

    const formattedData = Object.values(callsByDate);
    const dates = formattedData.map(item => item.date);
    const callsCount = formattedData.map(item => item.calls);

    // Update chart data
    setChartData({
      series: [{
        name: 'Calls',
        data: callsCount,
      }],
      options: {
        ...chartData.options,
        xaxis: { categories: dates },
      },
    });
  };

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <h4 className="mb-4 text-center">Call Activity Report</h4>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={400}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CallActivityChart;
