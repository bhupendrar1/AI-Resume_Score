# 🤖 SmartResumeAI

> AI-powered full-stack resume analyzer that compares resumes with job descriptions and generates ATS-focused insights.

SmartResumeAI lets candidates upload a PDF resume, enter a target Job Description, and receive an AI-generated evaluation with **overall match score, ATS score, matched skills, missing skills, strengths, and improvement suggestions**.

## ✨ Features

### 👤 Candidate
- 🔐 Google authentication with Firebase
- 📄 PDF resume upload
- 📝 Job Description input
- 🤖 Cohere-powered AI evaluation
- 📊 Overall resume/job match score
- 🎯 ATS compatibility score
- ✅ Matched skills
- ❌ Missing skills
- 💪 Strengths
- 💡 Actionable improvements
- 🕒 Analysis history
- 🔍 Detailed reports
- 🗑️ Delete previous analyses

### 🛡️ Admin
- 👥 View users
- 📋 View all resume evaluations
- 📊 Total resumes analyzed
- 📈 Average overall score
- 🎯 Average ATS score
- 🔥 High-match resume count

## 🧠 How It Works

```text
Resume PDF + Job Description
            │
            ▼
     React + Vite Frontend
            │
            ▼
    Node.js + Express API
            │
       ┌────┴────┐
       ▼         ▼
   PDF Parser  MongoDB
       │       / Mongoose
       ▼
    Cohere AI
       │
       ▼
  Resume Analysis
       │
       ├── Overall Score
       ├── ATS Score
       ├── Matched Skills
       ├── Missing Skills
       ├── Strengths
       └── Improvements
```

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, JavaScript, React Router, Axios, Material UI, Firebase Authentication, CSS/CSS Modules

**Backend:** Node.js, Express.js, MongoDB, Mongoose, Cohere AI, Multer, pdf-parse, Firebase Admin, CORS, dotenv

**Tools:** Git, GitHub, VS Code, Nodemon

## 📁 Project Structure

```text
SmartResumeAI/
│
├── Backened_ai/
│   ├── Controllers/
│   │   ├── resume.js
│   │   └── user.js
│   ├── Models/
│   │   ├── resume.js
│   │   └── user.js
│   ├── Routes/
│   │   ├── resume.js
│   │   └── user.js
│   ├── Utils/
│   │   └── multer.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminOnly.js
│   ├── Build/
│   ├── uploads/
│   ├── conn.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── ai_resume/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   ├── History/
│   │   │   ├── Login/
│   │   │   └── SideBar/
│   │   ├── utils/
│   │   │   ├── HOC/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── axios.js
│   │   │   └── firebase.jsx
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── TODO.md
└── README.md
```

## 🔌 API Endpoints

### User
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/user/register` | Register user |
| POST | `/api/user/` | Login |
| GET | `/api/user/` | Admin user records |

### Resume
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/resume/addResume` | Upload and analyze resume |
| GET | `/api/resume/get/:user` | Get user history |
| GET | `/api/resume/get` | Admin evaluations |
| DELETE | `/api/resume/:id` | Delete evaluation |

Health check:

```text
GET /api/health
```

## 📊 Evaluation Output

| Result | Description |
|---|---|
| Overall Score | Resume and job-description match |
| ATS Score | ATS-oriented keyword/format compatibility |
| Summary | AI-generated candidate-fit summary |
| Matched Skills | Skills found in resume and requirements |
| Missing Skills | Important missing skills/keywords |
| Strengths | Strong areas identified by AI |
| Improvements | Actionable resume recommendations |

Scores are normalized to a **0–100** range by the backend.

## 🔐 Authentication

- Firebase Google Authentication
- Backend authentication middleware
- `user` and `admin` roles
- Admin-only authorization
- User-specific resume history

## ⚙️ Environment Variables

Create local environment files and **never commit secrets**.

### Backend — `Backened_ai/.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend — `ai_resume/.env`

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 🚀 Getting Started

### Clone

```bash
git clone https://github.com/bhupendrar1/SmartResumeAI.git
cd SmartResumeAI
```

### Backend

```bash
cd Backened_ai
npm install
npm start
```

Backend runs on port **4000** by default.

### Frontend

Open another terminal:

```bash
cd ai_resume
npm install
npm run dev
```

Vite normally runs the frontend at:

```text
http://localhost:5173
```

## 🔄 User Flow

1. Sign in with Google.
2. Open Dashboard.
3. Upload a PDF resume.
4. Enter the target Job Description.
5. Start analysis.
6. PDF text is extracted by the backend.
7. Cohere evaluates the resume against the JD.
8. Results are stored in MongoDB.
9. Review scores, skills, strengths, and improvements.
10. View previous analyses in History.

## 📱 Frontend Pages

- **Login** — Google authentication
- **Dashboard** — Upload resume and view AI analysis
- **History** — Previous evaluations
- **Admin** — Statistics and evaluation records
- **SideBar** — Application navigation

## 🎯 Project Highlights

- Full-stack MERN development
- React component architecture
- REST API development
- MongoDB/Mongoose integration
- PDF upload and text extraction
- Generative AI integration with Cohere
- Firebase authentication
- Role-based authorization
- Resume-to-JD matching
- ATS-oriented analysis
- Persistent history
- Admin analytics

## 🔮 Future Improvements

- Job-specific resume optimization
- PDF report export
- Advanced analytics and charts
- Job recommendations
- Improved semantic ATS matching
- Cloud resume storage
- CI/CD deployment
- Automated testing
- Resume templates and optimization suggestions

## 🔒 Security

Before submitting or deploying this project:

- Keep API/database credentials in environment variables.
- Never commit private credentials.
- Rotate/revoke any secret that has previously been exposed in Git history.
- Review uploaded files and generated data before making the repository public.

## 👨‍💻 Author

**Bhupendra Singh**  
MERN / Full-Stack Developer

GitHub: [@bhupendrar1](https://github.com/bhupendrar1)

---

⭐ If you find **SmartResumeAI** useful, consider starring the repository.
