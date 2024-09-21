import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddData from './AddData.js';
import ShowDetails from './ShowDetails.js';
import Requests from './Requests.js';
import Logout from '../Login/Logout.js';
import style from '../Styles/userDashboard.module.css';

function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState(''); // State to track which component to show
  const navigate = useNavigate();

  const handleComponentChange = (component) => {
    setActiveComponent(component); // Set the active component based on button clicked
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className={style.userpage}>
      
      <nav className={style.navbar}>
        <button onClick={handleHomeClick}>Home</button>
        <div><Logout /></div>
      </nav>
      
      <div className={style.content}>
        {/* Sidebar for buttons */}
        <div className={style.sidebar}>
          <button onClick={() => handleComponentChange('add')} className={style.button}>Add</button>
          <button onClick={() => handleComponentChange('view')} className={style.button}>View/Remove</button>
          <button onClick={() => handleComponentChange('requests')} className={style.button}>Requests</button>
        </div>

        {/* Main content area */}
        <div className={style.maincontent}>
          {activeComponent === 'add' && <AddData />}
          {activeComponent === 'view' && <ShowDetails />}
          {activeComponent === 'requests' && <Requests />}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
