import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { WhatsAppIcon } from '../components/Icons';
import { CONTACT_PATH, WHATSAPP_URL } from '../constants/cta';
import {
  BLOG_POSTS,
  BLOG_FILTER_TABS,
  CATEGORY_FILTER_LABELS,
  type BlogPost,
  type BlogFilterId,
} from '../data/blogPosts';
import '../styles/blog.css';

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    </svg>
  );
}

function BeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 2v6l6 6v2" />
      <path d="M3 22h18" />
      <path d="M9 8h6" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const FILTER_ICONS: Record<BlogFilterId, React.ReactNode> = {
  all: <StarIcon />,
  rehabilitation: <StarIcon />,
  tips: <HeartIcon />,
  wellness: <LeafIcon />,
  research: <BeakerIcon />,
  news: <NewsIcon />,
};

function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation();
  const filterLabelKey = CATEGORY_FILTER_LABELS[post.category];
  const authorName = t(post.authorKey);

  return (
    <article id={`post-${post.slug}`} className="blog-card">
      <div className="blog-card-inner">
        <div className="blog-card-image-wrap">
          <img src={post.image} alt="" className="blog-card-image" loading="lazy" />
          <span className="blog-card-category-tag">{t(filterLabelKey)}</span>
        </div>
        <div className="blog-card-body">
          <div className="blog-card-meta-line">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="blog-card-sep">·</span>
            <span className="blog-card-meta-read">
              <span className="blog-card-clock" aria-hidden><ClockIcon /></span>
              {post.readTime} {t('blog.minRead')}
            </span>
          </div>
          <h2 className="blog-card-title">{t(post.titleKey)}</h2>
          <p className="blog-card-excerpt">{t(post.excerptKey)}</p>
          <p className="blog-card-by">{t('blog.byAuthor')} {authorName}</p>
          <a href={`#post-${post.slug}`} className="blog-card-read-more">
            {t('blog.readMore')}
            <span className="blog-card-read-more-arrow" aria-hidden><ArrowRightIcon /></span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<BlogFilterId>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = useMemo(() => {
    let list = filter === 'all' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((post) => {
        const title = t(post.titleKey).toLowerCase();
        const categoryLabel = t(CATEGORY_FILTER_LABELS[post.category]).toLowerCase();
        const excerpt = t(post.excerptKey).toLowerCase();
        const author = t(post.authorKey).toLowerCase();
        return title.includes(q) || categoryLabel.includes(q) || excerpt.includes(q) || author.includes(q);
      });
    }
    return list;
  }, [filter, searchQuery, t, i18n.language]);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="blog-page">
        <section className="blog-hero">
          <div className="blog-hero-bg" aria-hidden="true" />
          <div className="blog-hero-content">
            <h1 className="blog-hero-title">{t('blog.heroTitle')}</h1>
            <p className="blog-hero-subtitle">{t('blog.heroSubtitle')}</p>
            <div className="blog-hero-buttons cta-buttons">
              <Link to={CONTACT_PATH} className="btn btn-primary">
                {t('nav.bookAppointment')}
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-whatsapp" aria-label={t('hero.whatsapp')}>
                <WhatsAppIcon className="whatsapp-icon" />
                {t('hero.whatsapp')}
              </a>
            </div>
          </div>
        </section>

        <section className="blog-filter-bar">
          <div className="blog-filter-inner">
            <div className="blog-filter-tabs" role="tablist" aria-label="Blog categories">
              {BLOG_FILTER_TABS.map(({ id, labelKey }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={filter === id}
                  className={`blog-filter-tab ${filter === id ? 'blog-filter-tab--active' : ''}`}
                  onClick={() => setFilter(id)}
                >
                  <span className="blog-filter-tab-icon" aria-hidden>{FILTER_ICONS[id]}</span>
                  {t(labelKey)}
                </button>
              ))}
            </div>
            <div className="blog-search-wrap">
              <span className="blog-search-icon" aria-hidden><SearchIcon /></span>
              <input
                type="search"
                className="blog-search-input"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('blog.searchPlaceholder')}
              />
            </div>
          </div>
        </section>

        <section className="blog-section">
          <div className="blog-container">
            {filteredPosts.length > 0 ? (
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="blog-empty">{t('blog.noResults')}</p>
            )}
          </div>
        </section>

        <CtaSection variant="services" />
      </main>
      <Footer />
    </div>
  );
}
