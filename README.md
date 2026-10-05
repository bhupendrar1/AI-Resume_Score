# 🤖 AI Resume Score

**AI Resume Score** is an AI-powered resume analysis platform built with the **MERN stack**. It allows users to upload a resume, extract its content, analyze it with AI, generate a resume score, and receive personalized feedback to improve their chances of getting shortlisted.

The project combines a React-based frontend with a Node.js/Express backend, MongoDB for data management, PDF parsing for resume extraction, and Cohere AI for intelligent analysis.

## ✨ Features

- 📄 Upload resumes in PDF format
- 🔍 Extract resume text using PDF parsing
- 🤖 AI-powered resume analysis
- 📊 Generate an overall resume score
- 💡 Personalized suggestions and improvement feedback
- 🧠 Analyze resume content using Cohere AI
- 🔐 Backend API with structured routes, controllers, and models
- 🗄️ MongoDB integration using Mongoose
- 📦 File upload handling with Multer
- 🌐 RESTful backend architecture

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- pdf-parse
- dotenv
- Cohere AI

## 🏗️ Project Structure

```text
AI-Resume_Score/
│
├── Backened_ai/
│   ├── Controllers/       # Request handling and application logic
│   ├── Models/            # MongoDB/Mongoose models
│   ├── Routes/            # API routes
│   ├── Utils/             # Utility/helper functions
│   ├── Build/             # Backend build-related files
│   ├── uploads/           # Uploaded resume files
│   ├── conn.js            # Database connection
│   ├── index.js           # Express server entry point
│   ├── package.json
│   └── .env               # Environment variables (not committed)
│
├── ai_resume/             # Frontend application
│
└── README.md
```

## 🔄 How It Works

```text
User uploads Resume (PDF)
          ↓
     File Upload
          ↓
      PDF Parsing
          ↓
   Resume Text Extraction
          ↓
      AI Analysis
          ↓
    Resume Score + Feedback
          ↓
 Personalized Improvement Suggestions
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bhupendrar1/AI-Resume_Score.git
cd AI-Resume_Score
```

### 2. Setup the backend

```bash
cd Backened_ai
npm install
```

Create a `.env` file inside the `Backened_ai` directory and add your environment variables, for example:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
```

> Use the exact variable names expected by the source code when configuring your local environment.

Start the backend:

```bash
npm start
```

### 3. Setup the frontend

Open a new terminal and move to the frontend directory:

```bash
cd ai_resume
npm install
```

Start the frontend using the script defined in its `package.json`.

## 🔐 Environment Variables

Never commit API keys, passwords, database credentials, or other secrets to GitHub.

Typical backend configuration includes:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
```

Keep `.env` files in `.gitignore`.

## 🧩 Backend Architecture

The backend follows a modular structure:

- **Controllers** — handles application/request logic
- **Models** — defines database models using Mongoose
- **Routes** — organizes API endpoints
- **Utils** — reusable helper functionality
- **conn.js** — manages database connectivity
- **index.js** — initializes the Express server

The backend uses **Express.js**, **Mongoose**, **Multer**, **pdf-parse**, and **Cohere AI** as its core dependencies.

## 🎯 What This Project Demonstrates

- Full-stack MERN application development
- REST API development with Node.js and Express
- MongoDB database integration
- PDF file upload and text extraction
- Integration of an external AI service
- AI-assisted resume evaluation
- Modular backend architecture
- Environment variable management
- Building a practical application around a real-world hiring problem

## 🔮 Future Enhancements

- 📌 ATS keyword matching against job descriptions
- 🎯 Job-specific resume scoring
- 📈 Detailed score breakdown by resume section
- 💼 Job recommendation based on resume skills
- 📊 Resume analytics dashboard
- 🔑 User authentication and resume history
- 📥 Export analysis reports as PDF
- ☁️ Production deployment with cloud storage

## 👨‍💻 Author

**Bhupendra Singh**  
MERN / Full-Stack Developer

- GitHub: [@bhupendrar1](https://github.com/bhupendrar1)

---

⭐ If you find **AI Resume Score** useful, consider giving the repository a star!
