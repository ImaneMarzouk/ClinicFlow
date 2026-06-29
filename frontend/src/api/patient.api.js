import axiosInstance from './axios';

export const patientApi = {
  create: (data) => 
    axiosInstance.post('/patients', data),
  
  getAll: (params = {}) => 
    axiosInstance.get('/patients', { params }),
  
  getById: (id) => 
    axiosInstance.get(`/patients/${id}`),
  
  update: (id, data) => 
    axiosInstance.put(`/patients/${id}`, data),
  
  delete: (id) => 
    axiosInstance.delete(`/patients/${id}`),
};