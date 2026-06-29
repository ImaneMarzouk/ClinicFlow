const appointmentRepository = require('../repositories/appointment.repository');
const patientRepository = require('../repositories/patient.repository');

const createAppointment = async (appointmentData) => {
  // Check if patient exists
  const patient = await patientRepository.findPatientById(appointmentData.patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  // Check for conflicting appointments (30-minute window)
  const conflicts = await appointmentRepository.findConflictingAppointments(
    appointmentData.patientId,
    appointmentData.appointmentDate
  );

  if (conflicts.length > 0) {
    throw new Error('Patient already has a confirmed appointment within 30 minutes of this time');
  }

  return await appointmentRepository.createAppointment(appointmentData);
};

const getAppointmentById = async (id) => {
  const appointment = await appointmentRepository.findAppointmentById(id);
  if (!appointment) {
    throw new Error('Appointment not found');
  }
  return appointment;
};

const getAllAppointments = async (filters) => {
  return await appointmentRepository.findAllAppointments(filters);
};

const updateAppointmentStatus = async (id, status) => {
  const appointment = await appointmentRepository.findAppointmentById(id);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  // If confirming, check for conflicts
  if (status === 'confirmed' && appointment.status !== 'confirmed') {
    const conflicts = await appointmentRepository.findConflictingAppointments(
      appointment.patient_id,
      appointment.appointment_date
    );
    
    // Filter out the current appointment if it's being updated
    const filteredConflicts = conflicts.filter(a => a.id !== id);
    
    if (filteredConflicts.length > 0) {
      throw new Error('Patient already has a confirmed appointment within 30 minutes of this time');
    }
  }

  return await appointmentRepository.updateAppointmentStatus(id, status);
};

const getAppointmentsByPatient = async (patientId) => {
  const patient = await patientRepository.findPatientById(patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return await appointmentRepository.getAppointmentsByPatient(patientId);
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointmentStatus,
  getAppointmentsByPatient
};