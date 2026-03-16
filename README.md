# Smart Study Planner (MERN Stack)

## Description
Smart Study Planner is a full-stack productivity web application built using the MERN stack. It helps students organize their study schedule by managing subjects, tasks, and deadlines in one place. The application includes secure JWT authentication, a modern dashboard UI, and a Pomodoro timer to improve focus and productivity. With an intuitive interface and structured planning tools, the platform allows users to track their study progress and maintain consistent learning habits.

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- JWT Authentication
- bcrypt

**Database**
- MongoDB
- Mongoose

---

## Features

- User Registration and Login
- JWT Authentication
- Dashboard with study statistics
- Subject and Task management
- Pomodoro timer for focused study sessions
- Responsive modern UI using Tailwind CSS
- REST API architecture
- Secure password hashing

---

## Project Structure

```

smart-study-planner
│
├── client # React Frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
├── server # Node Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md

````

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/smart-study-planner.git
````

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

---

## Run the Project

Start Backend:

```bash
cd server
npm run dev
```

Start Frontend:

```bash
cd client
npm run dev
```

Open in browser:

[http://localhost:5173](http://localhost:5173)

---

## Environment Variables

Create a `.env` file inside the server folder:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---


## Author

Nisha Khandelwal
