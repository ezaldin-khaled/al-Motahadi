import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredToken, setStoredToken, loginAuth, type AuthLoginPayload } from '../lib/api';

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: AuthLoginPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredToken();
    setToken(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (payload: AuthLoginPayload) => {
    const res = await loginAuth(payload);
    if (res.success) {
      const value = res.token ?? 'session';
      setStoredToken(value);
      setToken(value);
      return { success: true };
    }
    return { success: false, error: res.error ?? 'Login failed.' };
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }),
    [token, isLoading, login, logout]
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
