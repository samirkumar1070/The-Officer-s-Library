import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.js';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.js';
import UserDashboard from './components/UserDashboard/UserDashboard.js';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute.js';
import UserPrivateRoute from './components/PrivateRoute/UserPrivateRoute.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
        <Route path="/user" element={<UserPrivateRoute />}>
          <Route path="" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
