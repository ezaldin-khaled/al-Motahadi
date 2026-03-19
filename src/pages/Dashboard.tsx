import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  getBlogPosts,
  getBlogPost,
  saveBlogPost,
  deleteBlogPost,
  getSettings,
  saveSettings,
  getMediaFiles,
  uploadMedia,
  deleteMedia,
  getUsers,
  toggleUserActive,
  getPages,
  getPageSections,
  savePageSection,
  deletePageSection,
  getRedirects,
  saveRedirect,
  deleteRedirect,
  type BlogPostData,
  type MediaFile,
  type AdminUser,
  type SiteSettings,
  type CmsPage,
  type CmsPageSection,
  type RedirectRule,
} from '../lib/api';
import HtmlEditor, { type HtmlEditorHandle } from '../components/HtmlEditor';
import MediaPickerModal from '../components/MediaPickerModal';
import { SECTION_SCHEMAS, type JsonField, type SectionSchema, buildDefaultJsonForSchema } from '../config/sectionSchemas';
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
  const [editing, setEditing] = useState<BlogPostData | null>(null);
  const [editorLang, setEditorLang] = useState<'en' | 'ar'>('en');
  const [mediaPicker, setMediaPicker] = useState<null | 'thumbnail' | 'hero' | 'inline-en' | 'inline-ar'>(null);
  const [mediaLibrary, setMediaLibrary] = useState<MediaFile[]>([]);
  const [mediaLibraryLoading, setMediaLibraryLoading] = useState(false);
  const editorEnRef = useRef<HtmlEditorHandle | null>(null);
  const editorArRef = useRef<HtmlEditorHandle | null>(null);

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

  useEffect(() => {
    const loadMediaLibrary = async () => {
      if (!editing) return;
      setMediaLibraryLoading(true);
      const res = await getMediaFiles();
      if (res.success && res.files) {
        setMediaLibrary(res.files);
      } else {
        setMediaLibrary([]);
      }
      setMediaLibraryLoading(false);
    };
    loadMediaLibrary();
  }, [editing]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    const res = await deleteBlogPost(id);
    if (res.success) {
      setPosts(prev => prev.filter(p => p.id !== id));
    } else {
      alert(res.error || 'Failed to delete');
    }
  };

  const openNew = () => {
    setEditing({
      slug: '',
      title_en: '',
      title_ar: '',
      excerpt_en: '',
      excerpt_ar: '',
      body_en: '',
      body_ar: '',
      category: 'news',
      date: new Date().toISOString().slice(0, 10),
      read_time: 5,
      image: '',
      image_large: '',
      status: 'draft',
      featured: false,
      thumbnail_media_id: null,
      hero_media_id: null,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      meta_title_en: '',
      meta_description_en: '',
      meta_keywords_en: '',
      meta_title_ar: '',
      meta_description_ar: '',
      meta_keywords_ar: '',
    });
  };

  const openEdit = async (post: BlogPostData) => {
    if (!post.id) return;
    const res = await getBlogPost(post.id);
    if (res.success && res.post) {
      setEditing(res.post);
      setEditorLang('en');
      setMediaPicker(null);
    } else {
      const msg = 'error' in res ? res.error : 'Failed to load post';
      alert(msg);
    }
  };

  const closeEdit = () => {
    setEditing(null);
  };

  const handleSave = async () => {
    if (!editing) return;
    const payload: any = { ...editing };
    payload.meta_title = editing.meta_title_en ?? editing.meta_title ?? null;
    payload.meta_description = editing.meta_description_en ?? editing.meta_description ?? null;
    payload.meta_keywords = editing.meta_keywords_en ?? editing.meta_keywords ?? null;
    if (editing.status === 'published') {
      payload.published_at = editing.date ? `${editing.date} 00:00:00` : undefined;
    } else {
      payload.published_at = null;
    }

    const res = await saveBlogPost(payload);
    if (!res.success || !('post' in res) || !res.post) {
      const msg = 'error' in res ? res.error : 'Failed to save post';
      alert(msg);
      return;
    }
    setPosts(prev => {
      const exists = prev.find(p => p.id === res.post!.id);
      if (exists) {
        return prev.map(p => (p.id === res.post!.id ? res.post! : p));
      }
      return [res.post!, ...prev];
    });
    setEditing(null);
  };

  const handleSelectMedia = (file: MediaFile) => {
    if (!editing) return;
    const alt = file.alt_text || file.original_name || 'image';
    const imgHtml = `<p><img src="${file.url}" alt="${alt}" style="max-width:100%; height:auto;" /></p>`;
    if (mediaPicker === 'thumbnail') {
      setEditing(prev => (prev ? { ...prev, thumbnail_media_id: file.id, image: file.url } : prev));
    } else if (mediaPicker === 'hero') {
      setEditing(prev => (prev ? { ...prev, hero_media_id: file.id, image_large: file.url } : prev));
    } else if (mediaPicker === 'inline-en') {
      editorEnRef.current?.insertHtml(imgHtml);
    } else if (mediaPicker === 'inline-ar') {
      editorArRef.current?.insertHtml(imgHtml);
    }
    setMediaPicker(null);
  };

  const mediaPickerTitle =
    mediaPicker === 'thumbnail'
      ? t('dashboard.pickThumbnail', 'Pick Thumbnail Image')
      : mediaPicker === 'hero'
        ? t('dashboard.pickHero', 'Pick Hero Image')
        : mediaPicker === 'inline-en' || mediaPicker === 'inline-ar'
          ? t('dashboard.insertImage', 'Insert Image')
          : 'Pick Image';

  if (loading) return <p className="dashboard-loading">Loading...</p>;
  if (error) return <p className="dashboard-error">{error}</p>;

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.blogIntro')}</p>
      <div className="dashboard-toolbar">
        <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={openNew}>
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
                    <button type="button" className="dashboard-btn dashboard-btn--sm" onClick={() => openEdit(post)}>Edit</button>
                    <button type="button" className="dashboard-btn dashboard-btn--sm dashboard-btn--danger" onClick={() => post.id && handleDelete(post.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {editing && (
        <div className="dashboard-modal-backdrop" onClick={closeEdit} role="presentation">
          <div className="dashboard-modal dashboard-modal--blog" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="dashboard-modal-header">
              <h2>{editing.id ? 'Edit Post' : 'New Post'}</h2>
              <button type="button" className="dashboard-modal-close" onClick={closeEdit}>
                ×
              </button>
            </div>
            <div className="dashboard-modal-body">
              <div className="dashboard-form">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Slug</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={editing.slug}
                    onChange={e => setEditing(prev => prev && { ...prev, slug: e.target.value })}
                  />
                </div>

                <div style={{ margin: '8px 0 10px' }}>
                  <span style={{ fontWeight: 900, color: 'var(--text-heading)' }}>
                    Editing: {editorLang === 'en' ? 'English' : 'Arabic'}
                  </span>
                  <div style={{ marginTop: 6, fontSize: 13, color: 'var(--text-muted)' }}>
                    Tip: Use <strong>H1</strong> for the main title, <strong>H2</strong> for sections, and <strong>H3</strong> for sub-sections.
                  </div>
                </div>
                <div className="dashboard-lang-tabs" role="tablist" aria-label="Blog language">
                  <button
                    type="button"
                    className={`dashboard-lang-tab ${editorLang === 'en' ? 'dashboard-lang-tab--active' : ''}`}
                    onClick={() => setEditorLang('en')}
                    role="tab"
                    aria-selected={editorLang === 'en'}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`dashboard-lang-tab ${editorLang === 'ar' ? 'dashboard-lang-tab--active' : ''}`}
                    onClick={() => setEditorLang('ar')}
                    role="tab"
                    aria-selected={editorLang === 'ar'}
                  >
                    AR
                  </button>
                </div>

                {editorLang === 'en' ? (
                  <>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Title (EN)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.title_en}
                        onChange={e => setEditing(prev => prev && { ...prev, title_en: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Excerpt (EN)</label>
                      <textarea
                        className="dashboard-form-input"
                        rows={3}
                        value={editing.excerpt_en}
                        onChange={e => setEditing(prev => prev && { ...prev, excerpt_en: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Body (EN)</label>
                      <HtmlEditor
                        ref={editorEnRef}
                        value={editing.body_en || ''}
                        placeholder="Write blog body..."
                        onChange={(v) => setEditing(prev => (prev ? { ...prev, body_en: v } : prev))}
                        minHeight={280}
                        onRequestImage={() => setMediaPicker('inline-en')}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Title (EN)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.meta_title_en ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_title_en: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Description (EN)</label>
                      <textarea
                        className="dashboard-form-input"
                        rows={3}
                        value={editing.meta_description_en ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_description_en: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Keywords (EN)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.meta_keywords_en ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_keywords_en: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Title (AR)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.title_ar}
                        onChange={e => setEditing(prev => prev && { ...prev, title_ar: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Excerpt (AR)</label>
                      <textarea
                        className="dashboard-form-input"
                        rows={3}
                        value={editing.excerpt_ar}
                        onChange={e => setEditing(prev => prev && { ...prev, excerpt_ar: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Body (AR)</label>
                      <HtmlEditor
                        ref={editorArRef}
                        value={editing.body_ar || ''}
                        placeholder="اكتب محتوى المقال..."
                        onChange={(v) => setEditing(prev => (prev ? { ...prev, body_ar: v } : prev))}
                        minHeight={280}
                        onRequestImage={() => setMediaPicker('inline-ar')}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Title (AR)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.meta_title_ar ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_title_ar: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Description (AR)</label>
                      <textarea
                        className="dashboard-form-input"
                        rows={3}
                        value={editing.meta_description_ar ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_description_ar: e.target.value })}
                      />
                    </div>
                    <div className="dashboard-form-group">
                      <label className="dashboard-form-label">Meta Keywords (AR)</label>
                      <input
                        type="text"
                        className="dashboard-form-input"
                        value={editing.meta_keywords_ar ?? ''}
                        onChange={e => setEditing(prev => prev && { ...prev, meta_keywords_ar: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Category</label>
                  <select
                    className="dashboard-form-input"
                    value={editing.category}
                    onChange={e => setEditing(prev => prev && { ...prev, category: e.target.value })}
                  >
                    <option value="news">news</option>
                    <option value="rehabilitation">rehabilitation</option>
                    <option value="tips">tips</option>
                    <option value="wellness">wellness</option>
                    <option value="research">research</option>
                  </select>
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Status</label>
                  <select
                    className="dashboard-form-input"
                    value={editing.status}
                    onChange={e => setEditing(prev => prev && { ...prev, status: e.target.value as BlogPostData['status'] })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Featured</label>
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={e => setEditing(prev => prev && { ...prev, featured: e.target.checked })}
                  />
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Publish date</label>
                  <input
                    type="date"
                    className="dashboard-form-input"
                    value={editing.date}
                    onChange={e => setEditing(prev => prev && { ...prev, date: e.target.value })}
                  />
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Read time (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    className="dashboard-form-input"
                    value={editing.read_time}
                    onChange={e => setEditing(prev => prev && { ...prev, read_time: Number(e.target.value) || 1 })}
                  />
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Thumbnail (small)</label>
                  <div className="dashboard-image-picker">
                    {editing.image ? <img src={editing.image} alt="thumbnail preview" className="dashboard-image-preview" /> : <div className="dashboard-image-placeholder">No image</div>}
                    <button type="button" className="dashboard-btn" onClick={() => setMediaPicker('thumbnail')}>
                      Choose
                    </button>
                  </div>
                  <div className="dashboard-media-quick-list">
                    {mediaLibraryLoading ? (
                      <div className="dashboard-media-quick-empty">Loading uploaded images...</div>
                    ) : mediaLibrary.length === 0 ? (
                      <div className="dashboard-media-quick-empty">No uploaded images yet.</div>
                    ) : (
                      mediaLibrary.slice(0, 6).map((file) => (
                        <button
                          key={`thumb-${file.id}`}
                          type="button"
                          className={`dashboard-media-quick-item ${editing.thumbnail_media_id === file.id ? 'dashboard-media-quick-item--active' : ''}`}
                          onClick={() => setEditing(prev => (prev ? { ...prev, thumbnail_media_id: file.id, image: file.url } : prev))}
                        >
                          <img src={file.url} alt={file.alt_text || file.original_name} />
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Hero (large)</label>
                  <div className="dashboard-image-picker">
                    {editing.image_large ? <img src={editing.image_large} alt="hero preview" className="dashboard-image-preview" /> : <div className="dashboard-image-placeholder">No image</div>}
                    <button type="button" className="dashboard-btn" onClick={() => setMediaPicker('hero')}>
                      Choose
                    </button>
                  </div>
                  <div className="dashboard-media-quick-list">
                    {mediaLibraryLoading ? (
                      <div className="dashboard-media-quick-empty">Loading uploaded images...</div>
                    ) : mediaLibrary.length === 0 ? (
                      <div className="dashboard-media-quick-empty">No uploaded images yet.</div>
                    ) : (
                      mediaLibrary.slice(0, 6).map((file) => (
                        <button
                          key={`hero-${file.id}`}
                          type="button"
                          className={`dashboard-media-quick-item ${editing.hero_media_id === file.id ? 'dashboard-media-quick-item--active' : ''}`}
                          onClick={() => setEditing(prev => (prev ? { ...prev, hero_media_id: file.id, image_large: file.url } : prev))}
                        >
                          <img src={file.url} alt={file.alt_text || file.original_name} />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <MediaPickerModal
              open={mediaPicker !== null}
              title={mediaPickerTitle}
              onClose={() => setMediaPicker(null)}
              onSelect={handleSelectMedia}
            />
            <div className="dashboard-modal-footer">
              <button type="button" className="dashboard-btn" onClick={closeEdit}>
                Cancel
              </button>
              <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PagesTab() {
  const { t } = useTranslation();
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [sections, setSections] = useState<CmsPageSection[]>([]);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSectionKey, setNewSectionKey] = useState('');
  const [newSectionContentType, setNewSectionContentType] = useState<CmsPageSection['content_type']>('text');
  const [newSectionContent, setNewSectionContent] = useState('');
  const schemaKeys = useMemo(() => Object.keys(SECTION_SCHEMAS), []);
  const [newSectionSchemaKey, setNewSectionSchemaKey] = useState<string>(() => schemaKeys[0] ?? 'home_hero');

  const [pageMediaPickerTarget, setPageMediaPickerTarget] = useState<
    | null
    | { scope: 'new'; fieldKey: string }
    | { scope: 'section'; sectionId: number; fieldKey: string }
    | { scope: 'new'; arrayFieldKey: string; index: number; itemFieldKey: string }
    | { scope: 'section'; sectionId: number; arrayFieldKey: string; index: number; itemFieldKey: string }
  >(null);

  const loadPages = useCallback(async () => {
    setLoading(true);
    const res = await getPages();
    if (res.success && res.pages) {
      setPages(res.pages);
      if (!selectedPageId && res.pages.length > 0) {
        setSelectedPageId(res.pages[0].id);
      }
    }
    setLoading(false);
  }, [selectedPageId]);

  const loadSections = useCallback(
    async (pageId: number, currentLang: string) => {
      const res = await getPageSections(pageId, currentLang);
      if (res.success && res.sections) {
        if (Array.isArray(res.sections)) {
          setSections(res.sections as CmsPageSection[]);
        } else {
          const flat: CmsPageSection[] = [];
          Object.values(res.sections).forEach(byLang => {
            Object.values(byLang).forEach(sec => flat.push(sec as CmsPageSection));
          });
          setSections(flat);
        }
      }
    },
    []
  );

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  useEffect(() => {
    if (selectedPageId) {
      loadSections(selectedPageId, lang);
    }
  }, [selectedPageId, lang, loadSections]);

  const handleSelectPage = (id: number) => {
    setSelectedPageId(id);
  };

  const handleSectionChange = (id: number, field: keyof CmsPageSection, value: string) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const normalizeSectionKey = (key: string): string => key.trim().toLowerCase();

  const safeParseJsonObject = (raw: string | null | undefined): Record<string, unknown> => {
    if (!raw) return {};
    try {
      let parsed: unknown = JSON.parse(raw);
      if (typeof parsed === 'string') {
        // Sometimes DB stores a JSON-string-of-a-JSON-object.
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // keep parsed as-is; will return {}
        }
      }
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as Record<string, unknown>;
      return {};
    } catch {
      return {};
    }
  };

  const isPrimitive = (v: unknown): v is string | number | boolean => {
    const t = typeof v;
    return t === 'string' || t === 'number' || t === 'boolean';
  };

  const isImageUrlKey = (key: string): boolean => {
    const lower = key.toLowerCase();
    const looksLikeImage = lower.includes('image') || lower.includes('img');
    const isAlt = lower.includes('alt') || lower.endsWith('_alt');
    return looksLikeImage && !isAlt;
  };

  const prettifyKey = (key: string): string => {
    const noUnderscore = key.replace(/_/g, ' ');
    const withSpaces = noUnderscore.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    const parts = withSpaces.split(' ').filter(Boolean);
    const upper = parts.map((p) => {
      const l = p.toLowerCase();
      if (l === 'cta') return 'CTA';
      if (l === 'url') return 'URL';
      if (l === 'id') return 'ID';
      return l.charAt(0).toUpperCase() + l.slice(1);
    });
    return upper.join(' ');
  };

  const renderValueEditor = (
    scope: 'new' | 'section',
    sectionId: number | undefined,
    fieldKey: string,
    value: unknown
  ) => {
    const rawStr =
      value === null || value === undefined
        ? ''
        : typeof value === 'string'
          ? value
          : isPrimitive(value)
            ? String(value)
            : '';

    const looksMultiline =
      typeof value === 'string' &&
      (rawStr.includes('\n') || rawStr.length > 120) ||
      fieldKey.toLowerCase().includes('description') ||
      fieldKey.toLowerCase().includes('body') ||
      fieldKey.toLowerCase().includes('content');

    if (looksMultiline) {
      return (
        <textarea
          className="dashboard-form-input"
          rows={4}
          value={rawStr}
          onChange={(e) => {
            const next = e.target.value;
            if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, fieldKey, next);
            if (scope === 'new') setJsonFieldForNew(fieldKey, next);
          }}
        />
      );
    }

    return (
      <input
        type="text"
        className="dashboard-form-input"
        value={rawStr}
        onChange={(e) => {
          const next = e.target.value;
          if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, fieldKey, next);
          if (scope === 'new') setJsonFieldForNew(fieldKey, next);
        }}
      />
    );
  };

  const buildDefaultItemForFields = (fields: JsonField[]): Record<string, unknown> => {
    const obj: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.type === 'array') {
        obj[field.key] = [];
      } else {
        obj[field.key] = '';
      }
    }
    return obj;
  };

  const setJsonFieldForSection = (sectionId: number, fieldKey: string, value: unknown) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id !== sectionId) return s;
        const obj = safeParseJsonObject(s.content);
        obj[fieldKey] = value;
        return { ...s, content: JSON.stringify(obj) };
      })
    );
  };

  const updateJsonArrayItemField = (
    sectionId: number,
    arrayFieldKey: string,
    index: number,
    itemFieldKey: string,
    value: unknown
  ) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id !== sectionId) return s;
        const obj = safeParseJsonObject(s.content);
        const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
        const nextArr = arr.map((item, i) => {
          if (i !== index) return item;
          const nextItem =
            item && typeof item === 'object' && !Array.isArray(item)
              ? { ...(item as Record<string, unknown>) }
              : {};
          (nextItem as Record<string, unknown>)[itemFieldKey] = value;
          return nextItem;
        });
        obj[arrayFieldKey] = nextArr;
        return { ...s, content: JSON.stringify(obj) };
      })
    );
  };

  const addJsonArrayItem = (sectionId: number, arrayFieldKey: string, itemFields: JsonField[]) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id !== sectionId) return s;
        const obj = safeParseJsonObject(s.content);
        const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
        const nextArr = [...arr, buildDefaultItemForFields(itemFields)];
        obj[arrayFieldKey] = nextArr;
        return { ...s, content: JSON.stringify(obj) };
      })
    );
  };

  const removeJsonArrayItem = (sectionId: number, arrayFieldKey: string, index: number) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id !== sectionId) return s;
        const obj = safeParseJsonObject(s.content);
        const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
        const nextArr = arr.filter((_, i) => i !== index);
        obj[arrayFieldKey] = nextArr;
        return { ...s, content: JSON.stringify(obj) };
      })
    );
  };

  const setJsonFieldForNew = (fieldKey: string, value: unknown) => {
    const obj = safeParseJsonObject(newSectionContent);
    obj[fieldKey] = value;
    setNewSectionContent(JSON.stringify(obj));
  };

  const updateNewJsonArrayItemField = (
    arrayFieldKey: string,
    index: number,
    itemFieldKey: string,
    value: unknown
  ) => {
    const obj = safeParseJsonObject(newSectionContent);
    const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
    const nextArr = arr.map((item, i) => {
      if (i !== index) return item;
      const nextItem =
        item && typeof item === 'object' && !Array.isArray(item)
          ? { ...(item as Record<string, unknown>) }
          : {};
      (nextItem as Record<string, unknown>)[itemFieldKey] = value;
      return nextItem;
    });
    obj[arrayFieldKey] = nextArr;
    setNewSectionContent(JSON.stringify(obj));
  };

  const addNewJsonArrayItem = (arrayFieldKey: string, itemFields: JsonField[]) => {
    const obj = safeParseJsonObject(newSectionContent);
    const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
    const nextArr = [...arr, buildDefaultItemForFields(itemFields)];
    obj[arrayFieldKey] = nextArr;
    setNewSectionContent(JSON.stringify(obj));
  };

  const removeNewJsonArrayItem = (arrayFieldKey: string, index: number) => {
    const obj = safeParseJsonObject(newSectionContent);
    const arr = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
    const nextArr = arr.filter((_, i) => i !== index);
    obj[arrayFieldKey] = nextArr;
    setNewSectionContent(JSON.stringify(obj));
  };

  const handlePageMediaSelect = (file: MediaFile) => {
    if (!pageMediaPickerTarget) return;
    const url = file.url;
    const target = pageMediaPickerTarget;

    if ('arrayFieldKey' in target) {
      if (target.scope === 'section') {
        updateJsonArrayItemField(target.sectionId, target.arrayFieldKey, target.index, target.itemFieldKey, url);
      } else {
        updateNewJsonArrayItemField(target.arrayFieldKey, target.index, target.itemFieldKey, url);
      }
    } else {
      if (target.scope === 'section') {
        setJsonFieldForSection(target.sectionId, target.fieldKey, url);
      } else {
        setJsonFieldForNew(target.fieldKey, url);
      }
    }

    setPageMediaPickerTarget(null);
  };

  const renderJsonSchemaFields = (
    schema: SectionSchema,
    obj: Record<string, unknown>,
    scope: 'new' | 'section',
    sectionId?: number
  ) => {
    return (
      <>
        {schema.fields.map((field) => {
          const rawValue = obj[field.key];
          const valueStr =
            rawValue === null || rawValue === undefined
              ? ''
              : typeof rawValue === 'string'
                ? rawValue
                : String(rawValue);

          if (field.type === 'text') {
            return (
              <div key={field.key} className="dashboard-form-group">
                <label className="dashboard-form-label">{field.label}</label>
                <input
                  type="text"
                  className="dashboard-form-input"
                  value={valueStr}
                  placeholder={field.placeholder}
                  onChange={(e) => {
                    if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, field.key, e.target.value);
                    if (scope === 'new') setJsonFieldForNew(field.key, e.target.value);
                  }}
                />
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.key} className="dashboard-form-group">
                <label className="dashboard-form-label">{field.label}</label>
                <textarea
                  className="dashboard-form-input"
                  rows={field.rows ?? 4}
                  value={valueStr}
                  placeholder={field.placeholder}
                  onChange={(e) => {
                    if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, field.key, e.target.value);
                    if (scope === 'new') setJsonFieldForNew(field.key, e.target.value);
                  }}
                />
              </div>
            );
          }

          if (field.type === 'image') {
            return (
              <div key={field.key} className="dashboard-form-group">
                <label className="dashboard-form-label">{field.label}</label>
                <div className="dashboard-image-picker">
                  {valueStr ? (
                    <img src={valueStr} alt={field.label} className="dashboard-image-preview" />
                  ) : (
                    <div className="dashboard-image-placeholder">No image selected</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="dashboard-form-input"
                      value={valueStr}
                      placeholder="/uploads/.../image.jpg"
                      onChange={(e) => {
                        if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, field.key, e.target.value);
                        if (scope === 'new') setJsonFieldForNew(field.key, e.target.value);
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                      <button
                        type="button"
                        className="dashboard-btn"
                        onClick={() => {
                          if (scope === 'section' && sectionId) {
                            setPageMediaPickerTarget({ scope: 'section', sectionId, fieldKey: field.key });
                          } else {
                            setPageMediaPickerTarget({ scope: 'new', fieldKey: field.key });
                          }
                        }}
                      >
                        Choose
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (field.type === 'array') {
            const arr = Array.isArray(rawValue) ? rawValue : [];
            return (
              <div key={field.key} className="dashboard-form-group">
                <label className="dashboard-form-label">{field.label}</label>
                <div className="dashboard-array-list">
                  {arr.map((item, index) => {
                    const itemObj =
                      item && typeof item === 'object' && !Array.isArray(item)
                        ? (item as Record<string, unknown>)
                        : {};
                    return (
                      <div key={`${field.key}-${index}`} className="dashboard-array-item">
                        <div className="dashboard-array-item-top">
                          <span className="dashboard-array-item-title">{`Item ${index + 1}`}</span>
                          <button
                            type="button"
                            className="dashboard-btn dashboard-btn--sm dashboard-btn--danger"
                            onClick={() => {
                              if (scope === 'section' && sectionId) removeJsonArrayItem(sectionId, field.key, index);
                              if (scope === 'new') removeNewJsonArrayItem(field.key, index);
                            }}
                          >
                            Remove
                          </button>
                        </div>

                        {field.itemFields.map((itemField) => {
                          const itemFieldRaw = itemObj[itemField.key];
                          const itemFieldStr =
                            itemFieldRaw === null || itemFieldRaw === undefined
                              ? ''
                              : typeof itemFieldRaw === 'string'
                                ? itemFieldRaw
                                : String(itemFieldRaw);

                          if (itemField.type === 'text') {
                            return (
                              <div key={itemField.key} className="dashboard-form-group">
                                <label className="dashboard-form-label">{itemField.label}</label>
                                <input
                                  type="text"
                                  className="dashboard-form-input"
                                  value={itemFieldStr}
                                  placeholder={itemField.placeholder}
                                  onChange={(e) => {
                                    if (scope === 'section' && sectionId) {
                                      updateJsonArrayItemField(sectionId, field.key, index, itemField.key, e.target.value);
                                    }
                                    if (scope === 'new') {
                                      updateNewJsonArrayItemField(field.key, index, itemField.key, e.target.value);
                                    }
                                  }}
                                />
                              </div>
                            );
                          }

                          if (itemField.type === 'textarea') {
                            return (
                              <div key={itemField.key} className="dashboard-form-group">
                                <label className="dashboard-form-label">{itemField.label}</label>
                                <textarea
                                  className="dashboard-form-input"
                                  rows={itemField.rows ?? 3}
                                  value={itemFieldStr}
                                  placeholder={itemField.placeholder}
                                  onChange={(e) => {
                                    if (scope === 'section' && sectionId) {
                                      updateJsonArrayItemField(sectionId, field.key, index, itemField.key, e.target.value);
                                    }
                                    if (scope === 'new') {
                                      updateNewJsonArrayItemField(field.key, index, itemField.key, e.target.value);
                                    }
                                  }}
                                />
                              </div>
                            );
                          }

                          if (itemField.type === 'image') {
                            const imgUrl = itemFieldStr;
                            return (
                              <div key={itemField.key} className="dashboard-form-group">
                                <label className="dashboard-form-label">{itemField.label}</label>
                                <div className="dashboard-image-picker">
                                  {imgUrl ? (
                                    <img src={imgUrl} alt={itemField.label} className="dashboard-image-preview" />
                                  ) : (
                                    <div className="dashboard-image-placeholder">No image selected</div>
                                  )}
                                  <div style={{ flex: 1 }}>
                                    <input
                                      type="text"
                                      className="dashboard-form-input"
                                      value={imgUrl}
                                      placeholder="/uploads/.../image.jpg"
                                      onChange={(e) => {
                                        const nextVal = e.target.value;
                                        if (scope === 'section' && sectionId) {
                                          updateJsonArrayItemField(sectionId, field.key, index, itemField.key, nextVal);
                                        }
                                        if (scope === 'new') {
                                          updateNewJsonArrayItemField(field.key, index, itemField.key, nextVal);
                                        }
                                      }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                                      <button
                                        type="button"
                                        className="dashboard-btn"
                                        onClick={() => {
                                          if (scope === 'section' && sectionId) {
                                            setPageMediaPickerTarget({
                                              scope: 'section',
                                              sectionId,
                                              arrayFieldKey: field.key,
                                              index,
                                              itemFieldKey: itemField.key,
                                            });
                                          } else {
                                            setPageMediaPickerTarget({
                                              scope: 'new',
                                              arrayFieldKey: field.key,
                                              index,
                                              itemFieldKey: itemField.key,
                                            });
                                          }
                                        }}
                                      >
                                        Choose
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="dashboard-btn dashboard-btn--sm dashboard-btn--primary"
                    onClick={() => {
                      if (scope === 'section' && sectionId) addJsonArrayItem(sectionId, field.key, field.itemFields);
                      if (scope === 'new') addNewJsonArrayItem(field.key, field.itemFields);
                    }}
                  >
                    {field.addButtonLabel ?? 'Add item'}
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}
      </>
    );
  };

  const handleSaveSection = async (section: CmsPageSection) => {
    setSaving(true);
    const res = await savePageSection({
      page_id: section.page_id,
      section_key: section.section_key,
      lang: section.lang,
      content_type: section.content_type,
      content: section.content ?? '',
      meta_title: section.meta_title ?? null,
      meta_description: section.meta_description ?? null,
      meta_keywords: section.meta_keywords ?? null,
    });
    if (!res.success || !res.section) {
      alert(res.error || 'Failed to save section');
    } else {
      setSections(prev => prev.map(s => (s.id === section.id ? (res.section as CmsPageSection) : s)));
    }
    setSaving(false);
  };

  const handleCreateSection = async () => {
    if (!selectedPageId) return;
    const key = newSectionKey.trim();
    if (!key) {
      alert('Section key is required');
      return;
    }
    setSaving(true);
    const res = await savePageSection({
      page_id: selectedPageId,
      section_key: key,
      lang,
      content_type: newSectionContentType,
      content: newSectionContent,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
    });
    if (!res.success || !res.section) {
      alert(res.error || 'Failed to create section');
      setSaving(false);
      return;
    }

    setNewSectionKey('');
    setNewSectionContent('');
    setNewSectionContentType('text');
    await loadSections(selectedPageId, lang);
    setSaving(false);
  };

  const handleCopyToOtherLanguage = async (section: CmsPageSection) => {
    if (!selectedPageId) return;
    const targetLang = lang === 'en' ? 'ar' : 'en';
    setSaving(true);
    const res = await savePageSection({
      page_id: section.page_id,
      section_key: section.section_key,
      lang: targetLang,
      content_type: section.content_type,
      content: section.content ?? '',
      meta_title: section.meta_title ?? null,
      meta_description: section.meta_description ?? null,
      meta_keywords: section.meta_keywords ?? null,
    });
    if (!res.success) {
      alert(res.error || 'Failed to copy section');
    } else {
      alert('Copied!');
    }
    setSaving(false);
  };

  const handleDeleteSection = async (id: number) => {
    if (!confirm('Delete this section?')) return;
    const res = await deletePageSection(id);
    if (res.success) {
      setSections(prev => prev.filter(s => s.id !== id));
    } else {
      alert(res.error || 'Failed to delete section');
    }
  };

  const renderGenericJsonEditor = (
    scope: 'new' | 'section',
    sectionId: number | undefined,
    obj: Record<string, unknown>
  ) => {
    const keys = Object.keys(obj);

    const setField = (fieldKey: string, value: unknown) => {
      if (scope === 'section' && sectionId) setJsonFieldForSection(sectionId, fieldKey, value);
      if (scope === 'new') setJsonFieldForNew(fieldKey, value);
    };

    const setArrayField = (arrayFieldKey: string, nextArr: unknown[]) => {
      setField(arrayFieldKey, nextArr);
    };

    const updatePrimitiveArrayItem = (arrayFieldKey: string, index: number, value: unknown) => {
      const current = Array.isArray(obj[arrayFieldKey]) ? (obj[arrayFieldKey] as unknown[]) : [];
      const nextArr = current.map((v, i) => (i === index ? value : v));
      setArrayField(arrayFieldKey, nextArr);
    };

    return (
      <>
        {keys.map((key) => {
          const val = obj[key];

          // Image URL slots (choose from Media + manual URL)
          if (isImageUrlKey(key)) {
            const url = typeof val === 'string' ? val : '';
            return (
              <div key={key} className="dashboard-form-group">
                <label className="dashboard-form-label">{prettifyKey(key)}</label>
                <div className="dashboard-image-picker">
                  {url ? <img src={url} alt={key} className="dashboard-image-preview" /> : <div className="dashboard-image-placeholder">No image selected</div>}
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="dashboard-form-input"
                      value={url}
                      placeholder="/uploads/.../image.jpg"
                      onChange={(e) => setField(key, e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                      <button
                        type="button"
                        className="dashboard-btn"
                        onClick={() => {
                          if (scope === 'section' && sectionId) {
                            setPageMediaPickerTarget({ scope: 'section', sectionId, fieldKey: key });
                          } else {
                            setPageMediaPickerTarget({ scope: 'new', fieldKey: key });
                          }
                        }}
                      >
                        Choose
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Arrays
          if (Array.isArray(val)) {
            const arr = val;

            // Primitive array editor
            if (arr.length === 0 || typeof arr[0] !== 'object' || arr[0] === null) {
              const strings = arr.map((x) => (typeof x === 'string' ? x : String(x)));
              return (
                <div key={key} className="dashboard-form-group">
                  <label className="dashboard-form-label">{prettifyKey(key)}</label>
                  <div className="dashboard-array-list">
                    {strings.map((s, index) => (
                      <div key={`${key}-${index}`} className="dashboard-array-item">
                        <div className="dashboard-array-item-top">
                          <span className="dashboard-array-item-title">{`Item ${index + 1}`}</span>
                          <button type="button" className="dashboard-btn dashboard-btn--sm dashboard-btn--danger" onClick={() => setArrayField(key, strings.filter((_, i) => i !== index))}>
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          className="dashboard-form-input"
                          value={s}
                          onChange={(e) => updatePrimitiveArrayItem(key, index, e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="dashboard-btn dashboard-btn--sm dashboard-btn--primary"
                      onClick={() => setArrayField(key, [...strings, ''])}
                    >
                      Add item
                    </button>
                  </div>
                </div>
              );
            }

            // Array of objects: render each item as a card, and allow image slots inside.
            const firstObj = arr.find((x) => x && typeof x === 'object' && !Array.isArray(x)) as Record<string, unknown> | undefined;
            const itemKeys = firstObj ? Object.keys(firstObj) : [];
            return (
              <div key={key} className="dashboard-form-group">
                <label className="dashboard-form-label">{prettifyKey(key)}</label>
                <div className="dashboard-array-list">
                  {arr.map((item, index) => {
                    const itemObj = item && typeof item === 'object' && !Array.isArray(item) ? (item as Record<string, unknown>) : {};
                    return (
                      <div key={`${key}-${index}`} className="dashboard-array-item">
                        <div className="dashboard-array-item-top">
                          <span className="dashboard-array-item-title">{`Item ${index + 1}`}</span>
                          <button
                            type="button"
                            className="dashboard-btn dashboard-btn--sm dashboard-btn--danger"
                            onClick={() => setArrayField(key, arr.filter((_, i) => i !== index))}
                          >
                            Remove
                          </button>
                        </div>

                        {itemKeys.map((itemFieldKey) => {
                          const itemVal = itemObj[itemFieldKey];
                          if (isImageUrlKey(itemFieldKey)) {
                            const imgUrl = typeof itemVal === 'string' ? itemVal : '';
                            return (
                              <div key={itemFieldKey} className="dashboard-form-group">
                                <label className="dashboard-form-label">{prettifyKey(itemFieldKey)}</label>
                                <div className="dashboard-image-picker">
                                  {imgUrl ? <img src={imgUrl} alt={itemFieldKey} className="dashboard-image-preview" /> : <div className="dashboard-image-placeholder">No image selected</div>}
                                  <div style={{ flex: 1 }}>
                                    <input type="text" className="dashboard-form-input" value={imgUrl} placeholder="/uploads/.../image.jpg" onChange={(e) => {
                                      if (scope === 'section' && sectionId) {
                                        updateJsonArrayItemField(sectionId, key, index, itemFieldKey, e.target.value);
                                      } else {
                                        updateNewJsonArrayItemField(key, index, itemFieldKey, e.target.value);
                                      }
                                    }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                                      <button type="button" className="dashboard-btn" onClick={() => {
                                        if (scope === 'section' && sectionId) {
                                          setPageMediaPickerTarget({ scope: 'section', sectionId, arrayFieldKey: key, index, itemFieldKey });
                                        } else {
                                          setPageMediaPickerTarget({ scope: 'new', arrayFieldKey: key, index, itemFieldKey });
                                        }
                                      }}>
                                        Choose
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={itemFieldKey} className="dashboard-form-group">
                              <label className="dashboard-form-label">{prettifyKey(itemFieldKey)}</label>
                              {typeof itemVal === 'string' && (itemVal.includes('\n') || itemVal.length > 120) ? (
                                <textarea
                                  className="dashboard-form-input"
                                  rows={4}
                                  value={String(itemVal)}
                                  onChange={(e) => {
                                    if (scope === 'section' && sectionId) {
                                      updateJsonArrayItemField(sectionId, key, index, itemFieldKey, e.target.value);
                                    } else {
                                      updateNewJsonArrayItemField(key, index, itemFieldKey, e.target.value);
                                    }
                                  }}
                                />
                              ) : (
                                <input
                                  type="text"
                                  className="dashboard-form-input"
                                  value={itemVal === null || itemVal === undefined ? '' : String(itemVal)}
                                  onChange={(e) => {
                                    if (scope === 'section' && sectionId) {
                                      updateJsonArrayItemField(sectionId, key, index, itemFieldKey, e.target.value);
                                    } else {
                                      updateNewJsonArrayItemField(key, index, itemFieldKey, e.target.value);
                                    }
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Primitives
          if (isPrimitive(val) || val === null || val === undefined) {
            return (
              <div key={key} className="dashboard-form-group">
                <label className="dashboard-form-label">{prettifyKey(key)}</label>
                {renderValueEditor(scope, sectionId, key, val)}
              </div>
            );
          }

          // Nested objects: fallback (rare)
          return (
            <div key={key} className="dashboard-form-group">
              <label className="dashboard-form-label">{prettifyKey(key)}</label>
              <textarea
                className="dashboard-form-input"
                rows={4}
                value={typeof val === 'string' ? val : JSON.stringify(val)}
                onChange={(e) => setField(key, e.target.value)}
                placeholder="Nested object"
              />
              <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>
                This section has nested data. If needed, use HTML mode for that section.
              </div>
            </div>
          );
        })}
      </>
    );
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;

  return (
    <div className="dashboard-pages">
      <div className="dashboard-pages-sidebar">
        <h2 className="dashboard-pages-title">{t('dashboard.pagesListTitle', 'Pages')}</h2>
        <ul className="dashboard-pages-list">
          {pages.map(page => (
            <li key={page.id}>
              <button
                type="button"
                className={`dashboard-pages-item ${selectedPageId === page.id ? 'dashboard-pages-item--active' : ''}`}
                onClick={() => handleSelectPage(page.id)}
              >
                {page.name} <span className="dashboard-pages-slug">/{page.slug}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-pages-main">
        {!selectedPageId ? (
          <p className="dashboard-empty">Select a page to edit its sections.</p>
        ) : (
          <>
            <div className="dashboard-pages-toolbar">
              <span>Editing: {lang === 'en' ? 'English' : 'Arabic'}</span>
              <div className="dashboard-lang-tabs">
                <button
                  type="button"
                  className={`dashboard-lang-tab ${lang === 'en' ? 'dashboard-lang-tab--active' : ''}`}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`dashboard-lang-tab ${lang === 'ar' ? 'dashboard-lang-tab--active' : ''}`}
                  onClick={() => setLang('ar')}
                >
                  AR
                </button>
              </div>
            </div>

            <div className="dashboard-pages-new-section">
              <h3 className="dashboard-pages-new-section-title">New Section</h3>
              <div className="dashboard-pages-new-section-grid">
                <div>
                  <label className="dashboard-form-label">Key</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={newSectionKey}
                    onChange={e => setNewSectionKey(e.target.value)}
                    placeholder="e.g. services_intro"
                    readOnly={newSectionContentType === 'json'}
                  />
                  {newSectionContentType === 'json' && (
                    <div style={{ marginTop: 10 }}>
                      <label className="dashboard-form-label">Template</label>
                      <select
                        className="dashboard-form-input"
                        value={newSectionSchemaKey}
                        onChange={(e) => {
                          const nextKey = e.target.value;
                          const schema = SECTION_SCHEMAS[nextKey];
                          if (!schema) return;
                          setNewSectionSchemaKey(nextKey);
                          setNewSectionKey(nextKey);
                          setNewSectionContent(JSON.stringify(buildDefaultJsonForSchema(schema)));
                        }}
                      >
                        {schemaKeys.map((k) => (
                          <option key={k} value={k}>
                            {SECTION_SCHEMAS[k].title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label className="dashboard-form-label">Content Type</label>
                  <select
                    className="dashboard-form-input"
                    value={newSectionContentType}
                    onChange={(e) => {
                      const nextType = e.target.value as CmsPageSection['content_type'];
                      setNewSectionContentType(nextType);
                      if (nextType === 'json') {
                        const schema = SECTION_SCHEMAS[newSectionSchemaKey];
                        if (schema) {
                          setNewSectionKey(schema.key);
                          setNewSectionContent(JSON.stringify(buildDefaultJsonForSchema(schema)));
                        }
                      } else if (nextType === 'html') {
                        setNewSectionContent('');
                      } else {
                        setNewSectionContent('');
                      }
                    }}
                  >
                    <option value="text">text</option>
                    <option value="html">html</option>
                    <option value="json">json</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  {newSectionContentType === 'html' ? (
                    <HtmlEditor
                      value={newSectionContent}
                      onChange={setNewSectionContent}
                      placeholder="Write HTML..."
                      minHeight={200}
                    />
                  ) : newSectionContentType === 'json' ? (
                    (() => {
                      const schema = SECTION_SCHEMAS[normalizeSectionKey(newSectionKey)];
                      const obj = safeParseJsonObject(newSectionContent);
                      if (schema) return renderJsonSchemaFields(schema, obj, 'new');
                      return renderGenericJsonEditor('new', undefined, obj);
                    })()
                  ) : (
                    <textarea
                      className="dashboard-form-input"
                      rows={4}
                      value={newSectionContent}
                      onChange={e => setNewSectionContent(e.target.value)}
                      placeholder="Enter content..."
                    />
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button
                  type="button"
                  className="dashboard-btn dashboard-btn--primary"
                  disabled={saving}
                  onClick={handleCreateSection}
                >
                  Add Section
                </button>
              </div>
            </div>

            <div className="dashboard-sections-grid">
              {sections
                .filter(s => s.lang === lang)
                .map(section => (
                  <div key={section.id} className="dashboard-section-card">
                    <div className="dashboard-section-card-header">
                      <div className="dashboard-section-card-key">{section.section_key}</div>
                      <div className="dashboard-section-card-actions">
                        <button
                          type="button"
                          className="dashboard-btn dashboard-btn--sm dashboard-btn--primary"
                          onClick={() => handleSaveSection(section)}
                          disabled={saving}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="dashboard-btn dashboard-btn--sm"
                          onClick={() => handleCopyToOtherLanguage(section)}
                          disabled={saving}
                        >
                          Copy to {lang === 'en' ? 'AR' : 'EN'}
                        </button>
                        <button
                          type="button"
                          className="dashboard-btn dashboard-btn--sm dashboard-btn--danger"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="dashboard-section-card-body">
                      <div className="dashboard-form-group" style={{ marginBottom: 10 }}>
                        <label className="dashboard-form-label">Content Type</label>
                        <select
                          className="dashboard-form-input"
                          value={section.content_type}
                          onChange={e => handleSectionChange(section.id, 'content_type', e.target.value as CmsPageSection['content_type'])}
                        >
                          <option value="text">text</option>
                          <option value="html">html</option>
                          <option value="json">json</option>
                        </select>
                      </div>

                      <div className="dashboard-form-group" style={{ marginBottom: 10 }}>
                        {section.content_type === 'html' ? (
                          <HtmlEditor
                            value={section.content || ''}
                            onChange={(v) => handleSectionChange(section.id, 'content', v)}
                            placeholder="Write HTML..."
                            minHeight={220}
                          />
                        ) : section.content_type === 'json' ? (
                          (() => {
                            const schema = SECTION_SCHEMAS[normalizeSectionKey(section.section_key)];
                            const obj = safeParseJsonObject(section.content);
                            if (schema) return renderJsonSchemaFields(schema, obj, 'section', section.id);
                            return renderGenericJsonEditor('section', section.id, obj);
                          })()
                        ) : (
                          <textarea
                            className="dashboard-form-input"
                            rows={5}
                            value={section.content || ''}
                            onChange={e => handleSectionChange(section.id, 'content', e.target.value)}
                          />
                        )}
                      </div>

                      <div className="dashboard-form-group">
                        <label className="dashboard-form-label">Meta Title</label>
                        <input
                          type="text"
                          className="dashboard-form-input"
                          value={section.meta_title || ''}
                          onChange={e => handleSectionChange(section.id, 'meta_title', e.target.value)}
                        />
                      </div>
                      <div className="dashboard-form-group">
                        <label className="dashboard-form-label">Meta Description</label>
                        <textarea
                          className="dashboard-form-input"
                          rows={3}
                          value={section.meta_description || ''}
                          onChange={e => handleSectionChange(section.id, 'meta_description', e.target.value)}
                        />
                      </div>
                      <div className="dashboard-form-group">
                        <label className="dashboard-form-label">Meta Keywords</label>
                        <input
                          type="text"
                          className="dashboard-form-input"
                          value={section.meta_keywords || ''}
                          onChange={e => handleSectionChange(section.id, 'meta_keywords', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <MediaPickerModal
              open={pageMediaPickerTarget !== null}
              title={
                pageMediaPickerTarget
                  ? pageMediaPickerTarget.scope === 'section'
                    ? 'Pick Image'
                    : 'Pick Image'
                  : 'Pick Image'
              }
              onClose={() => setPageMediaPickerTarget(null)}
              onSelect={handlePageMediaSelect}
            />
          </>
        )}
      </div>
    </div>
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
      <p className="dashboard-hint">
        Images are uploaded to <code>/uploads/</code> (organized by year/month, e.g. <code>/uploads/2026/03/</code>). Use the image picker in Blog/Pages, or copy the URL below when you need the direct link.
      </p>
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
                <div className="dashboard-media-url">{file.url}</div>
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
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<RedirectRule | null>(null);

  const loadRedirects = useCallback(async () => {
    setLoading(true);
    const res = await getRedirects();
    if (res.success && res.redirects) {
      setRedirects(res.redirects);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRedirects();
  }, [loadRedirects]);

  const openNew = () => {
    setEditing({
      id: 0,
      source_path: '',
      destination_url: '',
      status_code: 301,
      is_active: true,
      hit_count: 0,
    });
  };

  const openEdit = (rule: RedirectRule) => {
    setEditing(rule);
  };

  const closeEdit = () => {
    setEditing(null);
  };

  const handleSave = async () => {
    if (!editing) return;
    const payload: Partial<RedirectRule> = { ...editing };
    if (editing.id === 0) {
      delete payload.id;
    }
    const res = await saveRedirect(payload);
    if (!res.success || !res.redirect) {
      alert(res.error || 'Failed to save redirect');
      return;
    }
    setRedirects(prev => {
      const exists = prev.find(r => r.id === res.redirect!.id);
      if (exists) {
        return prev.map(r => (r.id === res.redirect!.id ? res.redirect! : r));
      }
      return [res.redirect!, ...prev];
    });
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this redirect?')) return;
    const res = await deleteRedirect(id);
    if (res.success) {
      setRedirects(prev => prev.filter(r => r.id !== id));
    } else {
      alert(res.error || 'Failed to delete redirect');
    }
  };

  if (loading) return <p className="dashboard-loading">Loading...</p>;

  return (
    <>
      <p className="dashboard-welcome">{t('dashboard.redirectsIntro', 'Manage URL redirects.')}</p>
      <div className="dashboard-toolbar">
        <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={openNew}>
          + Add Redirect
        </button>
      </div>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Source Path</th>
              <th>Destination URL</th>
              <th>Status Code</th>
              <th>Active</th>
              <th>Hits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {redirects.length === 0 ? (
              <tr>
                <td colSpan={6} className="dashboard-table-empty">
                  No redirects defined.
                </td>
              </tr>
            ) : (
              redirects.map(r => (
                <tr key={r.id}>
                  <td>{r.source_path}</td>
                  <td>{r.destination_url}</td>
                  <td>{r.status_code}</td>
                  <td>{r.is_active ? 'Yes' : 'No'}</td>
                  <td>{r.hit_count}</td>
                  <td>
                    <button type="button" className="dashboard-btn dashboard-btn--sm" onClick={() => openEdit(r)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="dashboard-btn dashboard-btn--sm dashboard-btn--danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="dashboard-modal-backdrop" onClick={closeEdit} role="presentation">
          <div className="dashboard-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="dashboard-modal-header">
              <h2>{editing.id ? 'Edit Redirect' : 'New Redirect'}</h2>
              <button type="button" className="dashboard-modal-close" onClick={closeEdit}>
                ×
              </button>
            </div>
            <div className="dashboard-modal-body">
              <div className="dashboard-form">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Source Path</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={editing.source_path}
                    onChange={e => setEditing(prev => prev && { ...prev, source_path: e.target.value })}
                  />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Destination URL</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={editing.destination_url}
                    onChange={e => setEditing(prev => prev && { ...prev, destination_url: e.target.value })}
                  />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Status Code</label>
                  <input
                    type="number"
                    className="dashboard-form-input"
                    value={editing.status_code}
                    onChange={e =>
                      setEditing(prev => prev && { ...prev, status_code: Number(e.target.value) || 301 })
                    }
                  />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Active</label>
                  <input
                    type="checkbox"
                    checked={editing.is_active}
                    onChange={e => setEditing(prev => prev && { ...prev, is_active: e.target.checked })}
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-modal-footer">
              <button type="button" className="dashboard-btn" onClick={closeEdit}>
                Cancel
              </button>
              <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
