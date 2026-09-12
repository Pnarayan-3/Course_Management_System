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

## 🏗️ Architecture

Controllers

Handle incoming HTTP requests and return appropriate API responses.

Services

Contain the application's business logic and coordinate operations between controllers and repositories.

Repositories

Handle database-related operations and provide an abstraction over data access.

DTOs

Define the data transferred between the frontend and backend while keeping API contracts separate from database entities.

Models

Represent the application's domain and database entities.

Data

Contains database configuration and Entity Framework Core related components.

Middleware

Handles common HTTP request/response processing and cross-cutting concerns.

## ⚙️ Prerequisites

Make sure the following are installed before running the project:

Node.js
npm
.NET SDK
SQL Server
Git

Verify the installations:

node --version
npm --version
dotnet --version
git --version


## 🔧 Installation

1. Clone the Repository

git clone https://github.com/Pnarayan-3/CourseManagementSystem.git
cd CourseManagementSystem

2. Backend Setup

Navigate to the backend directory:

cd CourseManagementSystem

Restore the .NET dependencies:

dotnet restore

Configure the database connection in appsettings.json.

Example:

{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_DATABASE_CONNECTION_STRING"
  }
}

If the project uses Entity Framework Core migrations, update the database:

dotnet ef database update

Start the backend:

dotnet run

The API will be available at the URL displayed in the terminal.

3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

cd cmsfrontend/course-frontend

Install the required dependencies:

npm install

Start the React development server:

npm run dev

Vite will provide a local URL, usually:

http://localhost:5173

Open the URL in your browser to access the application.


## 🧪 API Testing

The backend APIs can be tested using:

Postman
.http request files


🖥️ Running the Application

Run the backend and frontend separately.

Backend
cd CourseManagementSystem
dotnet run
Frontend
cd cmsfrontend/course-frontend
npm install
npm run dev

Once both applications are running, open the frontend URL provided by Vite.


👨‍💻 Author

Pushkar Narayan

⭐ If you find this project useful, consider giving the repository a star.