import axiosInstance from './axios';

export const appointmentApi = {
  create: (data) => 
    axiosInstance.post('/appointments', data),
  
  getAll: (params = {}) => 
    axiosInstance.get('/appointments', { params }),
  
  getById: (id) => 
    axiosInstance.get(`/appointments/${id}`),
  
  updateStatus: (id, status) => 
    axiosInstance.patch(`/appointments/${id}/status`, { status }),
  
  getByPatient: (patientId) => 
    axiosInstance.get(`/appointments/patient/${patientId}`),
};