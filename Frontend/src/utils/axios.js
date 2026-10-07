import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  try {
    const rawUser = localStorage.getItem('userInfo');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      if (user._id) config.headers['x-user-id'] = user._id;
      if (user.email) config.headers['x-user-email'] = user.email;
    }
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Error in axios request interceptor:', e);
  }
  return config;
});

export default instance;
