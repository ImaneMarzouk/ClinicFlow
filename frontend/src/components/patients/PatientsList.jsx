import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientApi } from '../../api/patient.api';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatCIN } from '../../utils/helpers';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import toast from 'react-hot-toast';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, [search, page]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getAll({ search, page, limit: 10 });
      setPatients(response.data.data.data);
      setPagination(response.data.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    
    try {
      await patientApi.delete(id);
      toast.success('Patient deleted successfully');
      fetchPatients();
    } catch (error) {
      toast.error('Failed to delete patient');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        {isAdmin && (
          <button
            onClick={() => navigate('/patients/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Patient
          </button>
        )}
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or CIN..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {error && <ErrorMessage message={error} onRetry={fetchPatients} />}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Birth Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{patient.full_name}</td>
                <td className="px-6 py-4">{formatCIN(patient.cin)}</td>
                <td className="px-6 py-4">{patient.phone}</td>
                <td className="px-6 py-4">{formatDate(patient.birth_date)}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => navigate(`/patients/${patient.id}/edit`)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 flex justify-between items-center border-t">
            <span className="text-sm text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;