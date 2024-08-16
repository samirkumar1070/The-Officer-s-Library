import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddData from './AddData.js';
import ShowDetails from './ShowDetails.js';
import Logout from '../Login/Logout.js';
import '../Styles/showDetails.css';

function UserDashboard() {
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const navigate = useNavigate();

  const handleClick1 = () => {
    setShowComponent1(!showComponent1);
  };

  const handleClick2 = () => {
    setShowComponent2(!showComponent2);
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className='userpage'>
      <nav className='navbar'>
        <button onClick={handleHomeClick}>Home</button>
        <div ><Logout /></div>
      </nav>
      <div className='component-block'>
        <ul className='l1'>
          <li>
            <div>
              <button onClick={handleClick1} className='button'>Add</button>
              {showComponent1 && <AddData />}
            </div>
          </li>
          <li>|</li>
          <li>
            <div>
              <button onClick={handleClick2} className='button'>View/Remove</button>
              {showComponent2 && <ShowDetails />}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
