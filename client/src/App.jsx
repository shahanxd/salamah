import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home';
import Register from './components/Register';
import Search from './components/Search';
import AuthForm from './components/AuthForm';
import About from './components/About';
import Contact from './components/Contact';
import './index.css';

function AuthGate({ children }) {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  if (!authed) return <AuthForm onAuth={() => { setAuthed(true); navigate('/home'); }} />;
  return children;
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'Inter Variable, JetBrains Mono Variable, sans-serif' }}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AuthForm onAuth={() => window.location.href='/home'} />} />
            <Route path="/home" element={
              <AuthGate>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                  <Home />
                </motion.div>
              </AuthGate>
            } />
            <Route path="/register" element={
              <AuthGate>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                  <Register />
                </motion.div>
              </AuthGate>
            } />
            <Route path="/search" element={
              <AuthGate>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                  <Search />
                </motion.div>
              </AuthGate>
            } />
            <Route path="/about" element={
              <AuthGate>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                  <About />
                </motion.div>
              </AuthGate>
            } />
            <Route path="/contact" element={
              <AuthGate>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                  <Contact />
                </motion.div>
              </AuthGate>
            } />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}