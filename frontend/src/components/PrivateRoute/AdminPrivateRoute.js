// src/components/AdminPrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminPrivateRoute = () => {
  const isAuthenticated = Cookies.get('adminAccessToken'); // Check if the admin access token is present

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AdminPrivateRoute;
