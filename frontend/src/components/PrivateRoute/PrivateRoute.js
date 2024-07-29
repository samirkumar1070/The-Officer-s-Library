import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const isAuthenticated = Cookies.get('accessToken'); //!!localStorage.getItem('token') ; // Check if the token is in local storage
  console.log("Token:", Cookies.get('accessToken'));
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
