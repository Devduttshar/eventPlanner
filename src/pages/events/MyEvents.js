import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeading from '../../components/common/CustomHeading';
import CustomButton from '../../components/common/CustomButton';
import api from '../../services/api';

const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      setEvents([]); // Set empty array on error
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/events/${selectedEvent.eventId}`);
      toast.success('Event deleted successfully');
      setShowDeleteModal(false);
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleEdit = (event) => {
    navigate(`/update-event/${event.eventId}`, { state: { event } });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEventClick = (event, e) => {
    // Prevent opening modal when clicking edit or delete buttons
    if (e.target.closest('button')) return;
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <CustomHeading 
          text="My Events" 
          size="text-3xl"
          className="mb-8 text-center font-bold"
        />

        {Array.isArray(events) && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={(e) => handleEventClick(event, e)}
              >
                <img 
                  src={`${event.image.url}`} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <CustomButton
                      text="Edit"
                      bgColor="bg-blue-600"
                      padding="px-4 py-2"
                      className="mr-2"
                      onClick={() => handleEdit(event)}
                    />
                    <CustomButton
                      text="Show Report"
                      bgColor="bg-blue-600"
                      padding="px-4 py-2"
                      className="mr-2"
                      onClick={() => {
                        navigate(`/events/${event.eventId}`);
                        setShowEventModal(false);
                      }}
                    />
                    <CustomButton
                      text="Delete"
                      bgColor="bg-red-600"
                      padding="px-4 py-2"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            No events found
          </div>
        )}

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh]">
              <div className="relative">
                <img 
                  src={selectedEvent.image.url} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                    <p className="text-gray-600">{selectedEvent.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Date & Time</h3>
                    <p className="text-gray-600">
                      {formatDate(selectedEvent.date)}
                    </p>
                    <p className="text-gray-600">
                      {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                    <p className="text-gray-600">{selectedEvent.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <CustomButton
                      text="Edit"
                      bgColor="bg-blue-600"
                      padding="px-4 py-2"
                      className="mr-2"
                      onClick={() => handleEdit(selectedEvent)}
                    />
                    <CustomButton
                      text="Show Report"
                      bgColor="bg-blue-600"
                      padding="px-4 py-2"
                      className="mr-2"
                      onClick={() => {
                        navigate(`/events/${selectedEvent.eventId}`);
                        setShowEventModal(false);
                      }}
                    />
                    <CustomButton
                      text="Delete"
                      bgColor="bg-red-600"
                      padding="px-4 py-2"
                      onClick={() => {
                        setSelectedEvent(selectedEvent);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <CustomButton
                  text="Cancel"
                  bgColor="bg-gray-200"
                  textColor="text-gray-800"
                  padding="px-4 py-2"
                  onClick={() => setShowDeleteModal(false)}
                />
                <CustomButton
                  text="Delete"
                  bgColor="bg-red-600"
                  padding="px-4 py-2"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
