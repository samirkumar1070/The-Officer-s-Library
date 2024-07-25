import React,{useState} from 'react'
import AddData from './AddData.js'
import ShowDetails from './ShowDetails.js';
import Logout from '../Login/Logout.js';
import '../Styles/admin.css';


function Adminpage() {

  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);

  const handleClick1 = () => {
    setShowComponent1(!showComponent1);
  }
  const handleClick2 = () => {
    setShowComponent2(!showComponent2);
  }

  return (
    <div className='adminpage'>
        <div><Logout/></div>
        <div>
        <ul className='l1'>
            <li>
                <div>
                 <button onClick={handleClick1}>Add</button>
                 {showComponent1 && <AddData />}
                 </div>
            </li>
            <li>|</li>
            <li>
                 <div>
                 <button onClick={handleClick2}>View/Remove</button>
                 {showComponent2 && <ShowDetails />}
                 </div>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Adminpage
