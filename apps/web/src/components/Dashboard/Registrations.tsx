import React from 'react';
import { Registration } from '../../types';

interface RegistrationsProps {
  registrations: Registration[];
}

const Registrations: React.FC<RegistrationsProps> = ({ registrations }) => {
  return (
    <div>
      <h2>Registrations</h2>
      <ul>
        {registrations.map(registration => (
          <li key={registration.id}>{registration.attendeeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Registrations;
