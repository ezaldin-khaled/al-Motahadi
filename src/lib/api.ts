/**
 * Base URL for the PHP API (e.g. on Hostinger: same origin, so leave empty or set in .env).
 * VITE_API_BASE_URL - optional; if not set, uses same origin (relative /api/...).
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';

// =========================================================================
// Contact API
// =========================================================================

export type ContactPayload = {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email: string;
  phone?: string;
  message?: string;
};

export type ContactResponse =
  | { success: true; message?: string }
  | { success: false; error: string };

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE}/api/contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as ContactResponse;
  if (!res.ok && data.success !== false) {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
  return data;
}

// =========================================================================
// Auth API (PHP session-based)
// =========================================================================

export type AuthUser = {
  id?: number;
  username: string;
  name?: string;
  email?: string;
  role?: string;
};

export type AuthLoginPayload = { username: string; password: string };

export type AuthLoginResponse =
  | { success: true; token?: string; user?: AuthUser }
  | { success: false; error: string };

export type AuthMeResponse =
  | { success: true; user: AuthUser }
  | { success: false; error: string };

const AUTH_STORAGE_KEY = 'dashboard_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (token) localStorage.setItem(AUTH_STORAGE_KEY, token);
  else localStorage.removeItem(AUTH_STORAGE_KEY);
}

/** Login with username/password. Uses PHP session auth. */
export async function loginAuth(payload: AuthLoginPayload): Promise<AuthLoginResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as AuthLoginResponse;
    if (!res.ok || !data.success) {
      return { success: false, error: (data as { error?: string }).error || 'Invalid credentials.' };
    }
    return data;
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/** Logout: destroy server session. */
export async function logoutAuth(): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth.php?action=logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    return { success: data.success ?? false };
  } catch {
    return { success: false };
  }
}

/** Check current session and get user info. */
export async function getAuthMe(): Promise<AuthMeResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/auth.php?action=me`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = (await res.json()) as AuthMeResponse;
    return data;
  } catch {
    return { success: false, error: 'Network error.' };
  }
}

// =========================================================================
// Blog API
// =========================================================================

export type BlogPostData = {
  id?: number;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  body_en?: string;
  body_ar?: string;
  category: string;
  date: string;
  read_time: number;
  image: string;
  image_large?: string;
  author_name?: string;
  thumbnail_media_id?: number | null;
  hero_media_id?: number | null;
  status: 'draft' | 'published';
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_title_en?: string | null;
  meta_description_en?: string | null;
  meta_keywords_en?: string | null;
  meta_title_ar?: string | null;
  meta_description_ar?: string | null;
  meta_keywords_ar?: string | null;
};

export type BlogListResponse =
  | { success: true; posts: BlogPostData[] }
  | { success: false; error: string };

export type BlogSingleResponse =
  | { success: true; post: BlogPostData }
  | { success: false; error: string };

export type BlogSaveResponse =
  | { success: true; post: BlogPostData }
  | { success: false; error: string };

export async function getBlogPosts(filters?: { status?: string; category?: string; lang?: string; featured?: boolean }): Promise<BlogListResponse> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.category) params.set('category', filters.category);
    if (filters?.lang) params.set('lang', filters.lang);
    if (typeof filters?.featured === 'boolean') params.set('featured', filters.featured ? '1' : '0');
    const url = `${API_BASE}/api/blog.php${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url, { credentials: 'include' });
    const data = (await res.json()) as BlogListResponse | { success: true; posts: Array<Record<string, unknown>> };
    if (!('success' in data) || !data.success) return data as BlogListResponse;

    const lang = filters?.lang || 'en';
    const posts = (data as { success: true; posts: Array<Record<string, unknown>> }).posts.map((raw) => {
      const rawTitle = (raw as any).title as string | undefined;
      const rawExcerpt = (raw as any).excerpt as string | undefined;
      const title_en = lang === 'en' ? (rawTitle || '') : '';
      const title_ar = lang === 'ar' ? (rawTitle || '') : '';
      const excerpt_en = lang === 'en' ? (rawExcerpt || '') : '';
      const excerpt_ar = lang === 'ar' ? (rawExcerpt || '') : '';

      const dateRaw =
        (raw as any).published_at ||
        (raw as any).date ||
        (raw as any).created_at ||
        (raw as any).updated_at ||
        new Date().toISOString();
      return {
        ...(raw as any),
        title_en,
        title_ar,
        excerpt_en,
        excerpt_ar,
        // backend list query provides hero URL as image_large, and thumb URL as image
        image_large: (raw as any).image_large ?? undefined,
        image: (raw as any).image ?? '',
        date: String(dateRaw).slice(0, 10),
        read_time: typeof (raw as any).read_time === 'number' ? (raw as any).read_time : 5,
        featured: Boolean((raw as any).featured),
      } as BlogPostData;
    });

    return { success: true, posts };
  } catch {
    return { success: false, error: 'Failed to fetch posts.' };
  }
}

