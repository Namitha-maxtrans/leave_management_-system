-- =========================================
-- LEAVE MANAGEMENT SYSTEM DATABASE
-- =========================================

CREATE DATABASE IF NOT EXISTS company2;

USE company2;


-- =========================================
-- 1. DEPARTMENT
-- =========================================

CREATE TABLE IF NOT EXISTS department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);


-- =========================================
-- 2. EMPLOYEE
-- =========================================

CREATE TABLE IF NOT EXISTS employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_of_joining DATE NOT NULL,
    dept_id INT NOT NULL,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (dept_id)
        REFERENCES department(id)
);


-- =========================================
-- 3. LEAVE TYPE
-- =========================================

CREATE TABLE IF NOT EXISTS leave_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    annual_quota INT NOT NULL
);


-- =========================================
-- 4. LEAVE BALANCES
-- =========================================

CREATE TABLE IF NOT EXISTS leave_balances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    allocated INT NOT NULL,
    used INT NOT NULL DEFAULT 0,

    CONSTRAINT fk_leave_balance_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee(id),

    CONSTRAINT fk_leave_balance_leave_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_type(id),

    CONSTRAINT unique_employee_leave_type
        UNIQUE (employee_id, leave_type_id)
);


-- =========================================
-- 5. LEAVE REQUESTS
-- =========================================

CREATE TABLE IF NOT EXISTS leave_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_request_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee(id),

    CONSTRAINT fk_leave_request_leave_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_type(id)
);


-- =========================================
-- SEED DATA
-- =========================================


-- =========================================
-- DEPARTMENTS
-- =========================================

INSERT INTO department (id, name)
VALUES
(1, 'Frontend'),
(2, 'Backend devolopment'),
(4, 'Testing');


-- =========================================
-- EMPLOYEES
-- =========================================

INSERT INTO employee
(id, name, email, date_of_joining, dept_id)
VALUES
(1, 'Namitha', 'namitha@gmail.com', '2026-09-17', 1),
(2, 'Rahul', 'rahul12@gmail.com', '2026-09-17', 2),
(3, 'Vignesh', 'Vignesh@gmail.com', '2026-09-22', 1);


-- =========================================
-- LEAVE TYPES
-- =========================================

INSERT INTO leave_type
(id, name, annual_quota)
VALUES
(1, 'Casual leave', 12),
(2, 'Sick', 10);


-- =========================================
-- LEAVE BALANCES
-- =========================================

INSERT INTO leave_balances
(id, employee_id, leave_type_id, allocated, used)
VALUES
(1, 1, 1, 12, 3),
(3, 3, 1, 12, 0),
(4, 3, 2, 10, 0),
(7, 1, 2, 12, 0);


-- =========================================
-- LEAVE REQUESTS
-- =========================================

INSERT INTO leave_requests
(
    id,
    employee_id,
    leave_type_id,
    start_date,
    end_date,
    days_count,
    reason,
    status,
    created_at
)
VALUES
(
    1,
    1,
    1,
    '2026-09-20',
    '2026-09-22',
    3,
    'Personal work',
    'CANCELLED',
    '2026-09-18 11:21:27.321'
),

(
    2,
    1,
    1,
    '2026-10-05',
    '2026-10-07',
    3,
    'Personal work',
    'CANCELLED',
    '2026-09-18 11:52:37.106'
),

(
    3,
    1,
    2,
    '2026-09-25',
    '2026-09-27',
    3,
    'Personal work',
    'APPROVED',
    '2026-09-22 06:26:53.733'
),

(
    4,
    1,
    1,
    '2026-09-25',
    '2026-09-27',
    3,
    'Personal work',
    'REJECTED',
    '2026-09-22 06:30:29.507'
);


-- =========================================
-- CHECK DATA
-- =========================================

SELECT * FROM department;

SELECT * FROM employee;

SELECT * FROM leave_type;

SELECT * FROM leave_balances;

SELECT * FROM leave_requests;