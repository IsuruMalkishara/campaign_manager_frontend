import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/NavbarComponent.css';
import { IconContext } from 'react-icons/lib';




export default function NavbarComponent() {

  const navigate = useNavigate();


  return (
    <>
      <IconContext.Provider value={{ color: 'rgb(0,0,0)' }}>
        
        <nav className={ 'nav-menu active' }>
          <ul className='nav-menu-items' style={{ marginTop:'70px' }}>
            
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