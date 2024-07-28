'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EventListEdit = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editingFormData, setEditingFormData] = useState<any>({
    eventTitle: '',
    date: '',
    location: '',
    price: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3080/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = (event: any) => {
    setEditingEventId(event.id);
    setEditingFormData({
      eventTitle: event.eventTitle,
      date: new Date(event.date).toISOString().substring(0, 10),
      location: event.location,
      price: event.price,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingFormData({ ...editingFormData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (eventId: number) => {
    try {
      const formattedData = {
        ...editingFormData,
        date: new Date(editingFormData.date).toISOString(), // Convert to ISO-8601 format
      };

      const response = await fetch(
        `http://localhost:3080/api/events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error('Failed to update event');
      }

      const updatedEvent = await response.json();

      setEvents(
        events.map((event) => (event.id === eventId ? updatedEvent : event)),
      );
      setEditingEventId(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingEventId(null);
  };

  const handleDelete = async (eventId: number) => {
    try {
      await fetch(`http://localhost:3080/api/events/${eventId}`, {
        method: 'DELETE',
      });
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Dashboard</h1>
      <table className="min-w-full bg-white table-fixed text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2">Event Title</th>
            <th className="py-1 px-2">Date</th>
            <th className="py-1 px-2">Location</th>
            <th className="py-1 px-2">Price</th>
            <th className="py-1 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              {editingEventId === event.id ? (
                <>
                  <td className="py-1 px-2">
                    <input
                      type="text"
                      name="eventTitle"
                      value={editingFormData.eventTitle}
                      onChange={handleEditChange}
                      className="w-full p-1 border border-gray-300 rounded text-xs"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <input
                      type="date"
                      name="date"
                      value={editingFormData.date}
                      onChange={handleEditChange}
                      className="w-full p-1 border border-gray-300 rounded text-xs"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <input
                      type="text"
                      name="location"
                      value={editingFormData.location}
                      onChange={handleEditChange}
                      className="w-full p-1 border border-gray-300 rounded text-xs"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <input
                      type="text"
                      name="price"
                      value={editingFormData.price}
                      onChange={handleEditChange}
                      className="w-full p-1 border border-gray-300 rounded text-xs"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <button
                      onClick={() => handleSaveClick(event.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2 text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-1 px-2">{event.eventTitle}</td>
                  <td className="py-1 px-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="py-1 px-2">{event.location}</td>
                  <td className="py-1 px-2">{event.price}</td>
                  <td className="py-1 px-2">
                    <button
                      onClick={() => handleEditClick(event)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventListEdit;
