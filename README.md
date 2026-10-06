# 🤖 AI Resume Score

AI Resume Score is a full-stack resume evaluation platform that compares a candidate's resume with a Job Description (JD) and generates an AI-powered evaluation.

Users can upload a PDF resume, provide a Job Description, and receive an **overall match score, ATS compatibility score, matched skills, missing skills, strengths, and actionable improvement suggestions**.

The application also provides **Google/Firebase authentication, evaluation history, and an admin dashboard** for viewing resume evaluation statistics.

## ✨ Features

### 👤 User Features

- 🔐 Google authentication with Firebase
- 📄 Upload resume in PDF format
- 📝 Enter a Job Description for comparison
- 🤖 AI-powered resume evaluation using Cohere
- 📊 Overall resume/job match score
- 🎯 ATS compatibility score
- ✅ Matched skills detection
- ❌ Missing skills/keywords detection
- 💪 Candidate strengths
- 💡 Actionable resume improvement suggestions
- 🕒 View previous resume evaluations
- 🔍 Open detailed evaluation reports
- 🗑️ Delete previous evaluations

### 🛡️ Admin Features

- 👥 Access user records
- 📊 View overall resume evaluation statistics
- 📈 Average resume score
- 🎯 Average ATS score
- 🔥 Count of high-match resumes
- 📋 View all resume evaluation records

## 🧠 How It Works

```text
                 User
                   │
                   ▼
          Login with Google
          (Firebase Auth)
                   │
                   ▼
          Upload Resume PDF
                   │
                   ▼
         Enter Job Description
                   │
                   ▼
        React Frontend (Vite)
                   │
                   ▼
       Node.js + Express API
                   │
          ┌────────┴────────┐
          ▼                 ▼
     PDF Parsing       MongoDB/Mongoose
          │                 │
          ▼                 │
      Cohere AI             │
          │                 │
          └────────┬────────┘
                   ▼
             AI Evaluation
                   │
                   ▼
      ┌──────────────────────────┐
      │ Overall Score             │
      │ ATS Score                 │
      │ Matched Skills            │
      │ Missing Skills            │
      │ Strengths                 │
      │ Improvements              │
      └──────────────────────────┘
                   │
                   ▼
          Dashboard / History
```

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- JavaScript (ES Modules)
- React Router
- Axios
- Material UI (MUI)
- Firebase Authentication
- CSS / CSS Modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cohere AI
- Multer
- pdf-parse
- CORS
- dotenv
- Firebase / Firebase Admin

### Development Tools

- Git
- GitHub
- VS Code
- Nodemon

## 📁 Project Structure

```text
AI-Resume_Score/
│
├── Backened_ai/
│   ├── Controllers/
│   │   ├── resume.js
│   │   └── user.js
│   │
│   ├── Models/
│   │   ├── resume.js
│   │   └── user.js
│   │
│   ├── Routes/
│   │   ├── resume.js
│   │   └── user.js
│   │
│   ├── Utils/
│   │   └── multer.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminOnly.js
│   │
│   ├── Build/
│   │   └── index.html
│   │
│   ├── uploads/
│   │   └── Uploaded PDF resumes
│   │
│   ├── conn.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── ai_resume/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── component/
│   │   │   ├── Admin/
│   │   │   │   ├── Admin.jsx
│   │   │   │   └── Admin.module.css
│   │   │   │
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Dashboard.module.css
│   │   │   │
│   │   │   ├── History/
│   │   │   │   ├── History.jsx
│   │   │   │   └── History.module.css
│   │   │   │
│   │   │   ├── Login/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.module.css
│   │   │   │
│   │   │   └── SideBar/
│   │   │       ├── SideBar.jsx
│   │   │       └── SideBar.module.css
│   │   │
│   │   ├── utils/
│   │   │   ├── HOC/
│   │   │   │   └── withAuthHOC.jsx
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── axios.js
│   │   │   └── firebase.jsx
│   │   │
│   │   ├── assets/
│   │   │   └── hero.png
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .env.example
│
├── .gitignore
├── TODO.md
└── README.md
```

