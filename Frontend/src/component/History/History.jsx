import { useContext, useEffect, useState } from 'react';
import styles from './History.module.css';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../utils/AuthContext';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';

const History = () => {
  const { userInfo } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeModalData, setActiveModalData] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const userIdentifier = userInfo?.email || userInfo?._id || 'all';
      const res = await axios.get(`/api/resume/get/${userIdentifier}`);
      setResumes(res.data.resumes || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setErrorMsg('Could not load history: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userInfo]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this scan result?')) return;

    try {
      await axios.delete(`/api/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      if (activeModalData?._id === id) setActiveModalData(null);
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.error || err.message));
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className={styles.History}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32, color: '#1e293b' }}>Evaluation History</h1>
          <p style={{ margin: '6px 0 0', color: '#64748b' }}>
            Review past resume evaluations, feedback, and ATS keyword gaps.
          </p>
        </div>
        <button
          onClick={fetchHistory}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor: '#0b0b5a',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Refresh
        </button>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px 18px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '12px', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className={styles.HistoryCardBlock}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="rectangular" sx={{ borderRadius: '20px' }} width="100%" height={260} />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '60px 20px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            color: '#64748b'
          }}
        >
          <h3 style={{ color: '#1e293b', marginBottom: 10 }}>No Previous Resume Analyses Found</h3>
          <p>Head to the Dashboard to upload your resume against a job description!</p>
        </div>
      ) : (
        <div className={styles.HistoryCardBlock}>
          {resumes.map((item) => {
            const scoreColor = getScoreColor(item.score);
            return (
              <div
                key={item._id}
                className={styles.HistoryCard}
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `6px solid ${scoreColor}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: scoreColor }}>
                      {item.score}%
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        padding: '4px 10px',
                        borderRadius: 12,
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontWeight: 600
                      }}
                    >
                      ATS: {item.atsScore || 70}%
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '12px 0 6px',
                      fontSize: 18,
                      color: '#1e293b',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={item.resume_name}
                  >
                    📄 {item.resume_name}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: '#64748b',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                      margin: '8px 0 16px'
                    }}
                  >
                    {item.feedback || 'No feedback recorded.'}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>
                    Analyzed on: {new Date(item.createdAt).toLocaleDateString()}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => setActiveModalData(item)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        color: '#1e293b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      <VisibilityOutlinedIcon fontSize="small" /> Details
                    </button>

                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px solid #fecaca',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Delete entry"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for In-Depth Report */}
      {activeModalData && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => setActiveModalData(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '750px',
              maxHeight: '85vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '30px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, color: '#1e293b' }}>Detailed Candidate Evaluation</h2>
                <span style={{ fontSize: 13, color: '#64748b' }}>Resume: {activeModalData.resume_name}</span>
              </div>
              <button
                onClick={() => setActiveModalData(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Score pill row */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ padding: '16px', borderRadius: 14, backgroundColor: '#f0fdf4', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#166534', fontWeight: 600 }}>Overall Match</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#166534' }}>{activeModalData.score}%</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 14, backgroundColor: '#eff6ff', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#1e40af', fontWeight: 600 }}>ATS Compatibility</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#1e40af' }}>{activeModalData.atsScore || 70}%</div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ margin: '0 0 6px', color: '#1e293b' }}>Executive Summary</h4>
              <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{activeModalData.feedback}</p>
            </div>

            {/* Matched Skills */}
            {activeModalData.skillsMatched && activeModalData.skillsMatched.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 8px', color: '#166534', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircleIcon fontSize="small" /> Matched Skills ({activeModalData.skillsMatched.length})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeModalData.skillsMatched.map((s, i) => (
                    <span key={i} style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {activeModalData.skillsMissing && activeModalData.skillsMissing.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 8px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CancelOutlinedIcon fontSize="small" /> Missing Keywords ({activeModalData.skillsMissing.length})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeModalData.skillsMissing.map((s, i) => (
                    <span key={i} style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {activeModalData.strengths && activeModalData.strengths.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 6px', color: '#1e293b' }}>Candidate Strengths</h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#475569', fontSize: 14, lineHeight: 1.6 }}>
                  {activeModalData.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {activeModalData.improvements && activeModalData.improvements.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 6px', color: '#b45309' }}>Recommended Optimizations</h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#475569', fontSize: 14, lineHeight: 1.6 }}>
                  {activeModalData.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Job Description */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
              <h4 style={{ margin: '0 0 6px', color: '#64748b', fontSize: 13 }}>Evaluated Against Job Description</h4>
              <div style={{ fontSize: 12, color: '#64748b', maxHeight: 100, overflowY: 'auto', backgroundColor: '#f8fafc', padding: 10, borderRadius: 8 }}>
                {activeModalData.job_desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithAuthHOC(History);
