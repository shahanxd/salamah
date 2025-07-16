import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';

export default function Register() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', location: '', notes: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Registered successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setStatus(data.error || 'Error registering');
      }
    } catch {
      setStatus('Network error. Data will be saved offline.');
      // TODO: Save to IndexedDB
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Register Lost Person</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <Input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" required />
          <Select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
          <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" rows={3} />
          <Button type="submit" color="blue">Register</Button>
        </form>
        {status && <p className="mt-6 text-center text-xl text-green-600 animate-pulse">{status}</p>}
      </div>
    </div>
  );
}
