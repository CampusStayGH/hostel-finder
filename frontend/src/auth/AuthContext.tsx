import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type UserRole = 'user' | 'admin';

export interface SessionUser {
  email: string;
  name: string;
  role: UserRole;
}

export interface SavedHostel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerYear: number;
  currency: string;
  image: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  savedHostels: SavedHostel[];
  signIn: (email: string, password: string, role?: UserRole) => void;
  signOut: () => void;
  toggleSavedHostel: (hostel: SavedHostel) => void;
  isSaved: (id: string) => boolean;
}

const SESSION_KEY = 'hostelscout-session';
const SAVED_KEY = 'hostelscout-saved';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => readStorage(SESSION_KEY, null));
  const [savedHostels, setSavedHostels] = useState<SavedHostel[]>(() => readStorage(SAVED_KEY, []));

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedHostels));
  }, [savedHostels]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    savedHostels,
    signIn: (email, _password, role = 'user') => {
      setUser({ email, role, name: role === 'admin' ? 'Administrator' : email.split('@')[0] });
    },
    signOut: () => setUser(null),
    toggleSavedHostel: (hostel) => {
      setSavedHostels((current) =>
        current.some((item) => item.id === hostel.id)
          ? current.filter((item) => item.id !== hostel.id)
          : [...current, hostel],
      );
    },
    isSaved: (id) => savedHostels.some((hostel) => hostel.id === id),
  }), [user, savedHostels]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
