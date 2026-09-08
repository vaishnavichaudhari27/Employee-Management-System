# Employee Management System

A full-stack Employee Management System built using the MERN stack.  
This application provides secure authentication and allows users to manage employee records efficiently.

## Features

- User Registration & Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected REST APIs
- Add Employee
- View Employees
- Update Employee
- Delete Employee
- Dashboard
- Department Management
- Employee & Salary Reports
- MongoDB Database Integration

## Technologies Used

### Frontend
- React.js
- Vite
- Bootstrap 5
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
Employee-Management-System
│
├── client
│   ├── src
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    ├── server.js
    ├── .env
    └── package.json
