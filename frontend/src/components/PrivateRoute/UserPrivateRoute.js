import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserPrivateRoute = () => {
  const isAuthenticated = Cookies.get('userAccessToken'); //!!localStorage.getItem('token') ; // Check if the token is in local storage
  // console.log("Token:", Cookies.get('userAccessToken'));
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default UserPrivateRoute;
