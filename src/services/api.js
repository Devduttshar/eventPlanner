import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Added http:// protocol
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('error',error);
    return Promise.reject(error);
  }
);

export default api;
