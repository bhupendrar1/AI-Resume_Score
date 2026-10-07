import { useContext, useState } from 'react';
import styles from './Login.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleIcon from '@mui/icons-material/Article';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const syncUserWithBackend = async (userData) => {
    try {
      const response = await axios.post('/api/user/register', userData);
      return response.data.user;
    } catch (err) {
      console.warn('Backend sync warning, using local session:', err.message);
      return {
        _id: 'guest-' + Date.now(),
        name: userData.name,
        email: userData.email,
        photoUrl: userData.photoUrl || '',
        role: userData.role || 'user',
      };
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const backendUser = await syncUserWithBackend({
        name: user.displayName || 'Google User',
        email: user.email,
        photoUrl: user.photoURL || '',
      });

      loginUser(backendUser, token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Sign-in error:', err);
      setErrorMsg('Google Sign-in was cancelled or unavailable. Use Demo Mode below!');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (asAdmin = false) => {
    setErrorMsg('');
    setLoading(true);
    try {
      const demoEmail = asAdmin ? 'admin@resumescore.ai' : 'demo@resumescore.ai';
      const demoName = asAdmin ? 'Recruiter Admin' : 'Demo Candidate';

      const backendUser = await syncUserWithBackend({
        name: demoName,
        email: demoEmail,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: asAdmin ? 'admin' : 'user',
      });

      if (asAdmin) {
        backendUser.role = 'admin';
      }

      loginUser(backendUser, 'demo-token');
      navigate(asAdmin ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Demo Login error:', err);
      setErrorMsg('Demo login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.landingWrapper}>
      {/* Background Animated Glowing Ambient Orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />
      <div className={styles.ambientOrb3} />

      {/* Top Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logoBlock}>
          <div className={styles.logoIcon}>
            <ArticleIcon sx={{ fontSize: 24, color: 'white' }} />
          </div>
          <span className={styles.logoText}>ResumeScore AI</span>
        </div>

        <div className={styles.badgeLive}>
          <span className={styles.pulseDot} />
          <span>Cohere AI Engine Online</span>
        </div>
      </nav>

      {/* Main Hero Container */}
      <div className={styles.heroContent}>
        {/* Left Column: Product Value, Features, and Preview */}
        <div className={styles.heroLeft}>
          <div className={styles.announcementPill}>
            <AutoAwesomeIcon sx={{ fontSize: 16, color: '#fca326' }} />
            <span>Next-Gen ATS Resume Screening</span>
          </div>

          <h1 className={styles.heroHeading}>
            Unlock 10x More Interviews with <span className={styles.gradientText}>AI Precision Scoring</span>
          </h1>

          <p className={styles.heroDescription}>
            Stop guessing why recruiters reject your applications. Upload your PDF resume, paste the target Job Description, and get an instant ATS compatibility score, matched keywords, and personalized optimization tips.
          </p>

          {/* 3 Core Value Cards */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <SpeedIcon sx={{ fontSize: 20 }} />
              </div>
              <h3 className={styles.featureTitle}>Instant Match Score</h3>
              <p className={styles.featureDesc}>
                Quantitative 0–100% role alignment evaluated in seconds.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ color: '#06b6d4' }}>
                <PsychologyIcon sx={{ fontSize: 20 }} />
              </div>
              <h3 className={styles.featureTitle}>Keyword Gap Radar</h3>
              <p className={styles.featureDesc}>
                Identifies matched proficiencies and missing critical keywords.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ color: '#10b981' }}>
                <VerifiedUserIcon sx={{ fontSize: 20 }} />
              </div>
              <h3 className={styles.featureTitle}>ATS Friendly</h3>
              <p className={styles.featureDesc}>
                Ensures parsing compliance with modern enterprise ATS filters.
              </p>
            </div>
          </div>

          {/* Interactive Floating Preview Snippet */}
          <div className={styles.previewBanner}>
            <div className={styles.previewScoreRing}>
              <div className={styles.previewScoreInner}>85%</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>
                Live Evaluation Snapshot
              </div>
              <div className={styles.previewTags}>
                <span className={styles.matchedTag}>✓ React.js</span>
                <span className={styles.matchedTag}>✓ Node.js</span>
                <span className={styles.matchedTag}>✓ Redux</span>
                <span className={styles.missingTag}>+ Docker</span>
                <span className={styles.missingTag}>+ TypeScript</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact Glassmorphic Sign-in Card */}
        <div className={styles.heroRight}>
          <div className={styles.loginCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardBadge}>
                <AutoAwesomeIcon sx={{ fontSize: 14 }} /> Get Started Free
              </div>
              <h2 className={styles.cardTitle}>Sign in to Analyze</h2>
              <p className={styles.cardSubtitle}>
                Instant access to candidate screening and ATS feedback reports.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontSize: '12px',
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <>
                  <CircularProgress size={18} sx={{ color: '#0f172a' }} />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <GoogleIcon sx={{ fontSize: 20, color: '#EA4335' }} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className={styles.dividerRow}>Or Instant Demo Access</div>

            {/* 1-Click Demo Buttons */}
            <div className={styles.demoButtonsGrid}>
              <button
                type="button"
                className={styles.demoBtn}
                onClick={() => handleDemoLogin(false)}
                disabled={loading}
              >
                <FlashOnIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                <span>Candidate Demo</span>
              </button>

              <button
                type="button"
                className={[styles.demoBtn, styles.adminBtn].join(' ')}
                onClick={() => handleDemoLogin(true)}
                disabled={loading}
              >
                <VerifiedUserIcon sx={{ fontSize: 16, color: '#eab308' }} />
                <span>Recruiter Hub</span>
              </button>
            </div>

            {/* Trust Footer */}
            <div className={styles.trustFooter}>
              <LockOutlinedIcon sx={{ fontSize: 13 }} />
              <span>Your resume data is confidential & secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
