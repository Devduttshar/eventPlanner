import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeading from '../../components/common/CustomHeading';
import CustomButton from '../../components/common/CustomButton';
import EventCard from '../../components/cards/EventCard';
import EventDetailsModal from '../../components/modals/EventDetailsModal';
import { formatTime, formatDate } from '../../utils/dateTimeUtils';
import api from '../../services/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <CustomHeading 
            text="Event Planner" 
            size="text-5xl md:text-6xl"
            align="text-center"
            color="text-white"
            className="mb-6 font-extrabold tracking-tight"
          />
          <CustomHeading 
            text="Plan and manage your events with ease" 
            size="text-xl md:text-2xl"
            color="text-blue-100"
            align="text-center"
            className="mb-12 max-w-2xl mx-auto"
          />
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="container mx-auto px-4 py-16">
        <CustomHeading 
          text="Featured Events" 
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
        />
      )}

      {/* Call to Action with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white mt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <CustomHeading 
            text="Ready to Plan Your Next Event?" 
            size="text-4xl"
            color="text-white"
            className="mb-6 font-bold"
          />
          <p className="mb-10 text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of event planners who trust us to create memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton
              onClick={() => window.location.href = '/signup'}
              text="Start Planning"
              bgColor="bg-white"
              textColor="text-blue-600"
              padding="px-8 py-4"
              className="hover:bg-blue-50 transform hover:scale-105 transition-transform duration-200"
            />
            <CustomButton
            onClick={() => window.location.href = '/login'}
              text="Login"
              bgColor="bg-transparent"
              textColor="text-white"
              padding="px-8 py-4"
              className="border-2 border-white hover:bg-white/10 transform hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;