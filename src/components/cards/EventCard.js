import React, { useState } from 'react';
import { formatDate } from '../../utils/dateTimeUtils';

const EventCard = ({ event, onClick, onRsvpChange, showRsvp = false }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const [rsvpStatus, setRsvpStatus] = useState(event.rsvpStatus || '');
  

  const handleRsvpChange = (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setRsvpStatus(newStatus);
    onRsvpChange && onRsvpChange(event?.eventId, newStatus); // Changed from eventId to _id
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick && onClick(event)}
    >
      <img 
        src={event.image.url} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        {showRsvp && token && userType === 'user' && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">RSVP Status: {rsvpStatus || 'Not responded'}</p>
            <select
              value={rsvpStatus}
              onChange={handleRsvpChange}
              className="w-full p-2 border rounded-md text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="">Select RSVP</option>
              <option value="going">Going</option>
              <option value="maybe">Maybe</option>
              <option value="not_going">Not Going</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;