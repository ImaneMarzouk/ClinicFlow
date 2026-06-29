const { z } = require('zod');

const appointmentSchema = z.object({
  patientId: z.string().uuid('Invalid patient ID format'),
  appointmentDate: z.iso.datetime(),
  reason: z.string().min(3, 'Reason must be at least 3 characters'),
  notes: z.string().optional()
});

const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled'])
});


const validateStatusUpdate = (req, res, next) => {
  try {
    statusUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors
    });
  }
};
const validateAppointment = (req, res, next) => {
  console.log(req.body);

  try {
    appointmentSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.issues);

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.issues
    });
  }
};

module.exports = { validateAppointment, validateStatusUpdate };