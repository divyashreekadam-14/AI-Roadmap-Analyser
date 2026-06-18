AI Career Roadmap Analyzer

Overview

AI Career Roadmap Analyzer is a full-stack web application that helps users discover the skills required for a specific career path. The system uses AI to generate personalized skill roadmaps and stores user and roadmap data in MongoDB.

The project combines frontend development, backend APIs, database management, authentication, and AI integration into a single platform.

---

Features

User Authentication

- User Registration (Sign Up)
- User Login
- Password Encryption using bcrypt
- User data stored securely in MongoDB

AI Career Analysis

- Enter any IT career role
- AI generates a customized roadmap
- Returns 10 beginner-friendly technical skills
- Dynamic skill recommendations

Roadmap Management

- Generate career roadmaps
- Save generated roadmaps to MongoDB
- Retrieve previously generated roadmaps

Database Integration

- MongoDB Atlas Cloud Database
- User Collection
- Roadmap Collection

---

Tech Stack

Frontend

- HTML5
- CSS3
- JavaScript

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas
- Mongoose

Authentication

- bcryptjs

AI Integration

- OpenRouter API
- GPT Model Integration

---

Project Architecture

User
→ Signup / Login
→ MongoDB Authentication
→ Enter Career Role
→ AI Processing (OpenRouter API)
→ Skill Roadmap Generation
→ Store in MongoDB
→ Display Results

---

Folder Structure

AI-CAREER-ROADMAP-ANALYZER
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Roadmap.js
│   │
│   ├── routes
│   │   └── auth.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── index.html
├── login.html
├── signup.html
├── style.css
├── script.js
└── README.md

---

Database Collections

Users Collection

{
  "username": "John",
  "email": "john@example.com",
  "password": "encrypted_password"
}

Roadmaps Collection

{
  "role": "Frontend Developer",
  "skills": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git"
  ]
}

---

Future Enhancements

- JWT Authentication
- User Dashboard
- Progress Tracking
- Skill Completion Tracking
- Personalized Learning Recommendations
- Resume Analysis
- Job Recommendation Engine

---

Author

Divyashree

Full Stack AI Career Guidance Project using HTML, CSS, JavaScript, Node.js, Express.js, MongoDB Atlas, and OpenRouter AI.
