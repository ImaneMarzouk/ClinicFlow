import axiosInstance from './axios';

export const dashboardApi = {
  getStats: () => 
    axiosInstance.get('/dashboard/stats'),
};