import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';  // ✅ CORRECTO

export const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {}
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const current = authService.getCurrentUser();
    if (current) setUser(current);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await authService.login({ username, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
