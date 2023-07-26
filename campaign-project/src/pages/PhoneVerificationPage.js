import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import UserService from '../services/UserService';
import '../styles/PhoneVerificationPage.css';

export default function PhoneVerificationPage() {
  const location=useLocation();

  const userData=location.state.userData;

  const [phone,setPhone]=useState('');
  const [code, setCode] = useState('');
  const [error,setError]=useState('');
  const [isVerificationcodeSend,setVerificationCodeSend]=useState(false);
  

  const navigate = useNavigate();

  //enter phone number
  const sendOtp = (e) => {
    e.preventDefault();

    if (!phone ) {
      setError('Please enter verification code');
      return;
    }else if (!validatePhoneNumber(phone)) {
        setError('Invalid Contact Number.');
          return;
      }else{
      const data = {
        "name": userData.name,
        "email": userData.email,
        "password": userData.password,
        "emailOtp":userData.emailOtp,
        "phoneNumber":phone
      };
      console.warn(data);
      UserService.addPhone(data).then(res=>{
        console.warn(res.data);
        if (res.data.status === 'SUCCESS') {
          
          setVerificationCodeSend(true);
        }
      })
    }


    
  };

  
  //contact number validation
const validatePhoneNumber = (phone) => {
    const phoneNumberRegex = /^94\d{9}$/; // Regex pattern: Starts with 94 and followed by 9 digits
  
    return phoneNumberRegex.test(phone);
  };


  //verify phone number

  const verifyPhone = (e) => {
    e.preventDefault();

    if (!code ) {
      setError('Please enter verification code');
      return;
    }else{
      const data = {
        "name": userData.name,
        "email": userData.email,
        "password": userData.password,
        "emailOtp":userData.emailOtp,
        "phoneNumber":phone,
        "phoneNumberOtp":code
      };
      console.warn(data);
      UserService.verifyPhone(data).then(res=>{
        console.warn(res.data);
        if (res.data.status === 'SUCCESS') {
          
          navigate('/');
        }
      })
    }


    
  };

  const resendCode=()=>{

  }

  return (
    <div className='verification'>
        <div>
        {/* card for add phone number */}
        <div className='row'>
        <Card className='phone-number-card'>
        <Card.Body>
       
          
          <h3 className='label' style={{ marginTop:'10px' }}>Let's enter your phone number</h3>
          <Form >
            <Form.Group  style={{ marginTop:'30px' }}>
             
              <Form.Control
                className='input'
                type='text'
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                style={{ textAlign:'center' }}
              />
               {error && <Alert variant='danger'>{error}</Alert>} {/* Display error message */}
            </Form.Group>
<div className='row'>
         <div className='col' style={{ marginTop:'20px',textAlign:'center' }}>
              <Button className='resend-btn' variant='primary' type='submit' onClick={sendOtp}>
              Send OTP
            </Button>
            </div>

</div>
                 
          </Form>
        </Card.Body>
      </Card>
      </div>

      {/* verification card */}
      <div className='row'>{isVerificationcodeSend &&
      <Card className='verification-card'>
        <Card.Body>
       
          
          <h3 className='label' style={{ marginTop:'10px' }}>Let's verify your email</h3>
          <Form >
            <Form.Group  style={{ marginTop:'30px' }}>
              <Form.Label className='label'>Please enter the code you received to your mobile
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
              <Button className='verification-btn' variant='primary' type='submit' onClick={verifyPhone}>
              Verify
            </Button>
            </div>
</div>
                 
          </Form>
        </Card.Body>
      </Card>
}
      </div>
      </div>
    </div>
  );
}