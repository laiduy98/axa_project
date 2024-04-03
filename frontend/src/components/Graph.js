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
ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

const Graph = ({ data }) => {
  console.log(data)


  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data, typeof(data));
    return null;
  }

  const survivalCounts = {
    labels: ['Survived', 'Not Survived'],
    datasets: [
      {
        label: 'Survival Count',
        backgroundColor: ['#4CAF50', '#FFC107'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [
          data.filter((passenger) => passenger.Survived === 1).length,
          data.filter((passenger) => passenger.Survived === 0).length,
        ],
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Titantic Survived Bar Chart',
      },
    },
  };


  return (
    <div>
      <h2>Survival Count</h2>
      <Bar data={survivalCounts} options={options} />
    </div>
  );
};

export default Graph;