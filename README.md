# Employee Management System

A full-stack, enterprise-grade Employee Management System designed to streamline HR operations. This application allows administrators to seamlessly manage employee records, track organizational structures, and maintain a centralized directory with real-time updates.

## Project Features

- **Comprehensive CRUD Operations:** Create, Read, Update, and Delete employee records with instant UI synchronization.
- **Server-Side Data Processing:** Robust pagination, search, sorting, and filtering operations handled strictly on the backend for optimal performance with large datasets.
- **Responsive UI/UX:** Built with Tailwind CSS and shadcn/ui, featuring dynamic dialogs, dark mode support, and fluid layouts for desktop and mobile devices.
- **Global Error Handling:** Centralized Axios interceptors and React Sonner toast notifications ensure reliable feedback for network and server errors.
- **Form Validation:** Client-side and server-side data validation using Zod and Mongoose to ensure strict data integrity (e.g., unique emails, valid phone numbers).
- **Real-Time Data Fetching:** Powered by React Query for automatic caching, refetching, and optimistic updates.

## Technology Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS v4 & shadcn/ui
- React Query (@tanstack/react-query)
- Axios
- React Router DOM
- React Hook Form & Zod

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) & bcryptjs (for future auth scaling)
- Helmet & Express Rate Limit (Security)

## Project Architecture

The application strictly adheres to a decoupled client-server architecture:
- **Frontend (Client):** A Single Page Application (SPA) responsible for rendering the UI, managing local state, caching server data via React Query, and presenting forms.
- **Backend (API):** A RESTful Node/Express server acting as the bridge to the database. It handles routing, middleware validation, business logic (Services), and database interactions (Models).

### Folder Structure

```text
employee-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment configurations
│   │   ├── constants/       # Global backend constants
│   │   ├── controllers/     # Route handlers processing requests/responses
│   │   ├── database/        # DB connection logic
│   │   ├── middlewares/     # Express middlewares (error handling, auth)
│   │   ├── models/          # Mongoose schemas (e.g., employee.model.js)
│   │   ├── routes/          # API route definitions (v1)
│   │   ├── scripts/         # Utility scripts (e.g., seeders)
│   │   ├── services/        # Business logic and database queries
│   │   ├── types/           # Type definitions
│   │   ├── utils/           # Helper functions
│   │   └── validators/      # Joi/Zod validation schemas for requests
│   └── package.json
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── assets/          # Images, SVGs
    │   ├── components/      # Reusable UI components (Auth, Dashboard, Employee, UI, etc.)
    │   ├── config/          # Frontend configurations
    │   ├── constants/       # Global frontend constants
    │   ├── contexts/        # React Context providers (e.g., ThemeProvider)
    │   ├── data/            # Mock data or static datasets
    │   ├── hooks/           # Custom React hooks (e.g., useEmployees, useCreateEmployee)
    │   ├── layouts/         # Page layout wrappers (PageContainer)
    │   ├── lib/             # Utility libraries (QueryClient, Tailwind cn)
    │   ├── pages/           # Route views (Dashboard, Employees, Departments, Settings, etc.)
    │   ├── routes/          # React Router configurations
    │   ├── schemas/         # Zod schemas for form validation
    │   ├── services/        # Axios API configurations and service calls
    │   ├── store/           # Global state management (if applicable)
    │   ├── styles/          # Global CSS (Tailwind imports)
    │   ├── types/           # TypeScript interfaces
    │   └── utils/           # Helper functions
    └── package.json
```

### Frontend Architecture
The frontend leverages a modular component architecture. The presentation layer uses `shadcn/ui` components structured inside `src/components/ui/`. Domain-specific components (like `EmployeeTable`, `AddEmployeeDialog`) reside in `src/components/employee/`. Data fetching and caching are abstracted into custom hooks inside `src/hooks/` powered by React Query. The API interaction layer is centralized in `src/services/`.

### Backend Architecture
The backend follows a layered MVC-like architecture:
1. **Routes:** Intercepts HTTP requests and passes them to Controllers.
2. **Controllers:** Extracts request parameters/body and calls the appropriate Service.
3. **Services:** Contains core business logic and performs operations via Models.
4. **Models:** Mongoose representations of MongoDB collections.

## Database Collections

