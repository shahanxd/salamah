import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, gender: gender.toLowerCase(), location, notes }),
      });
      if (response.ok) {
        setRegistrationStatus('Registered successfully!');
        setTimeout(() => navigate('/home'), 1500);
      } else {
        const data = await response.json();
        setRegistrationStatus(data.error || 'Error registering');
      }
    } catch (error) {
      setRegistrationStatus('Network error. Data will be saved offline.');
    }
  };

  return (
    <div className="card fade-in container" style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--card)' }}>
      <h2 style={{ fontFamily: 'JetBrains Mono Variable', fontWeight: 700, fontSize: 32, color: 'var(--primary)', marginBottom: 24 }}>
        Register Lost Person
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleInputChange}
          required
          className="fade-in"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formState.age}
          onChange={handleInputChange}
          required
          className="fade-in"
        />
        <select
          name="gender"
          value={formState.gender}
          onChange={handleInputChange}
          required
          className="fade-in"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="location"
          placeholder="Location"
          value={formState.location}
          onChange={handleInputChange}
          required
          className="fade-in"
        />
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formState.notes}
          onChange={handleInputChange}
          rows={3}
          className="fade-in"
        />
        <button type="submit" className="btn fade-in" style={{ marginTop: 8 }}>
          Register
        </button>
      </form>
      {registrationStatus && (
        <p
          style={{
            marginTop: 16,
            color: registrationStatus.includes('success') ? 'var(--primary)' : 'var(--foreground)',
            fontWeight: 500,
          }}
        >
          {registrationStatus}
        </p>
      )}
    </div>
  );
}
