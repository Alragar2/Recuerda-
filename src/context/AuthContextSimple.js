import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      console.log('🔍 Login attempt with:', { email, password: '***' });
      
      const response = await fetch('http://192.168.0.231:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      console.log('📡 Login response:', { status: response.status, success: data.success });
      
      if (response.ok && data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        console.log('✅ Login successful for user:', data.user.email);
        return data;
      } else {
        console.log('❌ Login failed:', data.message);
        throw new Error(data.message || 'Error en login');
      }
    } catch (error) {
      console.error('❌ Login error:', error.message);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      console.log('� Register attempt with:', { 
        name: userData.name, 
        email: userData.email, 
        password: '***',
        confirmPassword: '***'
      });
      
      const response = await fetch('http://192.168.0.231:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      console.log('📡 Register response:', { status: response.status, success: data.success });
      
      if (response.ok && data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        console.log('✅ Registration successful for user:', data.user.email);
        return data;
      } else {
        console.log('❌ Registration failed:', data.message);
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.message).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Error en registro');
      }
    } catch (error) {
      console.error('❌ Register error:', error.message);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🔍 Logging out user:', user?.email);
      setUser(null);
      setIsAuthenticated(false);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
