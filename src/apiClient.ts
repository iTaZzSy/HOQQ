import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://my-app-backend-s725.onrender.com/api',
});

export default apiClient;
