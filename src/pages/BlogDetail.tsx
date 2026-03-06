import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';
import {
  BLOG_POSTS,
  CATEGORY_FILTER_LABELS,
  type BlogPost,
} from '../data/blogPosts';
import '../styles/blog.css';

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function RelatedCard({ post }: { post: BlogPost }) {
  const { t, i18n } = useTranslation();
  const authorName = t(post.authorKey);
  const filterLabelKey = CATEGORY_FILTER_LABELS[post.category];
  const relativeTime = i18n.language === 'ar' ? `${post.readTime} ${t('blog.minRead')}` : formatRelativeTime(post.date);
  const title = post.titleOverride ?? t(post.titleKey);

  return (
    <article className="blog-related-card">
      <Link to={`/blog/${post.slug}`} className="blog-related-card-link">
        <div className="blog-related-card-image-wrap">
          <img src={post.image} alt="" className="blog-related-card-image" loading="lazy" />
          <span className="blog-related-card-category">{t(filterLabelKey)}</span>
        </div>
        <div className="blog-related-card-body">
          <h3 className="blog-related-card-title">{title}</h3>
          <div className="blog-related-card-meta">
            <span>{relativeTime}</span>
            <span className="blog-related-card-sep">·</span>
            <span>{t('blog.byAuthor')} {authorName}</span>
          </div>
          <span className="blog-related-card-read-more">
            {t('blog.readMore')}
            <span className="blog-related-card-arrow" aria-hidden><ArrowRightIcon /></span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="main-content blog-detail-page">
          <div className="blog-detail-not-found content-inner">
            <p>{t('blog.detailNotFound')}</p>
            <Link to="/blog" className="btn btn-primary">{t('blog.detailBack')}</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const authorName = t(post.authorKey);
  const categoryLabelKey = CATEGORY_FILTER_LABELS[post.category];
  const title = post.titleOverride ?? t(post.titleKey);
  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 1);
  const bodyParagraphs = t(post.bodyKey).split('\n\n').filter(Boolean);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content blog-detail-page">
        <section className="blog-detail-hero" aria-label="Article header">
          <div className="blog-detail-hero-bg" style={{ backgroundImage: `url(${post.imageLarge ?? post.image})` }} aria-hidden />
          <div className="blog-detail-hero-overlay" aria-hidden />
          <div className="blog-detail-hero-content">
            <span className="blog-detail-hero-category">
              {t(categoryLabelKey)}
            </span>
            <h1 className="blog-detail-hero-title">{title}</h1>
            <p className="blog-detail-hero-subtitle">{t('blog.heroSubtitle')}</p>
            <p className="blog-detail-hero-meta">
              {t('blog.byAuthor')} {authorName} | {formattedDate}
            </p>
          </div>
        </section>

        <section className="blog-detail-content-section">
          <div className="blog-detail-content-inner content-inner">
            <Link
              to="/blog"
              className="blog-detail-back"
            >
              {isRtl ? <>{t('blog.detailBack')} →</> : <>← {t('blog.detailBack')}</>}
            </Link>
            <p className="blog-detail-kicker">
              {t(categoryLabelKey)}
            </p>
            <div className="blog-detail-body">
              {bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="blog-detail-related">
            <div className="blog-detail-related-inner content-inner">
              <h2 className="blog-detail-related-title">{t('blog.relatedBlog')}</h2>
              <div className="blog-detail-related-grid">
                {relatedPosts.map((p) => (
                  <RelatedCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection variant="services" />
      </main>
      <Footer />
    </div>
  );
}
