"use client"; // Ensure this is at the top

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type Event = {
  id: number;
  name: string;
  date: string;
};

type Transaction = {
  id: number;
  event: string;
  amount: number;
};

const DashboardPage = () => {
  const events: Event[] = [
    { id: 1, name: 'Event 1', date: '2023-01-01' },
    { id: 2, name: 'Event 2', date: '2023-02-01' },
  ];

  const transactions: Transaction[] = [
    { id: 1, event: 'Event 1', amount: 100 },
    { id: 2, event: 'Event 2', amount: 200 },
  ];

  const statistics = {
    registrations: [10, 20, 30, 40, 50, 60],
    revenue: [100, 200, 300, 400, 500, 600],
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Registrations',
        data: statistics.registrations,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: statistics.revenue,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-blue-500 text-white rounded shadow">Primary Card</div>
        <div className="p-4 bg-yellow-500 text-white rounded shadow">Warning Card</div>
        <div className="p-4 bg-green-500 text-white rounded shadow">Success Card</div>
        <div className="p-4 bg-red-500 text-white rounded shadow">Danger Card</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Registrations Over Time</h2>
          <Line data={data} />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Revenue Over Time</h2>
          <Bar data={revenueData} />
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Event</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2">{transaction.id}</td>
                <td className="py-2">{transaction.event}</td>
                <td className="py-2">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
