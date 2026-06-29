import axiosInstance from './axios';

export const authApi = {
  login: (email, password) => 
    axiosInstance.post('/auth/login', { email, password }),
  
  getMe: () => 
    axiosInstance.get('/auth/me'),
};