import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/NavbarComponent.css';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';



export default function NavbarComponent() {

  const navigate = useNavigate();
  
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);




  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
          
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
            
            
            <li  className='nav-text'>
                  <Link to={'/dashboard'}>
                    <span>Dashboard</span>
                  </Link>
            </li>
            <li  className='nav-text'>
                  <Link to={'/contact'}>
                    <span>Contacts</span>
                  </Link>
            </li>
            <li  className='nav-text'>
                  <Link to={'/campaign'}>
                    <span>Campaigns</span>
                  </Link>
            </li>
            <li  className='nav-text'>
                  <Link to={'/sender'}>
                    <span>Senders</span>
                  </Link>
            </li>
            <li  className='nav-text'>
                  <Link to={'/report'}>
                    <span>Reports</span>
                  </Link>
            </li>
            <li  className='nav-text'>
                  <Link to={'/template'}>
                    <span>Templates</span>
                  </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
  
}