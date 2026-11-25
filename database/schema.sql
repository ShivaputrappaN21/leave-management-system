-- Employee Leave Management System : MySQL schema (InnoDB)
CREATE DATABASE IF NOT EXISTS leave_db;
USE leave_db;

CREATE TABLE IF NOT EXISTS department (
  dept_id    INT AUTO_INCREMENT PRIMARY KEY,
  dept_code  VARCHAR(10) NOT NULL,
  dept_name  VARCHAR(60) NOT NULL,
  location   VARCHAR(60),
  head_name  VARCHAR(60),
  CONSTRAINT uk_dept_code UNIQUE (dept_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee (
  emp_no     INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(60)  NOT NULL,
  age        INT          NOT NULL,
  gender     VARCHAR(10)  NOT NULL,
  email      VARCHAR(100) NOT NULL,
  salary     DECIMAL(10,2) NOT NULL,
  join_date  DATE         NOT NULL,
  status     VARCHAR(10)  NOT NULL DEFAULT ACTIVE,
  dept_id    INT          NOT NULL,
  CONSTRAINT uk_employee_email UNIQUE (email),
  CONSTRAINT ck_employee_age CHECK (age BETWEEN 18 AND 58),
  CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id)
) ENGINE=InnoDB AUTO_INCREMENT=1001;

CREATE TABLE IF NOT EXISTS leave_type (
  leave_type_id     INT AUTO_INCREMENT PRIMARY KEY,
  type_code         VARCHAR(10) NOT NULL,
  type_name         VARCHAR(50) NOT NULL,
  max_days_per_year INT         NOT NULL,
  is_paid           TINYINT(1)  NOT NULL DEFAULT 1,
  CONSTRAINT uk_type_code UNIQUE (type_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS leave_balance (
  balance_id     INT AUTO_INCREMENT PRIMARY KEY,
  emp_no         INT NOT NULL,
  leave_type_id  INT NOT NULL,
  leave_year     INT NOT NULL,
  allotted_days  INT NOT NULL,
  used_days      INT NOT NULL DEFAULT 0,
  CONSTRAINT uk_balance UNIQUE (emp_no, leave_type_id, leave_year),
  CONSTRAINT fk_bal_emp  FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
  CONSTRAINT fk_bal_type FOREIGN KEY (leave_type_id) REFERENCES leave_type(leave_type_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS leave_request (
  request_id     INT AUTO_INCREMENT PRIMARY KEY,
  emp_no         INT NOT NULL,
  leave_type_id  INT NOT NULL,
  from_date      DATE NOT NULL,
  to_date        DATE NOT NULL,
  days           INT  NOT NULL,
  reason         VARCHAR(200),
  status         VARCHAR(10) NOT NULL,
  applied_date   DATE NOT NULL,
  CONSTRAINT ck_request_dates CHECK (to_date >= from_date),
  CONSTRAINT fk_req_emp  FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
  CONSTRAINT fk_req_type FOREIGN KEY (leave_type_id) REFERENCES leave_type(leave_type_id)
) ENGINE=InnoDB AUTO_INCREMENT=1001;
