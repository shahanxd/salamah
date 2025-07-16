import { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

export default function Search() {
  const [filters, setFilters] = useState({ name: '', minAge: '', maxAge: '', gender: '', location: '' });
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async e => {
    e.preventDefault();
    setStatus('');
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
    try {
      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setStatus('Network error. Cannot search.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Search</h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input name="name" value={filters.name} onChange={handleChange} placeholder="Name" />
          <Input name="minAge" value={filters.minAge} onChange={handleChange} placeholder="Min Age" type="number" />
          <Input name="maxAge" value={filters.maxAge} onChange={handleChange} placeholder="Max Age" type="number" />
          <Select name="gender" value={filters.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input name="location" value={filters.location} onChange={handleChange} placeholder="Location" />
          <Button type="submit" color="green" className="col-span-1 md:col-span-2">Search</Button>
        </form>
        {status && <p className="mt-6 text-center text-xl text-red-600 animate-pulse">{status}</p>}
        <div className="mt-8">
          {results.length > 0 ? (
            <ul className="space-y-6">
              {results.map(b => (
                <li key={b._id} className="p-6 rounded-xl border border-gray-200 bg-gray-50 shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{b.name}</span>
                      <span className="ml-4 text-xl text-gray-600">({b.age}, {b.gender})</span>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-lg font-semibold ${b.isFound ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{b.isFound ? 'Found' : 'Missing'}</span>
                  </div>
                  <div className="mt-2 text-lg text-gray-700">Location: <span className="font-semibold">{b.location}</span></div>
                  {b.notes && <div className="mt-2 text-lg text-gray-500">Notes: {b.notes}</div>}
                  <div className="mt-2 text-sm text-gray-400">Registered: {new Date(b.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-xl text-center">No results found.</p>}
        </div>
      </div>
    </div>
  );
}
