import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../service/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    // 添加页面刷新
    window.location.reload();
  };

  const logout = async () => {
    try {
      await authApi.logout(); // 调用后端登出接口
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload(); // 刷新页面
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken();
      if (response.code === 1 && response.data?.access_token) {
        setToken(response.data.access_token);
        return response.data.access_token;
      }
      throw new Error('Invalid refresh token response');
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    refreshToken,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);