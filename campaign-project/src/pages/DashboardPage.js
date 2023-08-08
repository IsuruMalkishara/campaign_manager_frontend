import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

const DashboardPage = () => {

 
      

      
    

  return (
    <div className='dashboard'>
    
    <div className='row'>
          <div className='col-2' style={{ textAlign:'center' }}>
       <div className='navbar-container'>
        <NavbarComponent />
      </div>
      </div>
      <div  className='col-10'>
      Dashboard page
      </div>
      </div>
            
            
    </div>
  );
};

export default DashboardPage;
