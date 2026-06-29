import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientApi } from '../../api/patient.api';
import { appointmentApi } from '../../api/appointment.api';
import { formatDate, formatDateTime, getStatusBadge } from '../../utils/helpers';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { useAuth } from '../../context/AuthContext';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [patientRes, appointmentsRes] = await Promise.all([
        patientApi.getById(id),
        appointmentApi.getByPatient(id),
      ]);
      setPatient(patientRes.data.data);
      setAppointments(appointmentsRes.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load patient details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button          onClick={() => navigate('/patients')}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-2xl font-bold flex-1">Patient Details</h1>
        {isAdmin && (
          <button
            onClick={() => navigate(`/patients/${id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{patient.full_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">CIN</p>
            <p className="text-lg font-semibold">{patient.cin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-semibold">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Birth Date</p>
            <p className="text-lg font-semibold">{formatDate(patient.birth_date)}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-semibold">{patient.address || '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date & Time</th>
                <th className="text-left py-2">Reason</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Created By</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="py-2">{formatDateTime(appointment.appointment_date)}</td>
                  <td className="py-2">{appointment.reason}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusBadge(appointment.status)}
                    </span>
                  </td>
                  <td className="py-2">{appointment.created_by_name}</td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;