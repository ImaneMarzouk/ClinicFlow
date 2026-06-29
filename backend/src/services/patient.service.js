const patientRepository = require('../repositories/patient.repository');

const createPatient = async (patientData) => {
  // Check if CIN already exists
  const existing = await patientRepository.findPatientByCIN(patientData.cin);
  if (existing) {
    throw new Error('Patient with this CIN already exists');
  }
  return await patientRepository.createPatient(patientData);
};

const getPatientById = async (id) => {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const getAllPatients = async (search, page, limit) => {
  return await patientRepository.findAllPatients(search, page, limit);
};

const updatePatient = async (id, updates) => {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }

  // If CIN is being updated, check for uniqueness
  if (updates.cin) {
    const existing = await patientRepository.findPatientByCIN(updates.cin);
    if (existing && existing.id !== id) {
      throw new Error('Patient with this CIN already exists');
    }
  }

  return await patientRepository.updatePatient(id, updates);
};

const deletePatient = async (id) => {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return await patientRepository.deletePatient(id);
};

module.exports = {
  createPatient,
  getPatientById,
  getAllPatients,
  updatePatient,
  deletePatient
};