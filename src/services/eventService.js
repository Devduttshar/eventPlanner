import api from './api';

// Get all events
export const getAllEvents = async () => {
  try {
    const response = await api.get('/events/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
};

// Get user's RSVP events
export const getUserEvents = async () => {
  try {
    const response = await api.get('/events/userEvents');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user events');
  }
};

// Update RSVP status
export const updateRsvpStatus = async (eventId, status) => {
  try {
    const response = await api.post(`/events/${eventId}/rsvp`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update RSVP status');
  }
};

// Create new event (for admin)
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events/', eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
};

// Update event (for admin)
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update event');
  }
};

// Delete event (for admin)
export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete event');
  }
};

// Get event RSVPs (admin only)
export const getEventRsvps = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}/rsvps`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch event RSVPs');
  }
};

// Generate event report (admin only)
export const generateEventReport = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}/report`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate event report');
  }
};