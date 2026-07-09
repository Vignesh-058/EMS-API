# Employee Management System API Testing Guide

## Table of Contents
- [Introduction](#introduction)
- [Project Information](#project-information)
- [Base URL](#base-url)
- [Backend Folder Structure](#backend-folder-structure)
- [API Standards](#api-standards)
- [HTTP Status Codes](#http-status-codes)
- [Testing Workflow](#testing-workflow)
- [Postman Setup](#postman-setup)
- [Complete API Documentation](#complete-api-documentation)
  - [Employee Module](#employee-module)
  - [Health Module](#health-module)
- [Validation](#validation)
- [Database](#database)
- [Testing Flow](#testing-flow)
- [Final Checklist](#final-checklist)

---

## Introduction
This guide provides comprehensive documentation for testing the backend REST APIs of the Employee Management System. It is designed for developers, QA engineers, and testers to understand the API architecture, test edge cases in Postman, and verify data flow.

## Project Information
**Backend Stack:** Node.js, Express.js, MongoDB, Mongoose, Joi.  
**Frontend Stack:** React, TypeScript, Vite, Tailwind CSS, React Query, Axios.  
**Current Modules Implemented:** Employee, Health.  
*(Note: Authentication, Department, Attendance, and Payroll modules are not yet implemented in the backend API and are thus excluded from this document).*

## Base URL
The backend API is served locally during development.
```text
http://localhost:5000/api/v1
```

## Backend Folder Structure
```text
backend/
├── src/
│   ├── config/          # DB connection configuration
│   ├── constants/       # Global constants
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares
│   ├── models/          # Mongoose schemas
│   ├── routes/v1/       # API endpoints definitions
│   ├── services/        # Core business logic
│   ├── validators/      # Joi schemas for request validation
│   └── server.js        # Entry point
```

## API Standards
- **Request Format:** `application/json`
- **Response Format:** `application/json`
- **Pagination:** Query parameters `page` and `limit` are used for paginated GET requests.
- **Sorting:** Query parameters `sortBy` and `sortOrder`.

## HTTP Status Codes
The API uses standardized HTTP status codes:
- **200 OK:** Request successful (used for GET, PUT).
- **201 Created:** New resource successfully created (used for POST).
- **204 No Content:** Request successful, no body returned (often used for DELETE).
- **400 Bad Request:** Validation failed (e.g., missing required fields, invalid email).
- **401 Unauthorized:** Missing or invalid authentication token (if Auth is enabled).
- **403 Forbidden:** Authenticated, but lacks required permissions.
- **404 Not Found:** Requested resource or endpoint does not exist.
- **409 Conflict:** Duplicate data detected (e.g., email or employee ID already exists).
- **422 Unprocessable Entity:** Semantic errors in request payload.
- **500 Internal Server Error:** Unexpected server-side crashes.

## Testing Workflow
1. Start the server (`npm run dev` in the backend folder).
2. Verify MongoDB is connected.
3. Import the base URL into Postman.
4. Execute Health Check.
5. Execute Employee CRUD sequence (Create -> Get -> Update -> Delete).

## Postman Setup
### How to create Collection
1. Open Postman.
2. Click **New** > **Collection**.
3. Name it "Employee Management System API".

### How to create Environment
1. In Postman, click the **Environments** tab on the left.
2. Click **Create Environment** and name it "EMS Local".
3. Add a new variable:
   - **Variable:** `baseUrl`
   - **Initial Value:** `http://localhost:5000/api/v1`
   - **Current Value:** `http://localhost:5000/api/v1`
4. Save the environment and select "EMS Local" from the top-right dropdown.

### How to reuse variables
When making requests, replace the hardcoded URL with the variable: `{{baseUrl}}/employees`.
You can also script Postman to save returned IDs for subsequent tests (e.g., storing the newly created `employeeId` to a variable `createdId`).

---

## Complete API Documentation

### Employee Module

#### 1. Get All Employees
**Method:** `GET`  
**Endpoint:** `/api/v1/employees`  
**Purpose:** Fetches a paginated list of all employees.

**Query Parameters:**
- `page` (optional): Page number.
- `limit` (optional): Records per page.
- `search` (optional): Search by name, ID, email.
- `department` (optional): Filter by department.
- `status` (optional): Filter by status.
- `sortBy` (optional): Field to sort by.
- `sortOrder` (optional): `asc` or `desc`.

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 5,
    "totalEmployees": 48
  }
}
```

#### 2. Get Employee By ID
**Method:** `GET`  
**Endpoint:** `/api/v1/employees/:id`  
**Purpose:** Fetches details of a specific employee using their MongoDB `_id`.

**Path Parameters:**
- `id` (required): Valid MongoDB ObjectId.

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb8b3... ",
    "employeeId": "EMP001",
    "firstName": "John"
  }
}
```

**Possible Errors:**
- **400:** Invalid ObjectId format.
- **404:** Employee not found.

#### 3. Create Employee
**Method:** `POST`  
**Endpoint:** `/api/v1/employees`  
**Purpose:** Creates a new employee record.

**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "gender": "Male",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "department": "Engineering",
  "designation": "Software Engineer",
  "joiningDate": "2026-07-10T00:00:00.000Z",
  "salary": 60000,
  "address": "123 Main St",
  "status": "Active"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": { ... }
}
```

**Possible Errors:**
- **400 Validation Error:** Missing required fields, invalid email format.
- **409 Conflict:** `employeeId` or `email` already exists in the database.

**Postman Test Cases:**
- **Positive:** Valid Request (returns 201).
- **Negative:** Missing `firstName` (returns 400).
- **Negative:** Invalid `email` format like "john.com" (returns 400).
- **Edge Case:** Empty body `{}` (returns 400).
- **Edge Case:** Duplicate `email` from an existing record (returns 409).

#### 4. Update Employee
**Method:** `PUT`  
**Endpoint:** `/api/v1/employees/:id`  
**Purpose:** Updates an existing employee record. All fields in the body are optional.

**Path Parameters:** `id` (required MongoDB ObjectId)

**Request Body:**
```json
{
  "salary": 75000,
  "designation": "Senior Software Engineer"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": { ... }
}
```

**Possible Errors:**
- **400 Validation Error:** E.g., Negative salary provided.
- **404 Not Found:** Employee ID does not exist.

#### 5. Delete Employee
**Method:** `DELETE`  
**Endpoint:** `/api/v1/employees/:id`  
**Purpose:** Permanently deletes an employee.

**Success Response (200 OK / 204 No Content):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

**Possible Errors:**
- **404 Not Found:** Non-existing ObjectId.

---

### Health Module

#### Health Check
**Method:** `GET`  
**Endpoint:** `/api/v1/health`  
**Purpose:** Check server status and database connectivity.

**Success Response (200 OK):**
```json
{
  "status": "up",
  "timestamp": "2026-07-09T12:00:00Z"
}
```

---

## Validation

All POST/PUT request bodies are validated using **Joi** before hitting the database.

### Employee Validation Rules:
- `employeeId`: String, required.
- `firstName`, `lastName`: String, required.
- `email`: Valid email format, required, must be unique.
- `phone`: String, required.
- `gender`: Exact match of `Male`, `Female`, or `Other`.
- `dateOfBirth`: Valid ISO Date, required.
- `department`, `designation`: String, required.
- `joiningDate`: Valid ISO Date, required.
- `salary`: Number, minimum `0`, required.
- `address`: String, required.
- `status`: Exact match of `Active`, `Inactive`, `On Leave`, or `Terminated`.

*Note: Department, Attendance, and Payroll modules are not currently implemented in the backend API, so server-side validation for these domains does not exist yet.*

---

## Database
**MongoDB Collection:** `employees`

**Document Structure:**
Documents map 1:1 with the validation payload. Mongoose automatically handles `_id` creation, `createdAt`, and `updatedAt` timestamps. `employeeId` and `email` are enforced as globally unique at the database schema level via indexes.

---

## Testing Flow

When running automated or manual Postman testing, follow this sequence:

1. **Create:** POST a valid employee. Store the returned `_id`.
2. **Verify in MongoDB:** (Optional) Check local DB GUI to see the record.
3. **Get All:** GET `/api/v1/employees` and verify the new employee is in the array.
4. **Get By ID:** GET `/api/v1/employees/{{_id}}` and verify data integrity.
5. **Update:** PUT `/api/v1/employees/{{_id}}` to modify salary/department.
6. **Verify Update:** GET the ID again to verify changes persisted.
7. **Delete:** DELETE `/api/v1/employees/{{_id}}`.
8. **Verify Delete:** GET the ID again. Expect a `404 Not Found`.

---

## Final Checklist

**QA Checklist:**
- [ ] Server Running (No crashes on startup)
- [ ] MongoDB Connected (Verified via Health endpoint)
- [ ] Environment Variables Loaded (`.env` configured)
- [ ] Employee CRUD Working
- [ ] Employee Pagination/Search/Sorting Working
- [ ] Duplicate Validation Working (Returns 409)
- [ ] Payload Validation Working (Returns 400)
- [ ] Invalid Object IDs Handled Gracefully (Returns 400/404)
- [ ] Status Codes Correctly mapped to REST standards
- [ ] No Runtime Errors / Unhandled Promise Rejections in Console
