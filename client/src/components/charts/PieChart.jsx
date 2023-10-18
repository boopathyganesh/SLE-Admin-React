import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, labelData }) => {
  // Check for valid data and labelData
  if (!Array.isArray(data) || !Array.isArray(labelData) || data.length !== labelData.length) {
    return <div>Error: Invalid data or labelData</div>;
  }

  const pieChartData = {
    labels: labelData,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

export default PieChart;
