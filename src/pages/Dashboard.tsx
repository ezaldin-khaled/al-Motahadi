import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  getBlogPosts,
  deleteBlogPost,
  getSettings,
  saveSettings,
  getMediaFiles,
  uploadMedia,
  deleteMedia,
  getUsers,
  toggleUserActive,
  type BlogPostData,
  type MediaFile,
  type AdminUser,
  type SiteSettings,
} from '../lib/api';
import '../styles/dashboard.css';

type TabId = 'overview' | 'blog' | 'pages' | 'images' | 'settings' | 'users' | 'redirects';

const NAV: { id: TabId; labelKey: string; icon: string }[] = [
  { id: 'overview', labelKey: 'dashboard.navOverview', icon: '📊' },
  { id: 'blog', labelKey: 'dashboard.navBlog', icon: '📝' },
  { id: 'pages', labelKey: 'dashboard.navPages', icon: '📄' },
  { id: 'images', labelKey: 'dashboard.navImages', icon: '🖼️' },
  { id: 'settings', labelKey: 'dashboard.navSettings', icon: '⚙️' },
  { id: 'users', labelKey: 'dashboard.navUsers', icon: '👥' },
  { id: 'redirects', labelKey: 'dashboard.navRedirects', icon: '🔀' },
];

function getTabFromPath(pathname: string): TabId {
  if (pathname.includes('/blog')) return 'blog';
  if (pathname.includes('/pages')) return 'pages';
  if (pathname.includes('/images')) return 'images';
  if (pathname.includes('/settings')) return 'settings';
  if (pathname.includes('/users')) return 'users';
  if (pathname.includes('/redirects')) return 'redirects';
  return 'overview';
}

