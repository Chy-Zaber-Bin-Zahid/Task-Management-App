import axios from 'axios';

const excludedRoutes = [
  '/auth/login',
  '/auth/register',
];

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && config.headers && config.url) {
      const path = config.url.toLowerCase();

      const isExcluded = excludedRoutes.some(route => path.startsWith(route.toLowerCase()));

      if (!isExcluded) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
