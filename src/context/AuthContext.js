import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (token && role) {
      setAuth({ token });
      setRole(role);
      setIsAdmin(isAdmin);
    } else {
      setAuth({ token: null });
      setRole(null);
      setIsAdmin(false);
    }
  }, []);

  const login = (token, userRole, adminStatus) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('isAdmin', adminStatus.toString());
    setAuth({ token });
    setRole(userRole);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isAdmin');
    setAuth({ token: null });
    setRole(null);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
