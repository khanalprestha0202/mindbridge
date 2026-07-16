import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Mood
export const saveMood = (data) => API.post('/mood', data);
export const getMoodHistory = () => API.get('/mood/history');
export const getMoodStats = () => API.get('/mood/stats');

// Chat
export const getCrisisResources = () => API.get('/chat/resources');