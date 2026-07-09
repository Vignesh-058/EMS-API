import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only toast global network/server errors to avoid double-toasting 
    // with component-level error handling (like 400 validation errors).
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      toast.error('Network Error. Please check your connection and try again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);
