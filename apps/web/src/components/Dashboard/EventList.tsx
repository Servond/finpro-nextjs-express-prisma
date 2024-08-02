import React from 'react';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <button onClick={() => onEdit(event.id)}>Edit</button>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
