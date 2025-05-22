import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomButton from '../../components/common/CustomButton';
import { createEvent } from '../../services/events';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      image: null
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
      date: Yup.date()
        .required('Date is required')
        .min(new Date(), 'Past dates are not allowed'),
      startTime: Yup.string()
        .required('Start time is required'),
      endTime: Yup.string()
        .required('End time is required'),
      location: Yup.string()
        .required('Location is required'),
      image: Yup.mixed()
        .required('Image is required')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });

        const response = await createEvent(formData);
        if (response) {
          toast.success('Event created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate('/my-events');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to create event. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create New Event
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Event Image
            </label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 w-auto"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
            {formik.touched.image && formik.errors.image && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.image}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...formik.getFieldProps('title')}
              className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...formik.getFieldProps('description')}
              className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...formik.getFieldProps('date')}
              className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                formik.touched.date && formik.errors.date
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {formik.touched.date && formik.errors.date && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                {...formik.getFieldProps('startTime')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                  formik.touched.startTime && formik.errors.startTime
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.startTime}</p>
              )}
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                {...formik.getFieldProps('endTime')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                  formik.touched.endTime && formik.errors.endTime
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.endTime}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps('location')}
              className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm ${
                formik.touched.location && formik.errors.location
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {formik.touched.location && formik.errors.location && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.location}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <CustomButton
              type="submit"
              text={loading ? "Creating..." : "Create Event"}
              width="w-full"
              bgColor="bg-indigo-600"
              textColor="text-white"
              padding="px-4 py-2"
              className="hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;