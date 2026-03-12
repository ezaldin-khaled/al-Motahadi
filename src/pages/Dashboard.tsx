import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

const NAV = [
  { path: '/dashboard', labelKey: 'dashboard.navOverview' },
  { path: '/dashboard/blog', labelKey: 'dashboard.navBlog' },
] as const;

export default function Dashboard() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isBlog = location.pathname === '/dashboard/blog';

  function handleLogout() {
    logout();
    navigate('/dashboard/login', { replace: true });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <Link to="/" className="dashboard-logo">{t('dashboard.logo')}</Link>
          <span className="dashboard-badge">{t('dashboard.badge')}</span>
        </div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {NAV.map(({ path, labelKey }) => (
            <button
              key={path}
              type="button"
              className={`dashboard-nav-item ${location.pathname === path ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => navigate(path)}
            >
              {t(labelKey)}
            </button>
          ))}
        </nav>
        <div className="dashboard-sidebar-footer">
          <button type="button" className="dashboard-logout" onClick={handleLogout}>
            {t('dashboard.logout')}
          </button>
          <Link to="/" className="dashboard-back">{t('dashboard.backToSite')}</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">{isBlog ? t('dashboard.blogTitle') : t('dashboard.overviewTitle')}</h1>
        </header>

        <div className="dashboard-content">
          {!isBlog && (
            <>
              <p className="dashboard-welcome">{t('dashboard.welcome')}</p>
              <div className="dashboard-cards">
                <section className="dashboard-card">
                  <h2 className="dashboard-card-title">{t('dashboard.blogCardTitle')}</h2>
                  <p className="dashboard-card-desc">{t('dashboard.blogCardDesc')}</p>
                  <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={() => navigate('/dashboard/blog')}>
                    {t('dashboard.blogCardButton')}
                  </button>
                </section>
              </div>
            </>
          )}

          {isBlog && (
            <>
              <p className="dashboard-welcome">
                {t('dashboard.blogIntro')}{' '}
                <code>api/blog.php</code>{' '}
                {t('dashboard.blogIntroApiNote')}
              </p>
              <div className="dashboard-toolbar">
                <button
                  type="button"
                  className="dashboard-btn dashboard-btn--primary"
                  disabled
                  title={t('dashboard.newPost')}
                >
                  {t('dashboard.newPost')}
                </button>
              </div>
              <div className="dashboard-table-wrap">
                <table className="dashboard-table" aria-label={t('dashboard.tableAria')}>
                  <thead>
                    <tr>
                      <th>{t('dashboard.colTitle')}</th>
                      <th>{t('dashboard.colCategory')}</th>
                      <th>{t('dashboard.colDate')}</th>
                      <th>{t('dashboard.colStatus')}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="dashboard-table-empty">
                        {t('dashboard.empty')}{' '}
                        <code>api/blog.php</code>{' '}
                        {t('dashboard.emptyHint')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