export async function getBlogPost(id: number | string, _lang?: 'en' | 'ar'): Promise<BlogSingleResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/blog.php?id=${id}`, { credentials: 'include' });
    const data = (await res.json()) as BlogSingleResponse & { success?: boolean; post?: any };
    if (!data.success || !data.post) return data as BlogSingleResponse;

    const raw = data.post as any;
    const dateRaw =
      raw.published_at ||
      raw.date ||
      raw.created_at ||
      raw.updated_at ||
      new Date().toISOString();

    const date = String(dateRaw).slice(0, 10);

    const normalized: BlogPostData = {
      ...(raw as any),
      date,
      read_time: typeof raw.read_time === 'number' ? raw.read_time : 5,
      image: raw.image ?? raw.thumb_url ?? '',
      image_large: raw.image_large ?? undefined,
      thumbnail_media_id: raw.thumbnail_media_id ?? null,
      hero_media_id: raw.hero_media_id ?? null,
      featured: Boolean(raw.featured),
    };

    return { success: true, post: normalized };
  } catch {
    return { success: false, error: 'Failed to fetch post.' };
  }
}

export async function saveBlogPost(post: Partial<BlogPostData>): Promise<BlogSaveResponse> {
  try {
    const method = post.id ? 'PUT' : 'POST';
    const res = await fetch(`${API_BASE}/api/blog.php`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(post),
    });
    return (await res.json()) as BlogSaveResponse;
  } catch {
    return { success: false, error: 'Failed to save post.' };
  }
}

export async function deleteBlogPost(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/blog.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to delete post.' };
  }
}

// =========================================================================
// Settings API
// =========================================================================

export type SiteSettings = Record<string, string>;

export async function getSettings(): Promise<{ success: boolean; settings?: SiteSettings; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/settings.php`, { credentials: 'include' });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to fetch settings.' };
  }
}

export async function saveSettings(settings: SiteSettings): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/settings.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(settings),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to save settings.' };
  }
}

// =========================================================================
// Media / Upload API
// =========================================================================

export type MediaFile = {
  id: number;
  original_name: string;
  stored_name: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  alt_text?: string;
  uploaded_at: string;
};

export async function getMediaFiles(): Promise<{ success: boolean; files?: MediaFile[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/images.php`, { credentials: 'include' });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to fetch media.' };
  }
}

export async function uploadMedia(file: File, altText?: string): Promise<{ success: boolean; file?: MediaFile; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('alt_text', altText);
    const res = await fetch(`${API_BASE}/api/upload.php`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to upload file.' };
  }
}

export async function deleteMedia(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/images.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to delete file.' };
  }
}

// =========================================================================
// Pages / Sections API
// =========================================================================

export type CmsPage = {
  id: number;
  slug: string;
  name: string;
  is_active: boolean;
  sort_order: number;
};

export type CmsPageSection = {
  id: number;
  page_id: number;
  section_key: string;
  lang: string;
  content_type: 'text' | 'html' | 'json';
  content: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
};

export type CmsPageSectionsMap = Record<string, Record<string, CmsPageSection>>;

export async function getPages(): Promise<{ success: boolean; pages?: CmsPage[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/pages.php`, { credentials: 'include' });
    return (await res.json()) as { success: boolean; pages?: CmsPage[]; error?: string };
  } catch {
    return { success: false, error: 'Failed to fetch pages.' };
  }
}

