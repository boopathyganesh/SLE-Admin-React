import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, category }) => {
  // Check for valid data and category
  if (!Array.isArray(data) || !Array.isArray(category) || data.length !== category.length) {
    return <div>Error: Invalid data or category</div>;
  }

  const barChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Data',
        },
      },
    },
  };

  const barChartData = {
    labels: category,
    datasets: [
      {
        label: 'Bar Chart Data',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Customize the border color
        borderWidth: 1, // Customize the border width
      },
    ],
  };

  return <Bar data={barChartData} options={barChartOptions} />;
};

export default BarChart;
