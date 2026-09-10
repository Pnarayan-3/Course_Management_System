# Course Management System

A full-stack Course Management System built using **React.js** for the frontend and **ASP.NET Core Web API with C#** for the backend.

The application follows a structured backend architecture with Controllers, Services, Repositories, DTOs, Models, and Data layers. The React frontend communicates with the backend through RESTful APIs.

---

## 🚀 Features

- Course management
- RESTful API integration
- React-based frontend
- ASP.NET Core Web API backend
- Layered backend architecture
- DTO-based data transfer
- Repository and Service layers
- Middleware for request processing
- Database integration
- Environment-based configuration
- API testing using `.http` files

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Node.js
- npm

### Backend

- C#
- ASP.NET Core Web API
- .NET
- Entity Framework Core
- REST APIs

### Database

- SQL Server
- Entity Framework Core

### Development Tools

- Visual Studio Code
- Visual Studio
- Git
- GitHub
- Postman

---

## 📁 Project Structure

```text
CourseManagementSystem/
│
├── cmsfrontend/
│   └── course-frontend/
│       ├── public/
│       ├── src/
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── README.md
│       └── vite.config.js
│
├── CourseManagementSystem/
│   ├── bin/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Middleware/
│   ├── Models/
│   ├── obj/
│   ├── Properties/
│   ├── Repositories/
│   ├── Services/
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── CourseManagementSystem.csproj
│   └── CourseManagementSystem.http
│
├── .gitignore
└── README.md