import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeading from '../../components/common/CustomHeading';
import EventCard from '../../components/cards/EventCard';
import EventDetailsModal from '../../components/modals/EventDetailsModal';
import { formatTime, formatDate } from '../../utils/dateTimeUtils';
import api from '../../services/api';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/');
      setEvents(Array.isArray(response.data) ? response.data : response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
      setEvents([]);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEdit = (event) => {
    navigate(`/update-event/${event._id}`, { state: { event } });
  };

  const handleDelete = async (event) => {
    try {
      await api.delete(`/events/${event._id}`);
      toast.success('Event deleted successfully');
      setShowEventModal(false);
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleRsvpChange = async (eventId, status) => {
    try {
      await api.post(`/events/${eventId}/rsvp`, { status });
      toast.success('RSVP updated successfully');
      fetchEvents(); // Refresh events to get updated RSVP status
    } catch (error) {
      toast.error('Failed to update RSVP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <CustomHeading 
          text="All Events" 
          size="text-4xl"
          className="mb-12 text-center font-bold"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={handleEventClick}
                onRsvpChange={handleRsvpChange}
                showRsvp={true}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-600 mt-8">
              No events found
            </div>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setShowEventModal(false)}
          formatTime={formatTime}
          formatDate={formatDate}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? handleDelete : undefined}
        />
      )}
    </div>
  );
};

export default Events;