const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  // Zod validation error
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors
    });
  }

  // Database unique constraint error
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry found',
      detail: err.detail
    });
  }

  // Foreign key violation
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Referenced record not found'
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

module.exports = errorMiddleware;