import api from './api';

export const fetchEvents = async (
  currentPage: number,
  eventsPerPage: number,
) => {
  try {
    const response = await api.get('/events', {
      params: {
        page: currentPage,
        limit: eventsPerPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const fetchFilteredEvents = async (search: string, location: string) => {
  try {
    const response = await api.get('/events/search', {
      params: {
        search: search,
        location: location,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch filtered events');
  }
};

export const fetchEventById = async (eventId: string) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch event by id');
  }
};
