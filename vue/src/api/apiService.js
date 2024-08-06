import axios from 'axios';
import { getTokenCookie } from './cookie';

export const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiHeaderService = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

apiHeaderService.interceptors.request.use(
  (config) => {
    const token = getTokenCookie();
    config.headers['Authorization'] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);