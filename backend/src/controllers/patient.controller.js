const patientService = require('../services/patient.service');

const createPatient = async (req, res, next) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

const getPatient = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const result = await patientService.getAllPatients(search, parseInt(page), parseInt(limit));
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Patient updated successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getPatient,
  getAllPatients,
  updatePatient,
  deletePatient
};