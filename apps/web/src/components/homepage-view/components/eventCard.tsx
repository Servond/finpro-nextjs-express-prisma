import React from 'react';
import Image from 'next/image';
import { IEventCardProps } from '@/interface/event.interface';

const EventCard: React.FC<IEventCardProps> = ({ event }) => {
  const handleClick = () => {
    window.open(`/events/${event.id}`, '_blank'); 
  };

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="flex-shrink-0 w-[360px] bg-white rounded-lg overflow-hidden shadow-md m-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick} 
    >
      {event.imagePath && (
        <Image
          src={`http://localhost:3080${event.imagePath}`}
          alt={event.eventTitle}
          className="w-full h-48 object-cover"
          width={940}
          height={470}
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{event.eventTitle}</h2>
        <p className="text-sm text-gray-600 mb-1">{formattedDate}</p>{' '}
        <p className="text-sm text-gray-600 mb-1">{event.location}</p>
        <p className="text-sm text-gray-600">
          Organizer: {event.organizerName}
        </p>
        {event.category?.name && (
          <p className="mt-2 text-sm font-bold">
            Category: {event.category.name}
          </p>
        )}
        {event.price == null ? (
          <p className="mt-2 text-sm font-bold">Free</p>
        ) : (
          <p className="mt-2 text-sm font-bold">
            From IDR {event.price.toLocaleString('id-ID')}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
