import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
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
          setError('');
          navigate('/phone-verification', { state: { userData: data } });
        }else{
          setError('Invalid Verification Code');
        }
      }).catch(error => {
       
        setError('Invalid Verification Code');
        console.error('Error', error);
      });
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
<div style={{ display: 'flex', justifyContent: 'center' ,width: '450px',}}>
      <OtpInput
        value={code}
        onChange={setCode}
        numInputs={5}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: '56px', // Increase the width of each input box
          height: '56px', // You can adjust the height as needed
          fontSize: '24px', // Increase the font size for larger digits
          margin: '0 5px', // Add some space between input boxes
          borderRadius: '5px', // Optionally, add rounded corners to the input boxes
          border: '1px solid #ccc', // Optionally, add a border around the input boxes
          textAlign: 'center', // Center the text inside the input boxes
        }}
      />
    </div>

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