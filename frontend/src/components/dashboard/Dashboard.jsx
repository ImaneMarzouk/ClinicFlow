import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../../api/dashboard.api';
import { 
  FaUsers, 
  FaCalendarDay, 
  FaClock, 
  FaCheckCircle,
  FaUserMd,
  FaStethoscope
} from 'react-icons/fa';
import { formatDateTime, getStatusBadge } from '../../utils/helpers';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getStats();
      setStats(response.data.data);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStats} />;

  const statsCards = [
    { 
      title: 'Patients Totaux', 
      value: stats?.totalPatients || 0, 
      icon: FaUsers,
      color: 'bg-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-500'
    },
    { 
      title: "Rendez-vous Aujourd'hui", 
      value: stats?.todayAppointments || 0, 
      icon: FaCalendarDay,
      color: 'bg-green-500',
      bg: 'bg-green-50',
      text: 'text-green-500'
    },
    { 
      title: 'En Attente', 
      value: stats?.pending || 0, 
      icon: FaClock,
      color: 'bg-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-500'
    },
    { 
      title: 'Confirmés', 
      value: stats?.confirmed || 0, 
      icon: FaCheckCircle,
      color: 'bg-purple-500',
      bg: 'bg-purple-50',
      text: 'text-purple-500'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <FaStethoscope className="text-indigo-600 text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
          <p className="text-gray-500 text-sm">Vue d'ensemble de votre activité médicale</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
              </div>
              <div className={`${card.bg} p-3 rounded-xl`}>
                <card.icon className={`${card.text} text-xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            📋 Derniers Rendez-vous
          </h2>
          <span className="text-xs text-gray-400">
            {stats?.recentAppointments?.length || 0} rendez-vous
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentAppointments?.map((appointment, index) => (
                <tr key={appointment.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaUserMd className="text-gray-400" />
                      <span className="font-medium text-gray-800">{appointment.patient_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDateTime(appointment.appointment_date)}
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {appointment.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${
                      appointment.status === 'confirmed' ? 'badge-confirmed' :
                      appointment.status === 'pending' ? 'badge-pending' :
                      'badge-cancelled'
                    }`}>
                      {getStatusBadge(appointment.status)}
                    </span>
                  </td>
                </tr>
              ))}
              {(!stats?.recentAppointments || stats.recentAppointments.length === 0) && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <FaCalendarDay className="text-3xl" />
                      <p>Aucun rendez-vous récent</p>
                    </div>
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

export default Dashboard;