export default function Dashboard() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromPath(location.pathname));

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard/login', { replace: true });
  };

  const handleNavClick = (tabId: TabId) => {
    setActiveTab(tabId);
    const path = tabId === 'overview' ? '/dashboard' : `/dashboard/${tabId}`;
    navigate(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const getTabTitle = (): string => {
    const titles: Record<TabId, string> = {
      overview: t('dashboard.overviewTitle'),
      blog: t('dashboard.blogTitle'),
      pages: t('dashboard.pagesTitle', 'Pages'),
      images: t('dashboard.imagesTitle', 'Images'),
      settings: t('dashboard.settingsTitle', 'Settings'),
      users: t('dashboard.usersTitle', 'Users'),
      redirects: t('dashboard.redirectsTitle', 'Redirects'),
    };
    return titles[activeTab];
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <Link to="/" className="dashboard-logo">{t('dashboard.logo')}</Link>
          <span className="dashboard-badge">{t('dashboard.badge')}</span>
        </div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {NAV.map(({ id, labelKey, icon }) => (
            <button
              key={id}
              type="button"
              className={`dashboard-nav-item ${activeTab === id ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => handleNavClick(id)}
            >
              <span className="dashboard-nav-icon">{icon}</span>
              {t(labelKey)}
            </button>
          ))}
        </nav>
        <div className="dashboard-sidebar-footer">
          {user && (
            <div className="dashboard-user-info">
              <span className="dashboard-user-name">{user.name || user.username}</span>
              <span className="dashboard-user-role">{user.role}</span>
            </div>
          )}
          <button type="button" className="dashboard-logout" onClick={handleLogout}>
            {t('dashboard.logout')}
          </button>
          <Link to="/" className="dashboard-back">{t('dashboard.backToSite')}</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">{getTabTitle()}</h1>
        </header>

        <div className="dashboard-content">
          {activeTab === 'overview' && <OverviewTab navigate={navigate} />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'pages' && <PagesTab />}
          {activeTab === 'images' && <ImagesTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'redirects' && <RedirectsTab />}
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ navigate }: { navigate: (path: string) => void }) {
  const { t } = useTranslation();

  const cards = [
    { id: 'blog', title: t('dashboard.blogCardTitle'), desc: t('dashboard.blogCardDesc'), path: '/dashboard/blog' },
    { id: 'pages', title: t('dashboard.pagesCardTitle', 'Pages'), desc: t('dashboard.pagesCardDesc', 'Edit page content, hero sections, and SEO metadata.'), path: '/dashboard/pages' },
    { id: 'images', title: t('dashboard.imagesCardTitle', 'Images'), desc: t('dashboard.imagesCardDesc', 'Upload and manage media files.'), path: '/dashboard/images' },
    { id: 'settings', title: t('dashboard.settingsCardTitle', 'Settings'), desc: t('dashboard.settingsCardDesc', 'Configure site settings, contact info, and social links.'), path: '/dashboard/settings' },
  ];

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.welcome')}</p>
      <div className="dashboard-cards">
        {cards.map(card => (
          <section key={card.id} className="dashboard-card">
            <h2 className="dashboard-card-title">{card.title}</h2>
            <p className="dashboard-card-desc">{card.desc}</p>
            <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={() => navigate(card.path)}>
              Manage
            </button>
          </section>
        ))}
      </div>
    </>
  );
}

function BlogTab() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await getBlogPosts();
    if (res.success && 'posts' in res) {
      setPosts(res.posts);
    } else if (!res.success && 'error' in res) {
      setError(res.error || 'Failed to load posts');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    const res = await deleteBlogPost(id);
    if (res.success) {
      setPosts(prev => prev.filter(p => p.id !== id));
    } else {
      alert(res.error || 'Failed to delete');
    }
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;
  if (error) return <p className="dashboard-error">{error}</p>;

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.blogIntro')}</p>
      <div className="dashboard-toolbar">
        <button type="button" className="dashboard-btn dashboard-btn--primary">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="dashboard-table-empty">
                  {t('dashboard.empty')} Create your first post.
                </td>
              </tr>
            ) : (
              posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title_en || post.slug}</td>
                  <td>{post.category}</td>
                  <td>{post.date}</td>
                  <td>
                    <span className={`dashboard-status dashboard-status--${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="dashboard-btn dashboard-btn--sm">Edit</button>
                    <button type="button" className="dashboard-btn dashboard-btn--sm dashboard-btn--danger" onClick={() => post.id && handleDelete(post.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PagesTab() {
  const { t } = useTranslation();

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.pagesIntro', 'Edit page content, hero sections, and SEO metadata for each page.')}</p>
      <div className="dashboard-info-box">
        <p>Pages content management allows you to edit:</p>
        <ul>
          <li>Hero sections (headings, descriptions)</li>
          <li>Page-specific content blocks</li>
          <li>SEO metadata (title, description, keywords)</li>
        </ul>
        <p>Connect the <code>api/pages.php</code> endpoint to your database to enable editing.</p>
      </div>
    </>
  );
}

function ImagesTab() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const res = await getMediaFiles();
    if (res.success && res.files) {
      setFiles(res.files);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const res = await uploadMedia(file);
    if (res.success && res.file) {
      setFiles(prev => [res.file!, ...prev]);
    } else {
      alert(res.error || 'Upload failed');
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this file?')) return;
    const res = await deleteMedia(id);
    if (res.success) {
      setFiles(prev => prev.filter(f => f.id !== id));
    } else {
      alert(res.error || 'Delete failed');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied!');
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.imagesIntro', 'Upload and manage media files.')}</p>
      <div className="dashboard-toolbar">
        <label className="dashboard-btn dashboard-btn--primary">
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </div>
      <div className="dashboard-media-grid">
        {files.length === 0 ? (
          <p className="dashboard-empty">No images uploaded yet.</p>
        ) : (
          files.map(file => (
            <div key={file.id} className="dashboard-media-item">
              <img src={file.url} alt={file.alt_text || file.original_name} className="dashboard-media-thumb" />
              <div className="dashboard-media-info">
                <span className="dashboard-media-name">{file.original_name}</span>
                <div className="dashboard-media-actions">
                  <button type="button" className="dashboard-btn dashboard-btn--sm" onClick={() => copyUrl(file.url)}>Copy URL</button>
                  <button type="button" className="dashboard-btn dashboard-btn--sm dashboard-btn--danger" onClick={() => handleDelete(file.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function SettingsTab() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    const res = await getSettings();
    if (res.success && res.settings) {
      setSettings(res.settings);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSettings(settings);
    if (res.success) {
      alert('Settings saved!');
    } else {
      alert(res.error || 'Failed to save');
    }
    setSaving(false);
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;

  const settingsFields = [
    { key: 'site_name', label: 'Site Name' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
    { key: 'whatsapp_number', label: 'WhatsApp Number' },
    { key: 'address', label: 'Address' },
    { key: 'working_hours', label: 'Working Hours' },
    { key: 'map_url', label: 'Map Embed URL' },
    { key: 'facebook_url', label: 'Facebook URL' },
    { key: 'instagram_url', label: 'Instagram URL' },
    { key: 'twitter_url', label: 'Twitter URL' },
    { key: 'linkedin_url', label: 'LinkedIn URL' },
    { key: 'youtube_url', label: 'YouTube URL' },
    { key: 'default_meta_title', label: 'Default Meta Title' },
    { key: 'default_meta_description', label: 'Default Meta Description' },
  ];

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.settingsIntro', 'Configure site-wide settings.')}</p>
      <div className="dashboard-form">
        {settingsFields.map(({ key, label }) => (
          <div key={key} className="dashboard-form-group">
            <label className="dashboard-form-label">{label}</label>
            <input
              type="text"
              className="dashboard-form-input"
              value={settings[key] || ''}
              onChange={e => handleChange(key, e.target.value)}
            />
          </div>
        ))}
        <div className="dashboard-form-actions">
          <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </>
  );
}

function UsersTab() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.success && res.users) {
      setUsers(res.users);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleToggle = async (id: number, currentStatus: boolean) => {
    const res = await toggleUserActive(id, !currentStatus);
    if (res.success) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: !currentStatus } : u));
    } else {
      alert(res.error || 'Failed to update');
    }
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.usersIntro', 'Manage admin users and roles.')}</p>
      <div className="dashboard-toolbar">
        <button type="button" className="dashboard-btn dashboard-btn--primary">+ Add User</button>
      </div>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="dashboard-table-empty">No users found.</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={`dashboard-status dashboard-status--${u.is_active ? 'published' : 'draft'}`}>
                      {u.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="dashboard-btn dashboard-btn--sm" onClick={() => handleToggle(u.id, u.is_active)}>
                      {u.is_active ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RedirectsTab() {
  const { t } = useTranslation();

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.redirectsIntro', 'Manage URL redirects.')}</p>
      <div className="dashboard-info-box">
        <p>Redirects management allows you to:</p>
        <ul>
          <li>Create 301/302 redirects for moved pages</li>
          <li>Track redirect hit counts</li>
          <li>Enable/disable redirects</li>
        </ul>
        <p>Connect the <code>api/redirects.php</code> endpoint to enable this feature.</p>
      </div>
    </>
  );
}
