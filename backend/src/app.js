const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middlewares/error.middleware');

// Import routes
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;