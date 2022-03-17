import { create } from 'axios'

export const API = create({
  baseURL: 'http://localhost:5000'
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cendana.user.token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
