import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../common/CustomButton';

const EventDetailsModal = ({ event, onClose, formatTime, formatDate, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';

  const handleViewReport = () => {
    navigate(`/events/${event._id}`);
    onClose();
  };
  console.log('event',event?.image?.url);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh]">
        
        <div className="p-6">
        <div className="relative">
                <img 
                  src={event.image.url} 
                  alt={event.title}
                  className="w-full rounded-md h-64 object-cover"
                />
                <button 
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
          <h2 className="text-2xl font-bold mt-4 mb-4">{event.title}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Date & Time</h3>
              <p className="text-gray-600">
                {formatDate(event.date)}
              </p>
              <p className="text-gray-600">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Location</h3>
              <p className="text-gray-600">{event.location}</p>
            </div>
            
            {/* Action Buttons - Only show for admin */}
            {/* {isAdmin && (
              <div className="flex justify-end space-x-4 mt-6">
                <CustomButton
                  text="Show Report"
                  onClick={handleViewReport}
                  bgColor="bg-blue-600"
                  textColor="text-white"
                  padding="px-4 py-2"
                  className="hover:bg-blue-700"
                />
                <CustomButton
                  text="Edit"
                  onClick={() => onEdit && onEdit(event)}
                  bgColor="bg-green-600"
                  textColor="text-white"
                  padding="px-4 py-2"
                  className="hover:bg-green-700"
                />
                <CustomButton
                  text="Delete"
                  onClick={() => onDelete && onDelete(event)}
                  bgColor="bg-red-600"
                  textColor="text-white"
                  padding="px-4 py-2"
                  className="hover:bg-red-700"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;