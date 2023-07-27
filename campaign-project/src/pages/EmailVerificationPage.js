import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import UserService from '../services/UserService';
import '../styles/EmailVerificationPage.css';

export default function EmailVerificationPage() {
  const location=useLocation();

  const userData=location.state.userData;

  const [code, setCode] = useState('');
  const [error,setError]=useState('');
  

  const navigate = useNavigate();

  const verifyEmail = (e) => {
    e.preventDefault();

    if (!code ) {
      setError('Please enter verification code');
      return;
    }else{
      const data = {
        "name": userData.name,
        "email": userData.email,
        "password": userData.password,
        "emailOtp":code
      };
      console.warn(data);
      UserService.verifyEmail(data).then(res=>{
        console.warn(res.data);
        if (res.data.status === 'SUCCESS') {
          
          navigate('/phone-verification', { state: { userData: data } });
        }
      })
    }


    
  };

  const resendCode=()=>{

  }

  return (
    <div className='verification'>
      <Card className='verification-card'>
        <Card.Body>
       
          
          <h3 className='label' style={{ marginTop:'10px' }}>Let's verify your email</h3>
          <Form >
            <Form.Group  style={{ marginTop:'30px' }}>
              <Form.Label className='label'>Please enter the code you received to your email
</Form.Label>
              <Form.Control
                className='input'
                type='text'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                style={{ textAlign:'center' }}
              />
               {error && <Alert variant='danger'>{error}</Alert>} {/* Display error message */}
            </Form.Group>
<div className='row'>
         <div className='col' style={{ marginTop:'20px',textAlign:'center' }}>
              <Button className='resend-btn' variant='primary' type='submit' onClick={resendCode}>
              Resend
            </Button>
            </div>
            <div className='col' style={{ marginTop:'20px',textAlign:'center' }}>'
              <Button className='verification-btn' variant='primary' type='submit' onClick={verifyEmail}>
              Verify
            </Button>
            </div>
</div>
                 
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}