> **Note:** Generated/dependency directories such as `node_modules` are intentionally not included in the documented project structure.

## 🔌 Backend API

The backend exposes two main route groups:

### User Routes

```text
POST /api/user/register
POST /api/user/
GET  /api/user/
```

### Resume Routes

```text
POST   /api/resume/addResume
GET    /api/resume/get/:user
GET    /api/resume/get
DELETE /api/resume/:id
```

The resume upload endpoint accepts a PDF file and a Job Description, then processes the resume and stores the evaluation result.

## 📊 Resume Evaluation Output

Each evaluation can contain:

| Field | Description |
|---|---|
| Overall Score | Overall candidate/job match score from 0–100 |
| ATS Score | ATS keyword and formatting compatibility score |
| Summary | AI-generated executive summary |
| Skills Matched | Skills found in both resume and job requirements |
| Skills Missing | Important skills/keywords missing from the resume |
| Strengths | Candidate strengths identified from the resume |
| Improvements | Actionable recommendations for resume optimization |

## 🔐 Authentication & Authorization

The frontend uses **Firebase Authentication with Google** for user login.

The backend uses authentication middleware and supports two roles:

- `user`
- `admin`

Protected resume operations require authentication, while administrative resume statistics and user records require admin authorization.

## ⚙️ Environment Variables

Create the required environment files locally.

### Backend

Create:

```text
Backened_ai/.env
```

Example:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend

Create:

```text
ai_resume/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Use the variable names required by the current source code and never commit private credentials or API secrets.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhupendrar1/AI-Resume_Score.git
cd AI-Resume_Score
```

### 2. Install Backend Dependencies

```bash
cd Backened_ai
npm install
```

Create your backend `.env` file and configure MongoDB, Cohere, and other required values.

Start the backend:

```bash
npm start
```

The backend runs on port `4000` by default.

### 3. Install Frontend Dependencies

Open a new terminal:

```bash
cd ai_resume
npm install
```

Create the frontend `.env` file if required.

Start the frontend:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal, normally:

```text
http://localhost:5173
```

## 🔄 Main User Flow

1. Open the application.
2. Sign in using Google.
3. Go to the Dashboard.
4. Upload a PDF resume.
5. Enter the target Job Description.
6. Click **Analyze**.
7. The backend extracts the resume text.
8. Cohere AI evaluates the resume against the Job Description.
9. The result is stored in MongoDB.
10. View the score and recommendations on the Dashboard.
11. Review previous evaluations from **History**.

## 📈 Admin Dashboard

The admin section provides an overview of stored resume evaluations, including:

- Total resumes analyzed
- Average overall score
- Average ATS score
- High-match resume count
- Complete evaluation records

## 🎯 Project Highlights

This project demonstrates practical experience with:

- Full-stack MERN development
- React component-based architecture
- Vite frontend tooling
- REST API development
- MongoDB and Mongoose
- PDF file upload and text extraction
- Generative AI integration with Cohere
- Firebase Google authentication
- Authentication and role-based authorization
- Resume-to-job-description matching
- ATS-oriented resume analysis
- Persistent evaluation history
- Admin analytics
- Environment-based configuration

## 🔮 Future Improvements

- 🎯 Job-specific resume optimization
- 🔑 More robust role and permission management
- 📄 Export detailed evaluation reports as PDF
- 📊 Advanced analytics and visualizations
- 💼 Job recommendations based on resume skills
- 🔍 Improved ATS keyword and semantic matching
- ☁️ Cloud storage for uploaded resumes
- 🚀 Production deployment and CI/CD
- 🧪 Automated backend and frontend tests

## 👨‍💻 Author

**Bhupendra Singh**

MERN / Full-Stack Developer

GitHub: [@bhupendrar1](https://github.com/bhupendrar1)

---

⭐ If you find this project useful, consider giving the repository a star!
