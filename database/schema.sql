CREATE DATABASE IF NOT EXISTS jis_db;
USE jis_db;

-- Users table (base for Registrar, Judge, Lawyer)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Hashed
    role ENUM('REGISTRAR', 'JUDGE', 'LAWYER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases table
CREATE TABLE cases (
    cin VARCHAR(50) PRIMARY KEY,
    defendant_name VARCHAR(100) NOT NULL,
    defendant_address VARCHAR(255) NOT NULL,
    crime_type VARCHAR(50) NOT NULL,
    crime_date DATE NOT NULL,
    crime_location VARCHAR(100) NOT NULL,
    arresting_officer VARCHAR(100) NOT NULL,
    arrest_date DATE NOT NULL,
    presiding_judge VARCHAR(100) NOT NULL,
    public_prosecutor VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    expected_completion_date DATE,
    status ENUM('PENDING', 'CLOSED') DEFAULT 'PENDING',
    judgment_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hearings table
CREATE TABLE hearings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cin VARCHAR(50) NOT NULL,
    hearing_date DATE NOT NULL,
    hearing_time TIME NOT NULL,
    courtroom VARCHAR(20),
    status ENUM('HELD', 'ADJOURNED') DEFAULT 'HELD',
    summary TEXT,
    adjournment_reason TEXT,
    FOREIGN KEY (cin) REFERENCES cases(cin) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bills table (for lawyer views)
CREATE TABLE bills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bill_id VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    generated_date DATE NOT NULL,
    lawyer_id BIGINT NOT NULL,
    case_cin VARCHAR(50),
    status ENUM('PAID', 'PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (lawyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (case_cin) REFERENCES cases(cin) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table (generated queries)
CREATE TABLE reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    report_id VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('PENDING', 'RESOLVED', 'STATUS', 'UPCOMING') NOT NULL,
    content TEXT NOT NULL,
    generated_date DATE NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs (for trail)
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,  -- e.g., CASE
    entity_id VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample data
-- Password: 'password' (bcrypt hashed)
INSERT INTO users (user_id, name, email, password, role) VALUES 
('reg1', 'Registrar John', 'reg@court.com', '$2b$10$58/5pp9cPyFkeQXWR4Uwoe8xbuck1roDpUvjOFrb25pXPti/c3X3e', 'REGISTRAR'),
('judge1', 'Judge Patel', 'judge@court.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/iyq', 'JUDGE'),
('lawyer1', 'Adv. Doe', 'lawyer@bar.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/iyq', 'LAWYER');

INSERT INTO cases (cin, defendant_name, defendant_address, crime_type, crime_date, crime_location, arresting_officer, arrest_date, presiding_judge, public_prosecutor, start_date, expected_completion_date) VALUES 
('MUM-2025-00042', 'John Doe', '12 Example St, Mumbai', 'Theft', '2025-06-01', 'Colaba', 'Officer R. Singh', '2025-06-05', 'Hon. J. Patel', 'Prosecutor K. Rao', '2025-07-01', '2025-12-01');