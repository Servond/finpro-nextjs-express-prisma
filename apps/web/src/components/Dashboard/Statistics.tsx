import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatisticsProps {
  statistics: { id: number; value: number }[];
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  const data = {
    labels: statistics.map(stat => stat.id.toString()),
    datasets: [
      {
        label: 'Statistics',
        data: statistics.map(stat => stat.value),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Statistics</h2>
      <Bar data={data} />
    </div>
  );
};

export default Statistics;
