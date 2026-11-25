USE leave_db;

INSERT INTO department (dept_code, dept_name, location, head_name) VALUES
 ('HR','Human Resources','Bengaluru','Kavitha N'),
 ('IT','Information Technology','Bengaluru','Arjun M'),
 ('FIN','Finance','Chennai','Sandeep R'),
 ('SAL','Sales','Mumbai','Priya D');

INSERT INTO employee (name, age, gender, email, salary, join_date, status, dept_id) VALUES
 ('Anita Rao',29,'Female','anita.rao@edutech.com',41000.00,'2021-03-15','ACTIVE',3),
 ('Suresh B',35,'Male','suresh.b@edutech.com',48500.00,'2018-07-01','ACTIVE',4),
 ('Ravi Kumar',31,'Male','ravi.kumar@edutech.com',52000.00,'2019-06-12','ACTIVE',2),
 ('Meena Iyer',42,'Female','meena.i@edutech.com',60500.00,'2015-01-20','ACTIVE',1);

INSERT INTO leave_type (type_code, type_name, max_days_per_year, is_paid) VALUES
 ('AL','Annual Leave',18,1),('SL','Sick Leave',10,1),('CL','Casual Leave',8,1);

INSERT INTO leave_balance (emp_no, leave_type_id, leave_year, allotted_days, used_days)
SELECT e.emp_no, t.leave_type_id, 2026, t.max_days_per_year, 0 FROM employee e CROSS JOIN leave_type t;
