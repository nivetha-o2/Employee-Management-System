# Employee Management System

This is an Employee Management System built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). It allows administrators to manage employee data such as employee details, positions, date of joining, and performance reviews in an organization. The application offers a user-friendly interface for managing employee-related tasks and is designed to streamline HR management processes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Employee Management System is designed to help HR departments efficiently manage employee records. This system can add, update, and delete employee details, track their attendance, and manage other employee-related tasks.

### Key Functionalities:
- Add, edit, and delete employee information.
- View employee details such as name, role, department, etc.
- Assign employees to roles.
- Secure user authentication (Admin login).

## Features

- **Admin Dashboard:** A comprehensive dashboard to view and manage employees, roles, departments, and attendance.
- **Employee Management:** Ability to add, update, and delete employees.
- **Role Management:** Manage different roles and their permissions in the organization.
- **Department Management:** Assign employees to specific departments.
- **Attendance Management:** Track the attendance of employees.
- **Authentication:** Secure login system for the admin using JWT.

## Tech Stack

### Frontend:
- **Angular:** A powerful front-end framework for building dynamic single-page applications.
- **HTML5/CSS3:** Basic structure and styling for the UI.
- **Bootstrap:** Responsive design for mobile-friendly UI.

### Backend:
- **Node.js:** JavaScript runtime for the backend server.
- **Express.js:** Web framework for Node.js to handle HTTP requests and middleware.

### Database:
- **MongoDB:** NoSQL database to store employee and HR-related data.

### Authentication:
- **JWT (JSON Web Tokens):** Used for secure authentication and authorization of the admin.
