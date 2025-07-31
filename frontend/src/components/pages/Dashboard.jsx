import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Agents from './Agent';
import UploadTasks from './UploadTasks';
import AgentList from './AgentList';

const Dashboard = () => {
  const [showAgentsModal, setShowAgentsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 text-center">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 mb-6">Use the buttons below to manage agents and upload tasks.</p>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={() => setShowAgentsModal(true)}
        >
          Add Agent
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          onClick={() => setShowUploadModal(true)}
        >
          Upload Tasks
        </button>
      </div>

      {/* Add Agent Modal */}
      {showAgentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Agent</h3>
              <button
                className="text-gray-600 hover:text-black text-2xl"
                onClick={() => setShowAgentsModal(false)}
              >
                &times;
              </button>
            </div>
            <Agents />
          </div>
        </div>
      )}

      {/* Upload Tasks Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Tasks</h3>
              <button
                className="text-gray-600 hover:text-black text-2xl"
                onClick={() => setShowUploadModal(false)}
              >
                &times;
              </button>
            </div>
            <UploadTasks />
          </div>
        </div>
      )}

      <AgentList />
    </div>
  );
};

export default Dashboard;
