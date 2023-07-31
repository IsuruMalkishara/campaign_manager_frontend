import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/phone-verification" element={<PhoneVerificationPage />} />
           
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/contact' element={<ContactsPage />} />
           
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