### `employees` Collection
The core collection storing all employee records.
- `_id`: MongoDB ObjectId.
- `employeeId`: Unique string identifier (e.g., EMP-001).
- `firstName`, `lastName`: Employee's full name.
- `email`: Unique email address.
- `phone`: Contact number.
- `gender`: Enum (`Male`, `Female`, `Other`).
- `dateOfBirth`: Date object.
- `department`: Department name (e.g., Engineering, HR).
- `designation`: Job title (e.g., Senior Developer).
- `joiningDate`: Date of employment commencement.
- `salary`: Numeric compensation.
- `address`: Physical address string.
- `status`: Enum (`Active`, `Inactive`, `On Leave`, `Terminated`).
- `avatar`: Optional string for profile picture URL.

## REST APIs

### Employee Endpoints (`/api/v1/employees`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **GET** | `/api/v1/employees` | Fetches a paginated list of employees. Supports query parameters for `page`, `limit`, `search`, `sortBy`, `sortOrder`, and filters (`department`, `status`, etc.). |
| **GET** | `/api/v1/employees/:id` | Fetches detailed information for a single employee by their MongoDB ID. |
| **POST** | `/api/v1/employees` | Creates a new employee record. Validates required fields, unique email, and unique employee ID. |
| **PUT** | `/api/v1/employees/:id` | Updates an existing employee record by ID. |
| **DELETE** | `/api/v1/employees/:id` | Permanently removes an employee record from the database. |

### Health Check (`/api/v1/health`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **GET** | `/api/v1/health` | Returns server health status, uptime, and database connection state. |

## Application Flow

1. **Initialization:** The user loads the application at the root (`/`). The React Router directs the user to the Dashboard.
2. **Navigation:** Using the sidebar, the user navigates to the Employees page (`/employees`).
3. **Data Fetching:** The `useEmployees` hook mounts, triggering a `GET` request to `/api/v1/employees` with default pagination parameters. React Query caches the response.
4. **Rendering:** The `Employees` page passes the data down to the `EmployeeTable` component, rendering the grid. Skeletons and Spinners show during the loading phase.
5. **Interactivity:** The user can interact with the Search bar or Filters, which instantly updates the query parameters, triggering a background refetch via React Query to get the filtered data from the backend.

## CRUD Flow

### Create Flow
User clicks "Add Employee" → `AddEmployeeDialog` opens → User fills form → Zod validates inputs → `useCreateEmployee` mutation fires → Axios sends `POST /api/v1/employees` → Backend validates and saves to MongoDB → Responds with `201 Created` → React Query invalidates `['employees']` cache → Table automatically refetches and displays new record.

### Read Flow
User navigates to Employees page → `useEmployees` hook fires → Axios sends `GET /api/v1/employees` → Backend queries MongoDB with pagination metadata → Responds with `200 OK` → React Query caches data → `EmployeeTable` renders the rows.
*To view details:* User clicks Eye icon → `ViewEmployeeDialog` opens with selected record's data.

### Update Flow
User clicks Edit icon → `EditEmployeeDialog` opens, pre-filled with data → User modifies fields → Zod validates → `useUpdateEmployee` mutation fires → Axios sends `PUT /api/v1/employees/:id` → Backend updates MongoDB → React Query invalidates cache → UI refreshes instantly.

### Delete Flow
User clicks Delete icon → `DeleteEmployeeDialog` warns user → User clicks Confirm → `useDeleteEmployee` mutation fires → Axios sends `DELETE /api/v1/employees/:id` → Backend removes record from MongoDB → React Query invalidates cache → Deleted row vanishes from the UI.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas instance)

### Environment Variables
Create a `.env` file in the **backend** directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management
NODE_ENV=development
```

### Run Backend
```bash
cd backend
npm install
npm run dev
```
*The backend server will start on http://localhost:5000*

### Run Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The Vite development server will start (typically on http://localhost:5173)*

## Project Screenshots Section

## Dashboard
(Add Screenshot)

## Employees
(Add Screenshot)

## Known Features
- Dark Mode toggle integration.
- Responsive data tables with mobile-friendly cards.
- Comprehensive search and filtering.
- Pagination out-of-the-box.
- Cross-origin resource sharing (CORS) configured.

## Future Improvements
- **Authentication & Authorization:** Integrate JWT-based login, role-based access control (Admin vs Employee).
- **Payroll & Attendance Modules:** Expand the current static UI into fully functional modules linked to employee records.
- **Export Functionality:** Implement CSV/Excel export for the employee grid.
- **Bulk Operations:** Add the ability to select multiple employees for bulk status updates or deletions.

## Author
Senior Full Stack Engineer

## License
ISC License
