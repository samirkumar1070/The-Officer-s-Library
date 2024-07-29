import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Userpage from './components/Userpage/Userpage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="" element={<Userpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
