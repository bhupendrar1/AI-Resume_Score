import { useContext, useState } from 'react';
import styles from './Dashboard.module.css';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { AuthContext } from '../../utils/AuthContext';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
        setErrorMsg('Only PDF files are allowed!');
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setErrorMsg('File size must be under 5MB!');
        return;
      }
      setErrorMsg('');
      setFile(selected);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleAnalyze = async () => {
    setErrorMsg('');

    if (!file) {
      setErrorMsg('Please upload a PDF resume before analyzing.');
      return;
    }

    if (!jobDesc || jobDesc.trim().length < 15) {
      setErrorMsg('Please paste the target Job Description (minimum 15 characters).');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_desc', jobDesc);
      if (userInfo?._id) formData.append('user', userInfo._id);

      const res = await axios.post('/api/resume/addResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.data) {
        setResult(res.data.data);
      } else {
        throw new Error('Invalid response structure from server');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      const serverMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      setErrorMsg(`Analysis failed: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981'; // Green
    if (score >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className={styles.Dashboard}>
      {/* Left Column: Input Form & Results */}
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>Smart Resume Screening</div>
          <div className={styles.DashboardHeaderLargeTitle}>Resume Match Score</div>
        </div>

        <div className={styles.alertInfo}>
          <div style={{ fontWeight: 600, color: '#1e293b' }}>🔔 Important Instructions:</div>
          <div className={styles.dashboardInstruction}>
            <div>📓 Paste the complete job description in the field below.</div>
            <div>🔗 Only text-based PDF resumes (.pdf) up to 5MB are accepted.</div>
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              border: '1px solid #f87171',
              borderRadius: '12px',
              padding: '12px 18px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CancelOutlinedIcon fontSize="small" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Upload Block */}
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            {file ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                  <CloudUploadIcon sx={{ color: '#10b981', fontSize: 32 }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#ef4444',
                    fontWeight: 600
                  }}
                >
                  Change
                </button>
              </div>
            ) : (
              <div style={{ color: '#94a3b8', fontSize: 18 }}>
                Select your PDF Resume to upload...
              </div>
            )}
          </div>

          <div className={styles.DashboardInputField}>
            <label htmlFor="inputfield" className={styles.analyzeAIBtn}>
              {file ? 'Replace PDF' : 'Upload Resume'}
            </label>
            <input type="file" accept=".pdf" id="inputfield" onChange={handleFileChange} />
          </div>
        </div>

        {/* Job Description Textarea */}
        <div className={styles.jobDesc}>
          <textarea
            className={styles.textArea}
            placeholder="Paste the target Job Description (JD) here..."
            rows={8}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <button
            type="button"
            className={styles.AnalyzeBtn}
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              flexDirection: 'column',
              border: '3px solid black'
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={32} sx={{ color: 'white' }} />
                <span style={{ fontSize: 12, marginTop: 4 }}>Analyzing...</span>
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>

        {/* Dynamic In-Depth Analysis Breakdown */}
        {result && (
          <div
            style={{
              marginTop: '40px',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '30px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 24, color: '#1e293b' }}>Detailed AI Evaluation</h2>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Resume: <strong>{result.resume_name}</strong>
              </span>
            </div>

            {/* Score Badges Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 25 }}>
              <div
                style={{
                  padding: 20,
                  borderRadius: 16,
                  backgroundColor: '#f8fafc',
                  border: `2px solid ${getScoreColor(result.score)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Overall Match Score</div>
                <div style={{ fontSize: 44, fontWeight: 800, color: getScoreColor(result.score), margin: '8px 0' }}>
                  {result.score}%
                </div>
                <div style={{ fontSize: 12, color: '#475569' }}>
                  {result.score >= 75 ? 'Strong Candidate Fit' : result.score >= 50 ? 'Moderate Alignment' : 'Low Keyword Match'}
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: 16,
                  backgroundColor: '#f8fafc',
                  border: `2px solid ${getScoreColor(result.atsScore || 70)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>ATS Compatibility</div>
                <div style={{ fontSize: 44, fontWeight: 800, color: getScoreColor(result.atsScore || 70), margin: '8px 0' }}>
                  {result.atsScore || 70}%
                </div>
                <div style={{ fontSize: 12, color: '#475569' }}>Formatting & Keyword Density</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: 25, padding: 18, backgroundColor: '#f1f5f9', borderRadius: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 6 }}>
                Executive Assessment
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#334155' }}>
                {result.feedback}
              </p>
            </div>

            {/* Skills Matched */}
            {result.skillsMatched && result.skillsMatched.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <CheckCircleIcon fontSize="small" /> Matched Skills ({result.skillsMatched.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.skillsMatched.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Missing */}
            {result.skillsMissing && result.skillsMissing.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <CancelOutlinedIcon fontSize="small" /> Missing / Recommended Keywords ({result.skillsMissing.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.skillsMissing.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Strengths */}
            {result.strengths && result.strengths.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 8 }}>
                  💪 Key Candidate Strengths:
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                  {result.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actionable Improvements */}
            {result.improvements && result.improvements.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#b45309', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <LightbulbOutlinedIcon fontSize="small" /> Recommended Resume Optimizations:
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                  {result.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Column: User Profile & Quick Score Summary */}
      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div>AI Resume Screener</div>
          <img
            className={styles.profileImg}
            src={
              userInfo?.photoUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
            }
            alt="Profile"
          />
          <h2 style={{ margin: '4px 0', fontSize: 20 }}>{userInfo?.name || 'Candidate'}</h2>
          <span style={{ fontSize: 13, color: '#64748b' }}>{userInfo?.email || 'Logged in'}</span>
          <span
            style={{
              marginTop: 8,
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 12,
              backgroundColor: userInfo?.role === 'admin' ? '#fde047' : '#e2e8f0',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {userInfo?.role || 'user'}
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width="100%" height={180} />
            <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width="100%" height={120} />
          </div>
        ) : result ? (
          <div className={styles.DashboardRightTopCard}>
            <div style={{ fontSize: 18, color: '#64748b' }}>Latest Score</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                margin: '12px 0',
              }}
            >
              <h1 style={{ fontSize: 48, margin: 0, color: getScoreColor(result.score) }}>
                {result.score}%
              </h1>
              <CreditScoreRoundedIcon sx={{ fontSize: 36, color: getScoreColor(result.score) }} />
            </div>

            <div style={{ fontSize: 13, textAlign: 'center', color: '#475569' }}>
              ATS Match: <strong>{result.atsScore || 70}%</strong>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '24px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              fontSize: 14,
              color: '#64748b',
            }}
          >
            <CreditScoreRoundedIcon sx={{ fontSize: 44, color: '#cbd5e1', marginBottom: 1 }} />
            <div>Upload your PDF and click <strong>Analyze</strong> to see your match score and instant suggestions.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);
