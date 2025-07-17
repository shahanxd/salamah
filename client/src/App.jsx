import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Search from './components/Search';
import AuthForm from './components/AuthForm';
import './index.css';

function AuthGate({ children }) {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  if (!authed) return <AuthForm onAuth={() => { setAuthed(true); navigate('/home'); }} />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm onAuth={() => window.location.href='/home'} />} />
        <Route path="/home" element={
          <AuthGate>
            <Home />
          </AuthGate>
        } />
        <Route path="/register" element={
          <AuthGate>
            <Register />
          </AuthGate>
        } />
        <Route path="/search" element={
          <AuthGate>
            <Search />
          </AuthGate>
        } />
      </Routes>
    </Router>
  );
}