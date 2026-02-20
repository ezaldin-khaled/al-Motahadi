import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

export default function DashboardLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter username and password.');
      return;
    }
    setSubmitting(true);
    const result = await login({ username: username.trim(), password });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error ?? 'Invalid credentials.');
    }
  }

  return (
    <div className="dashboard-login-page">
      <div className="dashboard-login-card">
        <div className="dashboard-login-header">
          <h1 className="dashboard-login-title">Dashboard</h1>
          <p className="dashboard-login-subtitle">Sign in with your username and password.</p>
        </div>
        <form onSubmit={handleSubmit} className="dashboard-login-form">
          {error && (
            <div className="dashboard-login-error" role="alert">
              {error}
            </div>
          )}
          <label className="dashboard-login-label">
            Username
            <input
              type="text"
              className="dashboard-login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              disabled={submitting}
            />
          </label>
          <label className="dashboard-login-label">
            Password
            <input
              type="password"
              className="dashboard-login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={submitting}
            />
          </label>
          <button type="submit" className="dashboard-btn dashboard-btn--primary dashboard-login-submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="dashboard-login-footer">
          <Link to="/" className="dashboard-login-back">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