export async function getPageSections(pageId: number, lang?: string): Promise<{ success: boolean; sections?: Record<string, Record<string, CmsPageSection>> | CmsPageSection[]; error?: string }> {
  try {
    const params = new URLSearchParams();
    params.set('page_id', String(pageId));
    if (lang) params.set('lang', lang);
    const res = await fetch(`${API_BASE}/api/pages.php?${params.toString()}`, { credentials: 'include' });
    return (await res.json()) as { success: boolean; sections?: Record<string, Record<string, CmsPageSection>> | CmsPageSection[]; error?: string };
  } catch {
    return { success: false, error: 'Failed to fetch sections.' };
  }
}

export async function getPageSectionsBySlug(slug: string, lang?: string): Promise<{ success: boolean; page_id?: number; sections?: CmsPageSectionsMap; error?: string }> {
  try {
    const params = new URLSearchParams();
    params.set('slug', slug);
    if (lang) params.set('lang', lang);
    const res = await fetch(`${API_BASE}/api/pages.php?${params.toString()}`, { credentials: 'include' });
    return (await res.json()) as { success: boolean; page_id?: number; sections?: CmsPageSectionsMap; error?: string };
  } catch {
    return { success: false, error: 'Failed to fetch page content.' };
  }
}

export type SavePageSectionPayload = {
  page_id: number;
  section_key: string;
  lang: string;
  content_type?: 'text' | 'html' | 'json';
  content: string | Record<string, unknown> | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
};

export async function savePageSection(payload: SavePageSectionPayload): Promise<{ success: boolean; section?: CmsPageSection; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/pages.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    return (await res.json()) as { success: boolean; section?: CmsPageSection; error?: string };
  } catch {
    return { success: false, error: 'Failed to save section.' };
  }
}

export async function deletePageSection(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/pages.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to delete section.' };
  }
}

// =========================================================================
// Redirects API
// =========================================================================

export type RedirectRule = {
  id: number;
  source_path: string;
  destination_url: string;
  status_code: number;
  is_active: boolean;
  hit_count: number;
};

export async function getRedirects(activeOnly?: boolean): Promise<{ success: boolean; redirects?: RedirectRule[]; error?: string }> {
  try {
    const params = new URLSearchParams();
    if (typeof activeOnly === 'boolean') params.set('active', activeOnly ? '1' : '0');
    const url = `${API_BASE}/api/redirects.php${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { credentials: 'include' });
    return (await res.json()) as { success: boolean; redirects?: RedirectRule[]; error?: string };
  } catch {
    return { success: false, error: 'Failed to fetch redirects.' };
  }
}

export async function saveRedirect(rule: Partial<RedirectRule>): Promise<{ success: boolean; redirect?: RedirectRule; error?: string }> {
  try {
    const method = rule.id ? 'PUT' : 'POST';
    const res = await fetch(`${API_BASE}/api/redirects.php`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(rule),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to save redirect.' };
  }
}

export async function deleteRedirect(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/redirects.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to delete redirect.' };
  }
}

// =========================================================================
// Users API (admin only)
// =========================================================================

export type AdminUser = {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
};

export async function getUsers(): Promise<{ success: boolean; users?: AdminUser[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/users.php`, { credentials: 'include' });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to fetch users.' };
  }
}

export async function saveUser(user: Partial<AdminUser> & { password?: string }): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const method = user.id ? 'PUT' : 'POST';
    const res = await fetch(`${API_BASE}/api/users.php`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to save user.' };
  }
}

export async function toggleUserActive(id: number, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/users.php?action=toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, is_active: isActive }),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to update user.' };
  }
}
