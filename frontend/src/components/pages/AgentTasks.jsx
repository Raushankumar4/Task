import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const AgentTask = () => {
  const { agentId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [agentName, setAgentName] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/agent/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);

        setTasks(res?.data || []);
        setAgentName(res.data.agentName || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tasks');
      }
    };
    fetchTasks();
  }, [agentId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Tasks for <span className="text-indigo-600">{agentName}</span>
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks assigned to this agent.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, idx) => (
            <li
              key={idx}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md shadow-sm border border-gray-200 transition"
            >
              <div className="text-lg font-semibold text-gray-700">
                {task.firstName}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-500">Notes:</span> {task.notes}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-500">Phone:</span> {task.phone}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default AgentTask;
