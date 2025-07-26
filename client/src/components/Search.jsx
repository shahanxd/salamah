import { useState } from 'react';

export default function SearchBeneficiaries() {
  const [filters, setFilters] = useState({
    name: '',
    minAge: '',
    maxAge: '',
    gender: '',
    location: '',
  });
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchBeneficiaries = async (params) => {
    try {
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      setStatusMessage('Network error. Cannot search.');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    fetchBeneficiaries(params);
  };

  return (
    <div className="card fade-in container" style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--card)' }}>
      <h2 style={{ fontFamily: 'JetBrains Mono Variable', fontWeight: 700, fontSize: 32, color: 'var(--primary)', marginBottom: 24 }}>
        Search Beneficiaries
      </h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="fade-in"
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            name="minAge"
            type="number"
            placeholder="Min Age"
            value={filters.minAge}
            onChange={handleFilterChange}
            className="fade-in"
            style={{ flex: 1 }}
          />
          <input
            name="maxAge"
            type="number"
            placeholder="Max Age"
            value={filters.maxAge}
            onChange={handleFilterChange}
            className="fade-in"
            style={{ flex: 1 }}
          />
        </div>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
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
          value={filters.location}
          onChange={handleFilterChange}
          className="fade-in"
        />
        <button
          type="submit"
          className="btn fade-in"
          style={{ marginTop: 8 }}
        >
          Search
        </button>
      </form>
      {statusMessage && (
        <p style={{ marginTop: 16, color: 'var(--primary)', fontWeight: 500 }}>
          {statusMessage}
        </p>
      )}
      <div style={{ marginTop: 32 }}>
        {beneficiaries.length === 0 ? (
          <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            No results yet.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {beneficiaries.map((b) => (
              <li
                key={b._id}
                className="card fade-in"
                style={{ marginBottom: 16, padding: '1.5rem', textAlign: 'left', background: 'var(--card)' }}
              >
                <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--primary)' }}>
                  {b.name}
                </div>
                <div style={{ fontSize: 16, color: 'var(--foreground)', opacity: 0.8 }}>
                  Age: {b.age} | Gender: {b.gender} | Location: {b.location}
                </div>
                {b.notes && (
                  <div style={{ fontSize: 15, color: 'var(--primary)', marginTop: 8 }}>
                    {b.notes}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
