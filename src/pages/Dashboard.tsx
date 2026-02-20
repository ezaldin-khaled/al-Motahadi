import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

const NAV = [
  { path: '/dashboard', label: 'Overview' },
  { path: '/dashboard/blog', label: 'Blog' },
] as const;

export default function Dashboard() {
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
          <Link to="/" className="dashboard-logo">AL MOTAHADI</Link>
          <span className="dashboard-badge">Dashboard</span>
        </div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {NAV.map(({ path, label }) => (
            <button
              key={path}
              type="button"
              className={`dashboard-nav-item ${location.pathname === path ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="dashboard-sidebar-footer">
          <button type="button" className="dashboard-logout" onClick={handleLogout}>
            Log out
          </button>
          <Link to="/" className="dashboard-back">← Back to site</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">{isBlog ? 'Blog' : 'Overview'}</h1>
        </header>

        <div className="dashboard-content">
          {!isBlog && (
            <>
              <p className="dashboard-welcome">Welcome to the dashboard. Use the sidebar to manage content.</p>
              <div className="dashboard-cards">
                <section className="dashboard-card">
                  <h2 className="dashboard-card-title">Blog</h2>
                  <p className="dashboard-card-desc">Create and manage blog posts. Connect the backend API to see and edit posts here.</p>
                  <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={() => navigate('/dashboard/blog')}>
                    Manage Blog
                  </button>
                </section>
              </div>
            </>
          )}

          {isBlog && (
            <>
              <p className="dashboard-welcome">Blog control: list, create, edit, and delete posts. Backend API is stubbed in <code>api/blog.php</code> — connect your database there.</p>
              <div className="dashboard-toolbar">
                <button type="button" className="dashboard-btn dashboard-btn--primary" disabled title="Connect backend to enable">
                  + New post
                </button>
              </div>
              <div className="dashboard-table-wrap">
                <table className="dashboard-table" aria-label="Blog posts">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="dashboard-table-empty">
                        No posts yet. Implement <code>api/blog.php</code> and connect it to your database to load posts here.
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
