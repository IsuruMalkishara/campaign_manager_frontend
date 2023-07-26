
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div >
      <Router>
          <div>
            <Routes>
              <Route path="/" element={<><SigninPage /></>} />
              <Route path="/signup" element={<><SignupPage /></>} />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
