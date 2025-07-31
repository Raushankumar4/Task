import { useState, useEffect } from 'react';
import api from '../services/api';

const UploadTasks = ({ setShowUploadModal }) => {
  const [file, setFile] = useState(null);
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchAgents = async () => {
    const res = await api.get('/agents', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAgents(res.data);
  };

  const fetchTasksForAgents = async () => {
    const results = {};
    for (let agent of agents) {
      const res = await api.get(`/tasks/agent/${agent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      results[agent.name] = res.data;
    }
    setTasks(results);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/tasks/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Uploaded")
      setShowUploadModal(false)
      setMessage('✅ Tasks uploaded & distributed!');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Upload failed');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload CSV/XLSX Task List</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Upload
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
        >
          {message}
        </p>
      )}

      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-700">Agent Tasks</h3>
      <div className="space-y-6">
        {Object.keys(tasks).map((agent) => (
          <div key={agent} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="font-semibold text-blue-700">{agent}</h4>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {tasks[agent].map((t) => (
                <li key={t._id}>
                  <span className="font-medium">{t.firstName}</span> – {t.phone}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadTasks;
