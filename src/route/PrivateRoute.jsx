// src/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 假设你有一个认证上下文

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // 如果用户未登录，重定向到登录页面
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 如果用户已登录，渲染子路由
  return <Outlet />;
};

export default PrivateRoute;