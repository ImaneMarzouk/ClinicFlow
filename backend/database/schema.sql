
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM (
    'admin',
    'staff'
);

CREATE TYPE appointment_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled'
);

CREATE TABLE users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role user_role NOT NULL DEFAULT 'staff',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE patients (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(150) NOT NULL,

    cin VARCHAR(20) UNIQUE NOT NULL,

    phone VARCHAR(20) NOT NULL,

    birth_date DATE NOT NULL,

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP

);

CREATE TABLE appointments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    patient_id UUID NOT NULL,

    created_by UUID NOT NULL,

    appointment_date TIMESTAMP NOT NULL,

    status appointment_status DEFAULT 'pending',

    reason TEXT NOT NULL,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
        REFERENCES patients(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT

);

CREATE INDEX idx_patient_name
ON patients(full_name);

CREATE INDEX idx_patient_cin
ON patients(cin);

CREATE INDEX idx_appointment_date
ON appointments(appointment_date);

CREATE INDEX idx_appointment_status
ON appointments(status);