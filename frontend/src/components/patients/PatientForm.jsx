import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientApi } from '../../api/patient.api';
import toast from 'react-hot-toast';
import Loading from '../common/Loading';
import { FaUser, FaIdCard, FaPhone, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    cin: '',
    phone: '',
    birthDate: '',
    address: '',
  });

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getById(id);
      const patient = response.data.data;
      setFormData({
        fullName: patient.full_name,
        cin: patient.cin,
        phone: patient.phone,
        birthDate: patient.birth_date?.split('T')[0] || '',
        address: patient.address || '',
      });
    } catch (error) {
      toast.error('Erreur lors du chargement du patient');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }
    if (!formData.cin.trim()) {
      newErrors.cin = 'Le CIN est requis';
    } else if (formData.cin.length < 4) {
      newErrors.cin = 'Le CIN doit contenir au moins 4 caractères';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (formData.phone.length < 8) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'La date de naissance est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }

    setSubmitting(true);

    try {
      if (id) {
        await patientApi.update(id, formData);
        toast.success('Patient modifié avec succès');
      } else {
        await patientApi.create(formData);
        toast.success('Patient créé avec succès');
      }
      navigate('/patients');
    } catch (error) {
      const message = error.response?.data?.message || 'Une erreur est survenue';
      toast.error(message);
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach(err => {
          const field = err.path?.[0] || 'general';
          apiErrors[field] = err.message;
        });
        setErrors(apiErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? '✏️ Modifier le Patient' : '➕ Ajouter un Patient'}
        </h1>
        <button
          onClick={() => navigate('/patients')}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          ← Retour
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Nom complet */}
            <div>
              <label className="label">
                Nom complet <span className="required">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ex: Ahmed Benani"
                  className={`input-field pl-10 ${errors.fullName ? 'error' : ''}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* CIN */}
            <div>
              <label className="label">
                CIN <span className="required">*</span>
              </label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  placeholder="Ex: AB12345"
                  className={`input-field pl-10 ${errors.cin ? 'error' : ''}`}
                />
              </div>
              {errors.cin && (
                <p className="text-sm text-red-500 mt-1">{errors.cin}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="label">
                Téléphone <span className="required">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ex: 0612345678"
                  className={`input-field pl-10 ${errors.phone ? 'error' : ''}`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date de naissance */}
            <div>
              <label className="label">
                Date de naissance <span className="required">*</span>
              </label>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.birthDate ? 'error' : ''}`}
                />
              </div>
              {errors.birthDate && (
                <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>
              )}
            </div>

            {/* Adresse */}
            <div>
              <label className="label">Adresse</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Adresse complète..."
                  rows="3"
                  className="input-field pl-10 resize-none"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 btn-primary ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {id ? 'Modification...' : 'Création...'}
                  </span>
                ) : (
                  id ? '💾 Modifier le Patient' : '➕ Créer le Patient'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/patients')}
                className="flex-1 btn-secondary"
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;