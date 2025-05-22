import api from './api';

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.user.role); // Store user role/type
      localStorage.setItem('userEmail', response.data.user.email); // Store email
      localStorage.setItem('userId', response.data.user._id); // Store userId
    }
    return response.data;
  } catch (error) {
    console.log('error in login', error);
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
};

const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const getToken = () => {
  return localStorage.getItem('token');
};

export {
  login,
  signup,
  logout,
  checkAuthStatus,
  getToken
};