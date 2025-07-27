import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, MockUser } from '@/types/admin-types';

interface AdminAuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleAdminMode: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Mock admin credentials
const MOCK_ADMIN = {
  email: 'admin@brainwave.com',
  password: 'admin123',
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('admin_auth');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user: null, isAuthenticated: false, isAdmin: false };
      }
    }
    return { user: null, isAuthenticated: false, isAdmin: false };
  });

  useEffect(() => {
    localStorage.setItem('admin_auth', JSON.stringify(authState));
  }, [authState]);

  const login = (email: string, password: string): boolean => {
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const user: MockUser = {
        id: '1',
        email,
        role: 'admin',
        plan: 'PREMIUM',
      };
      setAuthState({
        user,
        isAuthenticated: true,
        isAdmin: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  };

  const toggleAdminMode = () => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        isAdmin: !prev.isAdmin,
        user: prev.user ? { ...prev.user, role: !prev.isAdmin ? 'admin' : 'user' } : null,
      }));
    }
  };

  return (
    <AdminAuthContext.Provider value={{
      ...authState,
      login,
      logout,
      toggleAdminMode,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};