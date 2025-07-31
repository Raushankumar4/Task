import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import AuthWrapper from './components/AuthWrapper';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import AgentTask from './components/pages/AgentTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <AuthWrapper>
              <Dashboard />
            </AuthWrapper>
          }
        />

        <Route path="/agent/:agentId" element={<AgentTask />} />

      </Routes>

    </Router>
  );
}

export default App;
