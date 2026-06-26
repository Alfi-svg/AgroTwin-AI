import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type User = { name: string; email: string; role: string } | null;
interface AuthContextValue {
  user: User;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'agrotwin-demo-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as User : null;
  });

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: (email: string) => {
      const next = { name: email.split('@')[0] || 'Demo Operator', email, role: 'Storage Intelligence Lead' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setUser(next);
    },
    signup: (name: string, email: string) => {
      const next = { name: name || 'AgroTwin User', email, role: 'Founder Demo Workspace' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setUser(next);
    },
    logout: () => {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
