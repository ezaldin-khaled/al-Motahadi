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
  status: 'draft' | 'published';
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
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

export async function getBlogPosts(filters?: { status?: string; category?: string }): Promise<BlogListResponse> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.category) params.set('category', filters.category);
    const url = `${API_BASE}/api/blog.php${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url, { credentials: 'include' });
    return (await res.json()) as BlogListResponse;
  } catch {
    return { success: false, error: 'Failed to fetch posts.' };
  }
}

export async function getBlogPost(id: number | string): Promise<BlogSingleResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/blog.php?id=${id}`, { credentials: 'include' });
    return (await res.json()) as BlogSingleResponse;
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
