import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchAgents = async () => {
    try {
      const res = await api.get('/agents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch agents');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">Agents List</h3>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {agents.map((agent) => (
          <li
            key={agent._id}
            className="cursor-pointer bg-gray-100 p-3 rounded-md text-gray-700 flex justify-between items-center hover:bg-blue-100"
            onClick={() => navigate(`/agent/${agent._id}`)}
          >
            <span>{agent.name}</span>
            <span className="text-sm text-gray-500">{agent.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
