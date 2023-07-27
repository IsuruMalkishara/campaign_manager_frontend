import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles/SignupPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError('Name is required.');
      return;
    }

    if (!email) {
      setError('Email Address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid Email Address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }

    if (!confirmPassword) {
      setError('Confirm Password is required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Confirm Password should match with Password.');
      return;
    }

    try {
      const data = {
        "name": name,
        "email": email,
        "password": password
      };

      console.warn(data);

      UserService.signup(data).then(res=>{
        console.warn(res.data);

        if (res.data.status === 'SUCCESS') {
          // If signup is successful, navigate to the email verification page
          // and pass the data object as state
          navigate('/email-verification', { state: { userData: data } });
        }
      })
      
    } catch (error) {
      console.error('Error', error);
    }
  };

  // Email validation using regex
  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleGoogleSignIn = async (googleUser) => {};

  return (
    <div className='signup'>
      <Card className='signup-card'>
        <Card.Body>
          <div className='row'>
            <div className='col-7'>
              <div className='row'>
                <div className='col' style={{ marginTop: '140px' }}>
                  <h1>Campaign Manager</h1>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row' style={{ margin: '20px' }}>
                <div className='col' style={{ textAlign: 'center' }}>
                  <h5>Create your free account here</h5>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='google-login-container'>
                  <GoogleLogin
                    clientId='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'
                    buttonText='Signin with Google'
                    onSuccess={handleGoogleSignIn}
                    onFailure={(error) =>
                      console.error('Google Sign-In Error:', error)
                    }
                    className='google-login-btn'
                  />
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='col'>
                  <h5>or</h5>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='signup-form'>
                  
                  <Form onSubmit={handleSignup}>
                    <Form.Control
                      type='text'
                      placeholder='Enter Your Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ margin: '10px', textAlign: 'center', width: '300px' }}
                    />
                    {error && error.includes('Name') && (
                      <Alert variant='danger' style={{  textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Name field */}
                    <Form.Control
                      type='text'
                      placeholder='Enter Your Email Address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ margin: '10px', textAlign: 'center', width: '300px' }}
                    />
                    {error && error.includes('Email') && (
                      <Alert variant='danger' style={{ textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Email field */}
                    <Form.Control
                      type='password'
                      placeholder='Enter Your Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ margin: '10px', textAlign: 'center', width: '300px' }}
                    />
                    {error && error.includes('Password') && !error.includes('Confirm') &&(
                      <Alert variant='danger' style={{  textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Password field */}
                    <Form.Control
                      type='password'
                      placeholder='Enter Your Password Again'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ margin: '10px', textAlign: 'center', width: '300px' }}
                    />
                    {error && error.includes('Confirm Password') && (
                      <Alert variant='danger' style={{  textAlign: 'center', marginLeft: '10px'}}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Confirm Password field */}
                    <Button type='submit' className='signup-btn'>
                      Signup
                    </Button>
                  </Form>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <p>
                  Already a member?{' '}
                  <Link to='/'>Signin Here</Link>
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignupPage;
