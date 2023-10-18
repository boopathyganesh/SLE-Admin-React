import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  MaintainAspectRatio:true,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Income / Expense Analysis',
    },
  },
};

const labels = ['January', 'February', 'March', 'April'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: [100, 524, 52, 45],
      backgroundColor: 'rgba(255, 99, 132, 0.5',
    },
    {
      label: 'Expense',
      data: [80, 424, 152, 100],
      backgroundColor: 'rgba(53, 162, 235, 0.5',
    },
  ],
};

export default function IncomeExpCard() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Income / Expense Analysis</Card.Title>
        <div className="chart-container">
        <Bar options={options} data={data} />
        </div>
      </Card.Body>
    </Card>
  );
}
