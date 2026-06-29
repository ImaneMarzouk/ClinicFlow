-- Password for all seeded users is: Password123!
-- Hash generated with bcrypt

INSERT INTO users (id, full_name, email, password, role) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@clinicflow.com', 
     '$2b$10$YourHashedPasswordHere1', 'admin'),
    ('22222222-2222-2222-2222-222222222222', 'Staff User 1', 'staff1@clinicflow.com',
     '$2b$10$YourHashedPasswordHere2', 'staff'),
    ('33333333-3333-3333-3333-333333333333', 'Staff User 2', 'staff2@clinicflow.com',
     '$2b$10$YourHashedPasswordHere3', 'staff');

-- Patients
INSERT INTO patients (id, full_name, cin, phone, birth_date, address) VALUES
    ('44444444-4444-4444-4444-444444444444', 'John Doe', 'CIN123456', '0612345678', '1990-05-15', '123 Main St, City'),
    ('55555555-5555-5555-5555-555555555555', 'Jane Smith', 'CIN789012', '0687654321', '1985-08-22', '456 Oak Ave, Town'),
    ('66666666-6666-6666-6666-666666666666', 'Bob Johnson', 'CIN345678', '0655544333', '1992-11-30', '789 Pine Rd, Village'),
    ('77777777-7777-7777-7777-777777777777', 'Alice Brown', 'CIN901234', '0677788899', '1988-03-10', '321 Elm St, City'),
    ('88888888-8888-8888-8888-888888888888', 'Charlie Wilson', 'CIN567890', '0699900111', '1995-07-25', '654 Maple Dr, Town');

-- Appointments
INSERT INTO appointments (patient_id, created_by, appointment_date, status, reason, notes) VALUES
    ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 
     '2026-06-30 09:00:00', 'confirmed', 'Annual checkup', 'Bring previous medical records'),
    ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222',
     '2026-06-30 10:30:00', 'pending', 'Dental consultation', 'Tooth pain'),
    ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333',
     '2026-06-30 14:00:00', 'confirmed', 'Vaccination', 'COVID-19 booster'),
    ('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222',
     '2026-07-01 09:30:00', 'cancelled', 'Eye examination', 'Patient cancelled'),
    ('88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333',
     '2026-07-01 11:00:00', 'pending', 'Blood test', 'Fasting required'),
    ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333',
     '2026-07-02 08:30:00', 'confirmed', 'Follow-up', 'Post-surgery check'),
    ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222',
     '2026-07-02 13:00:00', 'pending', 'X-ray', 'Chest pain'),
    ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333',
     '2026-07-03 10:00:00', 'confirmed', 'Consultation', 'Routine checkup'),
    ('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222',
     '2026-07-03 15:30:00', 'cancelled', 'Dental cleaning', 'Rescheduled'),
    ('88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333',
     '2026-07-04 09:00:00', 'pending', 'Physical therapy', 'Back pain');