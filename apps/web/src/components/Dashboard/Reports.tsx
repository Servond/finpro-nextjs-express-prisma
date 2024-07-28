import React from 'react';
import { Report } from '../../types';

interface ReportsProps {
  reports: Report[];
}

const Reports: React.FC<ReportsProps> = ({ reports }) => {
  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id}>{report.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
