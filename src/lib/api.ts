/**
 * Base URL for the PHP API (e.g. on Hostinger: same origin, so leave empty or set in .env).
 * VITE_API_BASE_URL - optional; if not set, uses same origin (relative /api/...).
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';

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

/** Auth: login with username + password. Backend returns token (JWT) or session cookie. */
export type AuthLoginPayload = { username: string; password: string };

export type AuthLoginResponse =
  | { success: true; token?: string; user?: { username: string } }
  | { success: false; error: string };

const AUTH_STORAGE_KEY = 'dashboard_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (token) localStorage.setItem(AUTH_STORAGE_KEY, token);
  else localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function loginAuth(payload: AuthLoginPayload): Promise<AuthLoginResponse> {
  const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
  const res = await fetch(`${API_BASE}/api/auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as AuthLoginResponse;
  if (!res.ok) {
    return { success: false, error: (data as { error?: string }).error || 'Login failed. Please try again.' };
  }
  if (!data.success) {
    return { success: false, error: (data as { error?: string }).error || 'Invalid credentials.' };
  }
  return data;
}
