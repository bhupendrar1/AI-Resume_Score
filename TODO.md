# AI Resume Screening & Match Scoring System

## Completed Implementations & Fixes

### 1. Backend (`Backened_ai`)
- [x] **Secured Secrets & Environment Variables**: Configured `dotenv` with `.env` and `.env.example`, hiding MongoDB credentials and Cohere API keys.
- [x] **Database Reconnection**: Restored Mongoose connection in `conn.js` and hooked into `index.js`.
- [x] **Production Mongoose Models**: Restored `User` and `Resume` models with multi-dimensional scoring fields (`overallScore`, `atsScore`, `skillsMatched`, `skillsMissing`, `strengths`, `improvements`).
- [x] **AI Screening Engine**: Replaced deprecated Cohere models with modern `command-r-08-2024`, structured JSON prompt parsing, and fallback regex extraction.
- [x] **Multer Upload Engine**: Fixed PDF upload directory creation, unique file prefixing, and 5MB size limit.
- [x] **Full API Suite**:
  - `POST /api/user/register`: User sync & creation.
  - `POST /api/resume/addResume`: PDF parse + Cohere evaluation + DB persistence.
  - `GET /api/resume/get/:user`: Candidate evaluation history.
  - `GET /api/resume/get`: Recruiter/Admin talent overview with KPI metrics (total resumes, avg score, high match candidates).
  - `DELETE /api/resume/:id`: Deletion of resume records with authorization checks.

### 2. Frontend (`ai_resume`)
- [x] **Authentication Flow**: Fixed Firebase Google login + added instant Demo/Guest login for fast testing.
- [x] **Axios Interceptor**: Automatically attaches user IDs, email, and tokens on all API requests.
- [x] **Interactive Dashboard**:
  - PDF file upload with validation, size display, and change controls.
  - Job description input with character counting.
  - Live AI analysis with spinner and loading states.
  - Score display with color-coded circles (Match score vs ATS score).
  - Chip tags for matched skills (green) and missing skills (red).
  - Structured candidate strengths and actionable resume optimization tips.
- [x] **Evaluation History**:
  - Grid of past resume evaluations.
  - Modal with full candidate evaluation report.
  - Delete scan action.
- [x] **Recruiter & Admin Hub**:
  - Live KPI stats: Total Resumes, Average Match, High Potential Candidates.
  - Real-time search filter by candidate name, email, or resume title.
  - Full candidate report modal.
- [x] **Route Protection & Sidebar**: Clean sidebar navigation with active indicator, role badges, and logout handling.

## Running the Application

### Backend:
```bash
cd Backened_ai
npm start
# Server runs on http://localhost:4000
```

### Frontend:
```bash
cd ai_resume
npm run dev
# Frontend runs on http://localhost:5173
```
