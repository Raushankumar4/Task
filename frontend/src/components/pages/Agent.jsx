import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
;

const Agents = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/agents', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Added")
      setFormData({ name: '', email: '', password: '' });
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating agent');
      if (err.response?.status === 401) navigate('/');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Add Agent
        </button>
      </form>


    </div>
  );
};

export default Agents;
