import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentApi } from '../../api/appointment.api';
import { patientApi } from '../../api/patient.api';
import toast from 'react-hot-toast';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentDate: '',
    reason: '',
    notes: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await patientApi.getAll({ page: 1, limit: 100 });
      setPatients(response.data.data.data || []);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setLoadingPatients(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await appointmentApi.create(formData);
      toast.success('Appointment created successfully');
      navigate('/appointments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Appointment</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient *
            </label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.full_name} - {patient.cin}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason *
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="Reason for appointment"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting || loadingPatients}
              className={`flex-1 bg-blue-600 text-white py-2 rounded-lg transition ${
                submitting || loadingPatients ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Creating...' : 'Create Appointment'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;