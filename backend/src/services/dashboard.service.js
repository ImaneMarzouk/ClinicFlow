const pool = require('../config/db');

const getDashboardStats = async () => {
  // Total patients
  const totalPatientsResult = await pool.query(
    'SELECT COUNT(*) FROM patients WHERE deleted_at IS NULL'
  );
  const totalPatients = parseInt(totalPatientsResult.rows[0].count);

  // Today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointmentsResult = await pool.query(
    `SELECT COUNT(*) FROM appointments 
     WHERE appointment_date >= $1 AND appointment_date < $2`,
    [today, tomorrow]
  );
  const todayAppointments = parseInt(todayAppointmentsResult.rows[0].count);

  // Pending appointments
  const pendingResult = await pool.query(
    "SELECT COUNT(*) FROM appointments WHERE status = 'pending'"
  );
  const pending = parseInt(pendingResult.rows[0].count);

  // Confirmed appointments
  const confirmedResult = await pool.query(
    "SELECT COUNT(*) FROM appointments WHERE status = 'confirmed'"
  );
  const confirmed = parseInt(confirmedResult.rows[0].count);

  // Recent appointments with patient info
  const recentAppointmentsResult = await pool.query(
    `SELECT a.*, p.full_name as patient_name
     FROM appointments a
     LEFT JOIN patients p ON a.patient_id = p.id
     ORDER BY a.created_at DESC
     LIMIT 5`
  );

  return {
    totalPatients,
    todayAppointments,
    pending,
    confirmed,
    recentAppointments: recentAppointmentsResult.rows
  };
};

module.exports = { getDashboardStats };