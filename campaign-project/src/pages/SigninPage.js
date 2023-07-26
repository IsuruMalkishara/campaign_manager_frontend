import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button,Card,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles/SigninPage.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
        const data={
            "username":email,
            "password":password
        }
     UserService.signin(data).then(res=>{
        console.warn(res.data);
     })
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleGoogleSignIn = async (googleUser) => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      UserService.googlesignin(googleUser).then(res=>{
        const data =res.data;

      if (data.success) {
        // User signed in successfully, do something here (e.g., redirect to a dashboard)
        console.log('Login successful');
      } else {
        // Handle failed authentication
        console.error('Error signing in with Google:', data.message);
      }
      })
      

      
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className='signin'>
        
          <Card className='signin-card'>
            <Card.Body>
          <div className='row'>
            <div className='col-7'>
              <div className='row'>
                <div className='col' style={{ marginTop:'140px' }}>
                  <h1>Welcome</h1>
                  <h4>to the</h4>
                  <h1>Campaign Manager</h1>
                </div>
              </div>
            </div>
            <div className='col-5'>
            <div className='row' style={{ margin:'20px' }}>

              <div className='col' style={{ textAlign:'center' }}>
                <h3>Login Here</h3>
              </div>
            </div>
              <div className='row' style={{ margin:'20px' }}>
              <div className='google-login-container'>
              <GoogleLogin
                clientId='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'
                buttonText='Signin with Google'
                onSuccess={handleGoogleSignIn}
                onFailure={(error) => console.error('Google Sign-In Error:', error)}
                className='google-login-btn'
              />
            </div>
              </div>
              <div className='row' style={{ margin:'20px' }}>
                <div className='col'>
                  <h5>or</h5>
                </div>
              </div>
              <div className='row' style={{ margin:'20px' }}>
                <div className='signin-form'>
              <Form onSubmit={handleEmailSignIn}>
        <Form.Control
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin:'10px',textAlign:'center',width:'300px' }}
        />
        <Form.Control
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin:'10px',textAlign:'center',width:'300px' }}
        />
        <Button type="submit" className='signin-btn'>Signin</Button>
      </Form>
      </div>
              </div>
              <div className='row' style={{ margin:'20px' }}>
            <p>
              No account yet?{' '}
              <Link to='/signup'>Sign up for free</Link>
            </p>
          </div>
            </div>
      
    
      </div>
      </Card.Body>
      </Card>
      
    </div>
  );
};

export default SigninPage;
