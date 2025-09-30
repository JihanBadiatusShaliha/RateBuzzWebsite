import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants/users';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const item = window.sessionStorage.getItem('currentUser');
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  const login = (email: string) => {
    // In a real app, this would be an API call.
    // For this demo, we find the first user to log in.
    const userToLogin = MOCK_USERS[0];
    setCurrentUser(userToLogin);
     try {
      window.sessionStorage.setItem('currentUser', JSON.stringify(userToLogin));
    } catch (e) {
        console.error("Could not write to sessionStorage", e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
        window.sessionStorage.removeItem('currentUser');
    } catch (e) {
        console.error("Could not remove from sessionStorage", e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};