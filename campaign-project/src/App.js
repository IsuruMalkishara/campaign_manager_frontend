
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';

function App() {
  return (
    <div >
      <Router>
          <div>
            <Routes>
              <Route path="/" element={<><SigninPage /></>} />
              <Route path="/signup" element={<><SignupPage /></>} />
              <Route path="/email-verification" element={<><EmailVerificationPage /></>} />
              <Route path="/phone-verification" element={<><PhoneVerificationPage /></>} />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
