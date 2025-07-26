import { useState } from 'react';
import Button from './Button';

const API_BASE = import.meta.env.VITE_API_BASE;

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
    const url = API_BASE ? `${API_BASE}${endpoint}` : endpoint;
    if (!API_BASE) {
      console.error('VITE_API_BASE is not defined. API requests may fail.');
    }
    const payload = mode === 'signup' ? { ...form, role } : { email: form.email, password: form.password, role };
    try {
      const res = await fetch(url, {
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
    <div className="w-full max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-center mb-6">
        <button onClick={() => setMode('login')} className={`px-6 py-2 rounded-l-xl text-xl font-bold ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Login</button>
        <button onClick={() => setMode('signup')} className={`px-6 py-2 rounded-r-xl text-xl font-bold ${mode === 'signup' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Sign Up</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-4 text-xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        )}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-4 text-xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="w-full p-4 text-xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold">Role:</label>
          <select name="role" value={role} onChange={e => setRole(e.target.value)} className="p-2 rounded border border-gray-300">
            <option value="General">General</option>
            <option value="NGO">NGO</option>
          </select>
        </div>
        <Button type="submit" color={mode === 'signup' ? 'green' : 'blue'}>{mode === 'signup' ? 'Sign Up' : 'Login'}</Button>
      </form>
      {status && <p className="mt-6 text-center text-lg text-red-600 animate-pulse">{status}</p>}
    </div>
  );
}
