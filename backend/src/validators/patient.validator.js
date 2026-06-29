const { z } = require('zod');

const patientSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  cin: z.string().min(4, 'CIN must be at least 4 characters'),
  phone: z.string().min(8, 'Phone must be at least 8 characters'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  address: z.string().optional()
});

const validatePatient = (req, res, next) => {
  try {
    patientSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors
    });
  }
};

const validatePatientUpdate = (req, res, next) => {
  try {
    patientSchema.partial().parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors
    });
  }
};

module.exports = { validatePatient, validatePatientUpdate };