import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  BLOG_POSTS,
  CATEGORY_FILTER_LABELS,
  type BlogPost,
  type BlogCategory,
} from '../data/blogPosts';
import '../styles/admin.css';

const CATEGORY_OPTIONS: BlogCategory[] = ['rehabilitation', 'wellness', 'tips', 'news', 'research'];

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PostIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

type EditFormState = Pick<BlogPost, 'slug' | 'category' | 'date' | 'readTime' | 'image' | 'imageLarge' | 'featured'> & {
  titleOverride?: string;
  excerptOverride?: string;
};

function ImageUploadField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const { t } = useTranslation();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  return (
    <div className="admin-form-label">
      <span className="admin-form-label-text">{label}</span>
      {hint && <span className="admin-form-hint">{hint}</span>}
      <div className="admin-image-upload">
        <div className="admin-image-preview">
          {value ? (
            <img src={value} alt="" className="admin-image-preview-img" />
          ) : (
            <span className="admin-image-preview-empty">{t('admin.fieldNoImage')}</span>
          )}
        </div>
        <div className="admin-image-actions">
          <label className="admin-btn admin-btn--secondary admin-btn--upload">
            <input type="file" accept="image/*" onChange={handleFile} className="admin-input-file" />
            {t('admin.fieldUploadFile')}
          </label>
          <input
            type="text"
            className="admin-form-input admin-form-input--sm"
            placeholder={t('admin.fieldPasteUrlPlaceholder')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(() => [...BLOG_POSTS]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editForm, setEditForm] = useState<EditFormState | null>(null);
  const [addForm, setAddForm] = useState<EditFormState | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login', { replace: true });
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setEditForm({
      slug: post.slug,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      image: post.image,
      imageLarge: post.imageLarge ?? post.image,
      featured: post.featured ?? false,
      titleOverride: post.titleOverride ?? t(post.titleKey),
      excerptOverride: post.excerptOverride ?? t(post.excerptKey),
    });
  };

  const closeEdit = () => {
    setEditingPost(null);
    setEditForm(null);
  };

  const openAdd = () => {
    setAddForm({
      slug: '',
      category: 'wellness',
      date: new Date().toISOString().slice(0, 10),
      readTime: 5,
      image: '',
      imageLarge: '',
      featured: false,
      titleOverride: '',
      excerptOverride: '',
    });
  };

  const closeAdd = () => setAddForm(null);

  const saveNew = () => {
    if (!addForm || !addForm.slug.trim()) return;
    const newPost: BlogPost = {
      id: `new-${Date.now()}`,
      slug: addForm.slug.trim(),
      titleKey: 'blog.postNewTitle',
      excerptKey: 'blog.postNewExcerpt',
      bodyKey: 'blog.postNewBody',
      titleOverride: addForm.titleOverride?.trim() || undefined,
      excerptOverride: addForm.excerptOverride?.trim() || undefined,
      category: addForm.category,
      date: addForm.date,
      readTime: addForm.readTime,
      image: addForm.image || '/service-images/1.png',
      imageLarge: addForm.imageLarge || addForm.image || undefined,
      authorKey: 'blog.authorNew',
      featured: addForm.featured,
    };
    setPosts((prev) => [newPost, ...prev]);
    closeAdd();
  };

  const saveEdit = () => {
    if (!editingPost || !editForm) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              ...editForm,
              imageLarge: editForm.imageLarge || undefined,
              titleOverride: editForm.titleOverride?.trim() || undefined,
              excerptOverride: editForm.excerptOverride?.trim() || undefined,
            }
          : p
      )
    );
    closeEdit();
  };

  const confirmDelete = (post: BlogPost) => setDeleteConfirm(post);
  const cancelDelete = () => setDeleteConfirm(null);

  const doDelete = () => {
    if (!deleteConfirm) return;
    setPosts((prev) => prev.filter((p) => p.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const categoryCounts = posts.reduce<Record<BlogCategory, number>>(
    (acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<BlogCategory, number>
  );
  const featuredCount = posts.filter((p) => p.featured).length;

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-logo">{t('admin.logo')}</Link>
          <span className="admin-badge">{t('admin.badge')}</span>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          <div className="admin-nav-section">
            <span className="admin-nav-section-label">{t('admin.navContent')}</span>
            <button type="button" className="admin-nav-item admin-nav-item--active" aria-current="page">
              <PostIcon />
              {t('admin.navBlog')}
            </button>
          </div>
        </nav>
        <div className="admin-sidebar-footer">
          <button type="button" className="admin-logout" onClick={handleLogout}>
            {t('admin.logout')}
          </button>
          <Link to="/" className="admin-back">{t('admin.backToSite')}</Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">{t('admin.title')}</h1>
            <p className="admin-subtitle">{t('admin.subtitle')}</p>
          </div>
        </header>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-icon" aria-hidden><PostIcon /></span>
            <div>
              <span className="admin-stat-value">{posts.length}</span>
              <span className="admin-stat-label">{t('admin.statTotal')}</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon" aria-hidden><ChartIcon /></span>
            <div>
              <span className="admin-stat-value">{featuredCount}</span>
              <span className="admin-stat-label">{t('admin.statFeatured')}</span>
            </div>
          </div>
          <div className="admin-stat-card admin-stat-card--wide">
            <span className="admin-stat-label" style={{ marginBottom: 6 }}>{t('admin.statByCategory')}</span>
            <div className="admin-stat-categories">
              {CATEGORY_OPTIONS.map((cat) => (
                <span key={cat} className="admin-stat-cat">
                  {t(CATEGORY_FILTER_LABELS[cat])}: <strong>{categoryCounts[cat] ?? 0}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="admin-content">
          <div className="admin-toolbar">
            <p className="admin-hint">
              {t('admin.postsHint')}{' '}
              <code>src/data/blogPosts.ts</code>.
            </p>
            <button type="button" className="admin-btn admin-btn--primary" onClick={openAdd}>
              {t('admin.newPost')}
            </button>
          </div>

          <div className="admin-table-wrap">
            {posts.length === 0 ? (
              <div className="admin-empty">
                <PostIcon />
                <p>{t('admin.emptyTitle')}</p>
                <p className="admin-empty-hint">
                  {t('admin.emptyHint')}{' '}
                  <code>src/data/blogPosts.ts</code>
                </p>
              </div>
            ) : (
              <table className="admin-table" aria-label={t('admin.tableAria')}>
                <thead>
                  <tr>
                    <th>{t('admin.colPost')}</th>
                    <th>{t('admin.colCategory')}</th>
                    <th>{t('admin.colDate')}</th>
                    <th>{t('admin.colRead')}</th>
                    <th>{t('admin.colFeatured')}</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="admin-table-post">
                          <img src={post.image} alt="" className="admin-table-thumb" />
                          <div>
                            <span className="admin-table-title">{post.titleOverride ?? t(post.titleKey)}</span>
                            <span className="admin-table-slug">/{post.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-table-category">{t(CATEGORY_FILTER_LABELS[post.category])}</span>
                      </td>
                      <td>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                      </td>
                      <td>{post.readTime} min</td>
                      <td>
                        {post.featured ? <span className="admin-badge-featured">Yes</span> : '—'}
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <a
                            href={`${window.location.origin}/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn admin-btn--icon"
                            title={t('admin.viewOnSite')}
                            aria-label={t('admin.viewOnSite')}
                          >
                            <ExternalIcon />
                          </a>
                          <button
                            type="button"
                            className="admin-btn admin-btn--icon"
                            title={t('admin.edit')}
                            aria-label={t('admin.edit')}
                            onClick={() => openEdit(post)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            type="button"
                            className="admin-btn admin-btn--icon admin-btn--danger"
                            title={t('admin.delete')}
                            aria-label={t('admin.delete')}
                            onClick={() => confirmDelete(post)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      {/* Edit modal */}
      {editingPost && editForm && (
        <div className="admin-modal-backdrop" onClick={closeEdit} role="presentation">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
            <div className="admin-modal-header">
              <h2 id="admin-modal-title">{t('admin.editTitle')}</h2>
              <button type="button" className="admin-modal-close" onClick={closeEdit} aria-label={t('admin.cancel')}>×</button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-modal-hint">{t('admin.editHint')}</p>
              <div className="admin-form">
                <label className="admin-form-label">
                  {t('admin.fieldName')}
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder={t('admin.fieldTitlePlaceholder')}
                    value={editForm.titleOverride ?? ''}
                    onChange={(e) => setEditForm((f) => f && { ...f, titleOverride: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldDescription')}
                  <textarea
                    className="admin-form-input admin-form-input--textarea"
                    placeholder={t('admin.fieldExcerptPlaceholder')}
                    rows={3}
                    value={editForm.excerptOverride ?? ''}
                    onChange={(e) => setEditForm((f) => f && { ...f, excerptOverride: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldSlug')}
                  <input
                    type="text"
                    className="admin-form-input"
                    value={editForm.slug}
                    onChange={(e) => setEditForm((f) => f && { ...f, slug: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldCategory')}
                  <select
                    className="admin-form-input"
                    value={editForm.category}
                    onChange={(e) => setEditForm((f) => f && { ...f, category: e.target.value as BlogCategory })}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{t(CATEGORY_FILTER_LABELS[c])}</option>
                    ))}
                  </select>
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldDate')}
                  <input
                    type="date"
                    className="admin-form-input"
                    value={editForm.date}
                    onChange={(e) => setEditForm((f) => f && { ...f, date: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldReadTime')}
                  <input
                    type="number"
                    min={1}
                    max={60}
                    className="admin-form-input"
                    value={editForm.readTime}
                    onChange={(e) => setEditForm((f) => f && { ...f, readTime: Number(e.target.value) || 1 })}
                  />
                </label>
                <ImageUploadField
                  label={t('admin.fieldSmallImage')}
                  hint={t('admin.fieldSmallImageHint')}
                  value={editForm.image}
                  onChange={(url) => setEditForm((f) => f && { ...f, image: url })}
                />
                <ImageUploadField
                  label={t('admin.fieldMainImage')}
                  hint={t('admin.fieldMainImageHint')}
                  value={editForm.imageLarge ?? editForm.image}
                  onChange={(url) => setEditForm((f) => f && { ...f, imageLarge: url })}
                />
                <label className="admin-form-label admin-form-label--row">
                  <input
                    type="checkbox"
                    checked={editForm.featured}
                    onChange={(e) => setEditForm((f) => f && { ...f, featured: e.target.checked })}
                  />
                  <span>{t('admin.fieldFeatured')}</span>
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn admin-btn--secondary" onClick={closeEdit}>{t('admin.cancel')}</button>
              <button type="button" className="admin-btn admin-btn--primary" onClick={saveEdit}>{t('admin.saveChanges')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add post modal */}
      {addForm && (
        <div className="admin-modal-backdrop" onClick={closeAdd} role="presentation">
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="admin-add-title">
            <div className="admin-modal-header">
              <h2 id="admin-add-title">{t('admin.addTitle')}</h2>
              <button type="button" className="admin-modal-close" onClick={closeAdd} aria-label={t('admin.cancel')}>×</button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-modal-hint">{t('admin.addHint')}</p>
              <div className="admin-form">
                <label className="admin-form-label">
                  {t('admin.fieldName')}
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder={t('admin.fieldTitlePlaceholder')}
                    value={addForm.titleOverride ?? ''}
                    onChange={(e) => setAddForm((f) => f && { ...f, titleOverride: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldDescription')}
                  <textarea
                    className="admin-form-input admin-form-input--textarea"
                    placeholder={t('admin.fieldExcerptPlaceholder')}
                    rows={3}
                    value={addForm.excerptOverride ?? ''}
                    onChange={(e) => setAddForm((f) => f && { ...f, excerptOverride: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldSlug')}
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder={t('admin.fieldSlugPlaceholder')}
                    value={addForm.slug}
                    onChange={(e) => setAddForm((f) => f && { ...f, slug: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldCategory')}
                  <select
                    className="admin-form-input"
                    value={addForm.category}
                    onChange={(e) => setAddForm((f) => f && { ...f, category: e.target.value as BlogCategory })}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{t(CATEGORY_FILTER_LABELS[c])}</option>
                    ))}
                  </select>
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldDate')}
                  <input
                    type="date"
                    className="admin-form-input"
                    value={addForm.date}
                    onChange={(e) => setAddForm((f) => f && { ...f, date: e.target.value })}
                  />
                </label>
                <label className="admin-form-label">
                  {t('admin.fieldReadTime')}
                  <input
                    type="number"
                    min={1}
                    max={60}
                    className="admin-form-input"
                    value={addForm.readTime}
                    onChange={(e) => setAddForm((f) => f && { ...f, readTime: Number(e.target.value) || 1 })}
                  />
                </label>
                <ImageUploadField
                  label={t('admin.fieldSmallImage')}
                  hint={t('admin.fieldSmallImageHint')}
                  value={addForm.image}
                  onChange={(url) => setAddForm((f) => f && { ...f, image: url })}
                />
                <ImageUploadField
                  label={t('admin.fieldMainImage')}
                  hint={t('admin.fieldMainImageHint')}
                  value={addForm.imageLarge ?? addForm.image}
                  onChange={(url) => setAddForm((f) => f && { ...f, imageLarge: url })}
                />
                <label className="admin-form-label admin-form-label--row">
                  <input
                    type="checkbox"
                    checked={addForm.featured}
                    onChange={(e) => setAddForm((f) => f && { ...f, featured: e.target.checked })}
                  />
                  <span>{t('admin.fieldFeatured')}</span>
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn admin-btn--secondary" onClick={closeAdd}>{t('admin.cancel')}</button>
              <button type="button" className="admin-btn admin-btn--primary" onClick={saveNew} disabled={!addForm.slug.trim()}>
                {t('admin.createPost')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={cancelDelete} role="presentation">
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
            <div className="admin-modal-header">
              <h2 id="admin-delete-title">{t('admin.deleteTitle')}</h2>
              <button type="button" className="admin-modal-close" onClick={cancelDelete} aria-label={t('admin.cancel')}>×</button>
            </div>
            <div className="admin-modal-body">
              <p>{t('admin.deleteBody', { title: deleteConfirm.titleOverride ?? t(deleteConfirm.titleKey) })}</p>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn admin-btn--secondary" onClick={cancelDelete}>{t('admin.cancel')}</button>
              <button type="button" className="admin-btn admin-btn--danger" onClick={doDelete}>{t('admin.delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
