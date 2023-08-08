import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { BsFillGridFill, BsFillPeopleFill, BsFillPlayFill, BsFillPersonFill, BsBarChartFill, BsCollectionFill, BsBoxArrowRight } from 'react-icons/bs';
import '../styles/NavbarComponent.css';

export default function NavbarComponent() {
  const location = useLocation();

  const handleLogout = () => {
    console.warn('logout');
    sessionStorage.clear();
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column" style={{ marginTop:'15px',textAlign:'left',color:'rgb(255,255,255)' }}>
        <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsFillGridFill /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsFillPeopleFill /> Contacts
        </Nav.Link>
        <Nav.Link as={Link} to="/campaign" className={location.pathname === '/campaign' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsFillPlayFill /> Campaigns
        </Nav.Link>
        <Nav.Link as={Link} to="/sender" className={location.pathname === '/sender' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsFillPersonFill /> Senders
        </Nav.Link>
        <Nav.Link as={Link} to="/report" className={location.pathname === '/report' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsBarChartFill /> Reports
        </Nav.Link>
        <Nav.Link as={Link} to="/template" className={location.pathname === '/template' ? 'nav-link active' : 'nav-link'} style={{ color:'rgb(255,255,255)' }}>
          <BsCollectionFill /> Templates
        </Nav.Link>
        <Nav.Link  className={'nav-link'} onClick={handleLogout} style={{ color:'rgb(255,255,255)',marginTop:'300px' }}>
          <BsBoxArrowRight /> Logout
        </Nav.Link>
        
      </Nav>
    </div>
  );
}
