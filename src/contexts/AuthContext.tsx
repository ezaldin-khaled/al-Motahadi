import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getStoredToken,
  setStoredToken,
  loginAuth,
  logoutAuth,
  getAuthMe,
  type AuthLoginPayload,
  type AuthUser,
} from '../lib/api';

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: AuthLoginPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const stored = getStoredToken();
      if (stored) {
        const meRes = await getAuthMe();
        if (meRes.success && meRes.user) {
          setToken(stored);
          setUser(meRes.user);
        } else {
          setStoredToken(null);
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (payload: AuthLoginPayload) => {
    const res = await loginAuth(payload);
    if (res.success) {
      const value = res.token ?? 'session';
      setStoredToken(value);
      setToken(value);
      setUser(res.user ?? null);
      return { success: true };
    }
    return { success: false, error: res.error ?? 'Login failed.' };
  }, []);

  const logout = useCallback(async () => {
    await logoutAuth();
    setStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
