const pool = require('../config/db');

const createAppointment = async (appointmentData) => {
  const { patientId, createdBy, appointmentDate, reason, notes } = appointmentData;
  const result = await pool.query(
    `INSERT INTO appointments (patient_id, created_by, appointment_date, reason, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [patientId, createdBy, appointmentDate, reason, notes || null]
  );
  return result.rows[0];
};

const findAppointmentById = async (id) => {
  const result = await pool.query(
    `SELECT a.*, 
            p.full_name as patient_name, p.cin as patient_cin,
            u.full_name as created_by_name
     FROM appointments a
     LEFT JOIN patients p ON a.patient_id = p.id
     LEFT JOIN users u ON a.created_by = u.id
     WHERE a.id = $1`,
    [id]
  );
  return result.rows[0];
};

const findConflictingAppointments = async (patientId, appointmentDate) => {
  const startTime = new Date(appointmentDate);
  startTime.setMinutes(startTime.getMinutes() - 30);
  const endTime = new Date(appointmentDate);
  endTime.setMinutes(endTime.getMinutes() + 30);

  const result = await pool.query(
    `SELECT * FROM appointments 
     WHERE patient_id = $1 
       AND status = 'confirmed'
       AND appointment_date BETWEEN $2 AND $3`,
    [patientId, startTime, endTime]
  );
  return result.rows;
};

const findAllAppointments = async (filters = {}) => {
  let whereClause = 'WHERE 1=1';
  const params = [];
  let paramCount = 1;

  if (filters.date) {
    whereClause += ` AND DATE(a.appointment_date) = $${paramCount}`;
    params.push(filters.date);
    paramCount++;
  }

  if (filters.status) {
    whereClause += ` AND a.status = $${paramCount}`;
    params.push(filters.status);
    paramCount++;
  }

  const queryText = `
    SELECT a.*, 
           p.full_name as patient_name, p.cin as patient_cin,
           u.full_name as created_by_name
    FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.id
    LEFT JOIN users u ON a.created_by = u.id
    ${whereClause}
    ORDER BY a.appointment_date DESC
  `;

  const result = await pool.query(queryText, params);
  return result.rows;
};

const updateAppointmentStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE appointments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

const getAppointmentsByPatient = async (patientId) => {
  const result = await pool.query(
    `SELECT a.*, 
            u.full_name as created_by_name
     FROM appointments a
     LEFT JOIN users u ON a.created_by = u.id
     WHERE a.patient_id = $1
     ORDER BY a.appointment_date DESC`,
    [patientId]
  );
  return result.rows;
};

module.exports = {
  createAppointment,
  findAppointmentById,
  findConflictingAppointments,
  findAllAppointments,
  updateAppointmentStatus,
  getAppointmentsByPatient
};