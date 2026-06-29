const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { validatePatient, validatePatientUpdate } = require('../validators/patient.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.post('/', validatePatient, patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatient);
router.put('/:id', validatePatientUpdate, patientController.updatePatient);
router.delete('/:id', roleMiddleware(['admin']), patientController.deletePatient);

module.exports = router;