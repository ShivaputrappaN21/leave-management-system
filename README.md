# Employee Leave Management System

Angular 17 (frontend) + Spring Boot 3 REST API (backend) + MySQL.

## Project layout
```
backend/    Spring Boot (com.edutech.controller / model / service / repository / exception)
frontend/   Angular app (components, pages, services, router, reactive forms)
database/   schema.sql (tables, PK/FK, unique keys) and sample_data.sql
postman/    ELMS.postman_collection.json
```

## Software required
JDK 21 (`javac -version`), Maven (`mvn -version`), MySQL 8, Node.js 18+ with Angular CLI (`npm i -g @angular/cli`), Eclipse IDE (or any IDE).

## 1. Database
```
mysql -u root -p < database/schema.sql
mysql -u root -p < database/sample_data.sql
```
(The backend also creates/updates tables itself with `spring.jpa.hibernate.ddl-auto=update`.)

## 2. Backend  (http://localhost:8080)
Set your MySQL password as an environment variable (never commit it):
```
set DB_PASSWORD=yourpassword        (Windows)      export DB_PASSWORD=yourpassword   (Linux/Mac)
cd backend
mvn spring-boot:run
```

## 3. Frontend  (http://localhost:4200)
```
cd frontend
npm install
ng serve
```

## REST API summary
| Resource | Endpoints |
|---|---|
| Departments | GET/POST `/api/departments`, GET/PUT/DELETE `/api/departments/{id}` |
| Employees | GET/POST `/api/employees`, GET `/api/employees/search?name=`, GET/PUT/DELETE `/api/employees/{id}` |
| Leave types | GET/POST `/api/leave-types`, GET/PUT/DELETE `/api/leave-types/{id}` |
| Leave balances | GET/POST `/api/leave-balances`, GET/PUT/DELETE `/api/leave-balances/{id}` |
| Leave requests | GET (`?status=` / `?empNo=`)/POST `/api/leave-requests`, GET/PUT `/api/leave-requests/{id}`, PUT `/{id}/approve`, PUT `/{id}/reject`, DELETE `/{id}` (= status CANCELLED) |
| Dashboard | GET `/api/dashboard` |

Status codes: 200 OK, 201 Created, 400 validation error, 404 not found, 409 conflict (duplicate / overlap / record in use).
Errors are JSON: `{ "timestamp", "status", "error", "message" }`.

## Business rules
- Employee age 18..58, salary > 0, valid email (unique), department required.
- Leave: toDate >= fromDate, one calendar year per request.
- No overlapping PENDING/APPROVED leave for the same employee (409).
- Days cannot exceed remaining balance; balance is reserved on apply.
- Reject/cancel restores the days; DELETE on a request is a status change to CANCELLED.
- Departments with employees, leave types in use, and employees with leave history cannot be deleted (set employee INACTIVE instead).

## Test scenarios
Use `postman/ELMS.postman_collection.json` (base URL variable `base`). Run: create employee, apply leave, repeat with overlapping dates (409), age 17 (400), cancel request and check balance.
