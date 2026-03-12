import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

export default function DashboardLogin() {
  const { t } = useTranslation();
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
      setError(t('dashboardLogin.errorMissing'));
      return;
    }
    setSubmitting(true);
    const result = await login({ username: username.trim(), password });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error ?? t('dashboardLogin.errorInvalid'));
    }
  }

  return (
    <div className="dashboard-login-page">
      <div className="dashboard-login-card">
        <div className="dashboard-login-header">
          <h1 className="dashboard-login-title">{t('dashboardLogin.title')}</h1>
          <p className="dashboard-login-subtitle">{t('dashboardLogin.subtitle')}</p>
        </div>
        <form onSubmit={handleSubmit} className="dashboard-login-form">
          {error && (
            <div className="dashboard-login-error" role="alert">
              {error}
            </div>
          )}
          <label className="dashboard-login-label">
            {t('dashboardLogin.username')}
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
            {t('dashboardLogin.password')}
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
            {submitting ? t('dashboardLogin.signingIn') : t('dashboardLogin.signIn')}
          </button>
        </form>
        <p className="dashboard-login-footer">
          <Link to="/" className="dashboard-login-back">{t('dashboardLogin.backToSite')}</Link>
        </p>
      </div>
    </div>
  );
}
