// ─── Admin Login ─────────────────────────────────────────────────────────────
// Route: /admin/login

import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './Admin.module.css';

export default function AdminLogin() {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [busy,     setBusy]     = useState(false);

  // Already logged in → dashboard
  if (!authLoading && user) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const result = await signIn(email.trim(), password);
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>🎓</div>
        <h1 className={styles.loginTitle}>CUSB Admin</h1>
        <p className={styles.loginSub}>Central University of South Bihar</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@cusb.ac.in"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && <div className={styles.loginError}>{error}</div>}

          <button type="submit" disabled={busy} className={styles.loginBtn}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <a href="/admin/forgot-password" className={styles.forgotLink}>
          Forgot password?
        </a>
      </div>
    </div>
  );
}
