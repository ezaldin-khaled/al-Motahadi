/**
 * Blog posts data — replace with API/CMS when ready.
 * Images: use /service-images/ or your own assets.
 */
export type BlogCategory = 'rehabilitation' | 'wellness' | 'tips' | 'news' | 'research';

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  bodyKey: string; // i18n key for full article body (paragraphs separated by \n\n)
  /** Override for display; when set, used instead of t(titleKey). */
  titleOverride?: string;
  /** Override for display; when set, used instead of t(excerptKey). */
  excerptOverride?: string;
  category: BlogCategory;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  image: string; // small image (card/thumbnail)
  imageLarge?: string; // main image (article hero) — falls back to image if not set
  authorKey: string; // i18n key for author name
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'importance-of-early-rehabilitation',
    titleKey: 'blog.post1Title',
    excerptKey: 'blog.post1Excerpt',
    bodyKey: 'blog.post1Body',
    category: 'rehabilitation',
    date: '2025-02-15',
    readTime: 5,
    image: '/service-images/2.png',
    authorKey: 'blog.author1',
    featured: true,
  },
  {
    id: '2',
    slug: 'physical-therapy-at-home',
    titleKey: 'blog.post2Title',
    excerptKey: 'blog.post2Excerpt',
    bodyKey: 'blog.post2Body',
    category: 'tips',
    date: '2025-02-12',
    readTime: 4,
    image: '/service-images/1.png',
    authorKey: 'blog.author2',
  },
  {
    id: '3',
    slug: 'recovery-milestones',
    titleKey: 'blog.post3Title',
    excerptKey: 'blog.post3Excerpt',
    bodyKey: 'blog.post3Body',
    category: 'wellness',
    date: '2025-02-08',
    readTime: 6,
    image: '/service-images/3.png',
    authorKey: 'blog.author3',
  },
  {
    id: '4',
    slug: 'neuro-rehab-insights',
    titleKey: 'blog.post4Title',
    excerptKey: 'blog.post4Excerpt',
    bodyKey: 'blog.post4Body',
    category: 'research',
    date: '2025-02-05',
    readTime: 7,
    image: '/service-images/4.png',
    authorKey: 'blog.author4',
  },
  {
    id: '5',
    slug: 'staying-active-after-injury',
    titleKey: 'blog.post5Title',
    excerptKey: 'blog.post5Excerpt',
    bodyKey: 'blog.post5Body',
    category: 'wellness',
    date: '2025-02-01',
    readTime: 5,
    image: '/service-images/5.png',
    authorKey: 'blog.author5',
  },
  {
    id: '6',
    slug: 'center-news-february',
    titleKey: 'blog.post6Title',
    excerptKey: 'blog.post6Excerpt',
    bodyKey: 'blog.post6Body',
    category: 'news',
    date: '2025-01-28',
    readTime: 3,
    image: '/service-images/6.png',
    authorKey: 'blog.author6',
  },
];

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
  rehabilitation: 'blog.categoryRehabilitation',
  wellness: 'blog.categoryWellness',
  tips: 'blog.categoryTips',
  news: 'blog.categoryNews',
  research: 'blog.categoryResearch',
};

/** Filter tab label keys for UI (design: Treatment & Recovery, Patient Stories, etc.) */
export const CATEGORY_FILTER_LABELS: Record<BlogCategory, string> = {
  rehabilitation: 'blog.filterTreatmentRecovery',
  wellness: 'blog.filterHealthWellness',
  tips: 'blog.filterPatientStories',
  news: 'blog.filterNews',
  research: 'blog.filterMedicalInsights',
};

export type BlogFilterId = 'all' | BlogCategory;

export const BLOG_FILTER_TABS: { id: BlogFilterId; labelKey: string }[] = [
  { id: 'all', labelKey: 'blog.filterAllPosts' },
  { id: 'rehabilitation', labelKey: 'blog.filterTreatmentRecovery' },
  { id: 'tips', labelKey: 'blog.filterPatientStories' },
  { id: 'wellness', labelKey: 'blog.filterHealthWellness' },
  { id: 'research', labelKey: 'blog.filterMedicalInsights' },
  { id: 'news', labelKey: 'blog.filterNews' },
];
