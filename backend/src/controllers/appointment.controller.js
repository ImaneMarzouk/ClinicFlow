const appointmentService = require('../services/appointment.service');

const createAppointment = async (req, res, next) => {
  try {
    const appointmentData = {
      ...req.body,
      createdBy: req.user.id
    };
    const appointment = await appointmentService.createAppointment(appointmentData);
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

const getAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

const getAllAppointments = async (req, res, next) => {
  try {
    const { date, status } = req.query;
    const filters = {};
    if (date) filters.date = date;
    if (status) filters.status = status;
    
    const appointments = await appointmentService.getAllAppointments(filters);
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await appointmentService.updateAppointmentStatus(req.params.id, status);
    res.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

const getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAppointmentsByPatient(req.params.patientId);
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  getPatientAppointments
};