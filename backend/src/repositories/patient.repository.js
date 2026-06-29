const pool = require('../config/db');

const createPatient = async (patientData) => {
  const { fullName, cin, phone, birthDate, address } = patientData;
  const result = await pool.query(
    `INSERT INTO patients (full_name, cin, phone, birth_date, address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [fullName, cin, phone, birthDate, address]
  );
  return result.rows[0];
};

const findPatientById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM patients WHERE id = $1 AND deleted_at IS NULL',
    [id]
  );
  return result.rows[0];
};

const findPatientByCIN = async (cin) => {
  const result = await pool.query(
    'SELECT * FROM patients WHERE cin = $1 AND deleted_at IS NULL',
    [cin]
  );
  return result.rows[0];
};

const findAllPatients = async (search = '', page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  let whereClause = 'WHERE deleted_at IS NULL';
  let params = [];
  let paramCount = 1;

  if (search) {
    whereClause += ` AND (full_name ILIKE $${paramCount} OR cin ILIKE $${paramCount})`;
    params.push(`%${search}%`);
    paramCount++;
  }

  const countQuery = `SELECT COUNT(*) FROM patients ${whereClause}`;
  const countResult = await pool.query(countQuery, params);
  const total = parseInt(countResult.rows[0].count);

  const dataQuery = `
    SELECT * FROM patients 
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${paramCount} OFFSET $${paramCount + 1}
  `;
  params.push(limit, offset);
  const dataResult = await pool.query(dataQuery, params);

  return {
    data: dataResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const updatePatient = async (id, updates) => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      fields.push(`${dbKey} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const queryText = `
    UPDATE patients 
    SET ${fields.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(queryText, values);
  return result.rows[0];
};

const deletePatient = async (id) => {
  // Soft delete
  const result = await pool.query(
    'UPDATE patients SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createPatient,
  findPatientById,
  findPatientByCIN,
  findAllPatients,
  updatePatient,
  deletePatient
};