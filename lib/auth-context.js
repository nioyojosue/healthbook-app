'use client';

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient', // 'patient' | 'doctor' | 'hospital' | 'admin'
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  });

  const login = (email, password, role) => {
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      role,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
