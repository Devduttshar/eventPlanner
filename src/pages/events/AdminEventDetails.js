import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeading from '../../components/common/CustomHeading';
import CustomButton from '../../components/common/CustomButton';
import { formatTime, formatDate } from '../../utils/dateTimeUtils';
import { getEventRsvps, generateEventReport } from '../../services/eventService';

const AdminEventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventRsvps, setEventRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    if (userType !== 'admin') {
      navigate('/');
      return;
    }
    fetchEventRsvps();
  }, [eventId]);

  const fetchEventRsvps = async () => {
    try {
      setLoading(true);
      const response = await getEventRsvps(eventId);
      console.log('response',response);
      setEventRsvps(response.rsvps || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const response = await generateEventReport(eventId);
      // Handle the report data - you might want to download it or display it
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `event-report-${eventId}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Report generated successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRsvpStatusColor = (status) => {
    const colors = {
      going: 'text-green-600',
      maybe: 'text-yellow-600',
      not_going: 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <CustomHeading 
            text="Event RSVPs" 
            size="text-3xl"
            className="font-bold"
          />
        //   <CustomButton
        //     text="Generate Report"
        //     onClick={handleGenerateReport}
        //     disabled={loading}
        //     bgColor="bg-blue-600"
        //     className="hover:bg-blue-700"
        //   />
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RSVP Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventRsvps.map((rsvp) => (
                  <tr key={rsvp._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rsvp.user.name}</div>
                      <div className="text-sm text-gray-500">{rsvp.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getRsvpStatusColor(rsvp.status)}`}>
                        {rsvp.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rsvp.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventDetails;
