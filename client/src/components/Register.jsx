import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function RegisterForm() {
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    notes: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    if (!event.target) {
      throw new Error('Event target is null');
    }
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, age, gender, location, notes } = formState;
    if (!name || !age || !gender || !location) {
      setRegistrationStatus('Please fill all required fields');
      return;
    }
    const url = API_BASE ? `${API_BASE}/api/register` : '/api/register';
    if (!API_BASE) {
      console.error('VITE_API_BASE is not defined. API requests may fail.');
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, gender, location, notes }),
      });
      if (response.ok) {
        setRegistrationStatus('Registered successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        const data = await response.json();
        setRegistrationStatus(data.error || 'Error registering');
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus('Network error. Data will be saved offline.');
      // TODO: Save to IndexedDB
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Register Lost Person
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <Input
            name="age"
            value={formState.age}
            onChange={handleInputChange}
            placeholder="Age"
            type="number"
            required
          />
          <Select
            name="gender"
            value={formState.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input
            name="location"
            value={formState.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <Textarea
            name="notes"
            value={formState.notes}
            onChange={handleInputChange}
            placeholder="Notes"
            rows={3}
          />
          <Button type="submit" color="blue">
            Register
          </Button>
        </form>
        {registrationStatus && (
          <p className="mt-6 text-center text-xl text-green-600 animate-pulse">
            {registrationStatus}
          </p>
        )}
      </div>
    </div>
  );
}
