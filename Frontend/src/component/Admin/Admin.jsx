import { useContext, useEffect, useState } from 'react';
import styles from './Admin.module.css';
import Skeleton from '@mui/material/Skeleton';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../utils/AuthContext';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';

const Admin = () => {
  const { userInfo } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalData, setActiveModalData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get('/api/resume/get');
      setResumes(res.data.resumes || []);
      setStats(res.data.stats || null);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setErrorMsg('Failed to load admin records: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this candidate analysis?')) return;

    try {
      await axios.delete(`/api/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      if (activeModalData?._id === id) setActiveModalData(null);
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const filteredResumes = resumes.filter((r) => {
    const term = searchTerm.toLowerCase();
    const candidate = (r.userName || r.user?.name || '').toLowerCase();
    const email = (r.userEmail || r.user?.email || '').toLowerCase();
    const docName = (r.resume_name || '').toLowerCase();
    return candidate.includes(term) || email.includes(term) || docName.includes(term);
  });

  return (
    <div className={styles.Admin} style={{ flexDirection: 'column', gap: 30 }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32, color: '#1e293b' }}>Recruiter & Admin Hub</h1>
          <p style={{ margin: '6px 0 0', color: '#64748b' }}>
            System-wide candidate screening insights, scores, and talent evaluations.
          </p>
        </div>
        <button
          onClick={fetchAdminData}
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
          Refresh Data
        </button>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px 18px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
          {errorMsg}
        </div>
      )}

      {/* KPI Stats Row */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 18, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: 12, borderRadius: 14, backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <GroupIcon fontSize="large" />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Resumes</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{stats.totalResumes}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 18, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: 12, borderRadius: 14, backgroundColor: '#f0fdf4', color: '#16a34a' }}>
              <AssessmentIcon fontSize="large" />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Average Match</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{stats.avgScore}%</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 18, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: 12, borderRadius: 14, backgroundColor: '#faf5ff', color: '#9333ea' }}>
              <WorkspacePremiumIcon fontSize="large" />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>High Matches (≥70%)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#9333ea' }}>{stats.highMatches}</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.04)' }}>
        <SearchIcon sx={{ color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Filter candidates by name, email, or resume title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            display: 'block',
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: 15,
            color: '#1e293b'
          }}
        />
      </div>

      {/* Candidate Grid */}
      {loading ? (
        <div className={styles.AdminBlock}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" sx={{ borderRadius: '20px' }} width="100%" height={260} />
          ))}
        </div>
      ) : filteredResumes.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: 40, borderRadius: 20, textAlign: 'center', color: '#64748b' }}>
          No candidate evaluations matching your search.
        </div>
      ) : (
        <div className={styles.AdminBlock}>
          {filteredResumes.map((item) => {
            const candidateName = item.userName || item.user?.name || 'Anonymous Candidate';
            const candidateEmail = item.userEmail || item.user?.email || 'No email provided';
            const scoreColor = getScoreColor(item.score);

            return (
              <div
                key={item._id}
                className={styles.AdminCard}
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `6px solid ${scoreColor}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{candidateName}</h3>
                    <span style={{ fontSize: 24, fontWeight: 800, color: scoreColor }}>
                      {item.score}%
                    </span>
                  </div>

                  <p style={{ margin: '4px 0 10px', fontSize: 13, color: '#2563eb' }}>{candidateEmail}</p>

                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
                    File: <strong>{item.resume_name}</strong>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: '#475569',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5
                    }}
                  >
                    {item.feedback || 'No summary recorded.'}
                  </p>
                </div>

                <div style={{ marginTop: 16 }}>
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

      {/* Modal for In-Depth Candidate Details */}
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
                <h2 style={{ margin: 0, fontSize: 24, color: '#1e293b' }}>
                  {activeModalData.userName || 'Candidate'} Evaluation
                </h2>
                <span style={{ fontSize: 13, color: '#2563eb' }}>{activeModalData.userEmail}</span>
              </div>
              <button
                onClick={() => setActiveModalData(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ padding: '16px', borderRadius: 14, backgroundColor: '#f0fdf4', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#166534', fontWeight: 600 }}>Match Score</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#166534' }}>{activeModalData.score}%</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 14, backgroundColor: '#eff6ff', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#1e40af', fontWeight: 600 }}>ATS Compatibility</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#1e40af' }}>{activeModalData.atsScore || 70}%</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h4 style={{ margin: '0 0 6px', color: '#1e293b' }}>Candidate Fit Assessment</h4>
              <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{activeModalData.feedback}</p>
            </div>

            {/* Matched skills */}
            {activeModalData.skillsMatched && activeModalData.skillsMatched.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 8px', color: '#166534' }}>Matched Competencies ({activeModalData.skillsMatched.length})</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeModalData.skillsMatched.map((s, i) => (
                    <span key={i} style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing skills */}
            {activeModalData.skillsMissing && activeModalData.skillsMissing.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 8px', color: '#dc2626' }}>Missing Qualifications ({activeModalData.skillsMissing.length})</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeModalData.skillsMissing.map((s, i) => (
                    <span key={i} style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
              <h4 style={{ margin: '0 0 6px', color: '#64748b', fontSize: 13 }}>Target Job Description</h4>
              <div style={{ fontSize: 12, color: '#64748b', maxHeight: 120, overflowY: 'auto', backgroundColor: '#f8fafc', padding: 10, borderRadius: 8 }}>
                {activeModalData.job_desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithAuthHOC(Admin);
