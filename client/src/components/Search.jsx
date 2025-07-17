import { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      setStatusMessage('Network error. Cannot search.');
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    fetchBeneficiaries(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setStatusMessage('');
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    fetchBeneficiaries(params);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Search Beneficiaries
        </h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Name"
          />
          <Input
            name="minAge"
            value={filters.minAge}
            onChange={handleFilterChange}
            placeholder="Min Age"
            type="number"
          />
          <Input
            name="maxAge"
            value={filters.maxAge}
            onChange={handleFilterChange}
            placeholder="Max Age"
            type="number"
          />
          <Select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Location"
          />
          <Button
            type="submit"
            color="green"
            className="col-span-1 md:col-span-2"
          >
            Search
          </Button>
        </form>
        {statusMessage && (
          <p className="mt-6 text-center text-xl text-red-600 animate-pulse">
            {statusMessage}
          </p>
        )}
        <div className="mt-8">
          {beneficiaries.length > 0 ? (
            <ul className="space-y-6">
              {beneficiaries.map((beneficiary) => (
                <li key={beneficiary._id} className="p-6 rounded-xl border border-gray-200 bg-gray-50 shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {beneficiary.name}
                      </span>
                      <span className="ml-4 text-xl text-gray-600">
                        ({beneficiary.age}, {beneficiary.gender})
                      </span>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-lg font-semibold ${beneficiary.isFound ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}
                    >
                      {beneficiary.isFound ? 'Found' : 'Missing'}
                    </span>
                  </div>
                  <div className="mt-2 text-lg text-gray-700">
                    Location: <span className="font-semibold">{beneficiary.location}</span>
                  </div>
                  {beneficiary.notes && (
                    <div className="mt-2 text-lg text-gray-500">
                      Notes: {beneficiary.notes}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-400">
                    Registered: {new Date(beneficiary.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-xl text-center">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
