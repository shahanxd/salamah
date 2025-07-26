import { useState } from 'react';

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('General');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';
    const payload = mode === 'signup' ? { ...form, role } : { email: form.email, password: form.password, role };
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        setStatus('Success! Redirecting...');
        setTimeout(() => onAuth(), 1000);
      } else {
        setStatus(data.error || 'Error');
      }
    } catch {
      setStatus('Network error.');
    }
  };

  return (
    <div className="card fade-in container" style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--card)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={() => setMode('login')} className="btn" style={{ background: mode==='login' ? 'var(--primary)' : 'var(--secondary)', color: mode==='login' ? '#fff' : 'var(--foreground)', marginRight: 8 }}>Login</button>
        <button onClick={() => setMode('signup')} className="btn" style={{ background: mode==='signup' ? 'var(--primary)' : 'var(--secondary)', color: mode==='signup' ? '#fff' : 'var(--foreground)' }}>Sign Up</button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {mode === 'signup' && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="fade-in" />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="fade-in" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="fade-in" />
        <select name="role" value={role} onChange={e => setRole(e.target.value)} className="fade-in">
          <option value="General">General</option>
          <option value="NGO">NGO</option>
        </select>
        <button type="submit" className="btn fade-in" style={{ marginTop: 8 }}> {mode === 'login' ? 'Login' : 'Sign Up'} </button>
      </form>
      {status && <p style={{ marginTop: 16, color: status.includes('Success') ? 'var(--primary)' : 'var(--foreground)', fontWeight: 500 }}>{status}</p>}
    </div>
  );
}
