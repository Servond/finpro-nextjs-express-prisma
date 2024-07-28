const BASE_URL = 'http://localhost:3000/api';

export const fetchEvents = async (
  currentPage: number,
  eventsPerPage: number,
) => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const eventData = await response.json();
    return eventData;
  } catch (error) {
    throw error;
  }
};

export const fetchFilteredEvents = async (search: string, location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/events/search?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch filtered events');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch filtered events');
  }
};

export const fetchEventById = async (eventId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event by id');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch event by id');
  }
};
