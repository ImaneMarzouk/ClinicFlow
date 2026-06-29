const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { validateAppointment, validateStatusUpdate } = require('../validators/appointment.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', validateAppointment, appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointment);
router.patch('/:id/status', validateStatusUpdate, appointmentController.updateAppointmentStatus);

// Get appointments for a specific patient
router.get('/patient/:patientId', appointmentController.getPatientAppointments);

module.exports = router;