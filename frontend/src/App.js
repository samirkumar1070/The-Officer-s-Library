import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Adminpage from './components/Adminpage/Adminpage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="" element={<Adminpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
