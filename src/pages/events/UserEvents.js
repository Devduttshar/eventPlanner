import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeading from '../../components/common/CustomHeading';
import EventCard from '../../components/cards/EventCard';
import EventDetailsModal from '../../components/modals/EventDetailsModal';
import { formatTime, formatDate } from '../../utils/dateTimeUtils';
import { getUserEvents, updateRsvpStatus } from '../../services/eventService';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const response = await getUserEvents();
      setEvents(Array.isArray(response?.data) ? response.data : response.data || []);
    } catch (error) {
      console.error('Error fetching user events:', error);
      toast.error(error.message);
      setEvents([]);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRsvpChange = async (eventId, status) => {
    try {
      await updateRsvpStatus(eventId, status);
      toast.success('RSVP updated successfully');
      fetchUserEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <CustomHeading 
          text="My RSVP Events" 
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
              No RSVP events found
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
        />
      )}
    </div>
  );
};

export default UserEvents;