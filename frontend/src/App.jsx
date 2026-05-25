import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PullRequests from './pages/PullRequests';
import Login from './pages/Login';

const App = () => {
  // Check if they already logged in previously
  const [pat, setPat] = useState(localStorage.getItem('github_pat'));
  const [currentPage, setCurrentPage] = useState('overview');

  // Dedicated login handler (Login.jsx calls this on success)
  const handleLoginSuccess = (token) => {
    setPat(token);
    setCurrentPage('overview'); // Guarantee they land on the dashboard!
  };

  // Dedicated logout handler
  const handleLogout = () => {
    // Wipe everything from browser memory
    localStorage.removeItem('github_pat');
    localStorage.removeItem('github_username');
    
    // Reset React state
    setPat(null);
    setCurrentPage('overview'); 
  };

  // If there is no PAT, lock them on the Login screen
  if (!pat) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  // Otherwise, render the main app
  return (
    // Notice we changed setPat={setPat} to onLogout={handleLogout}
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout}>
      {currentPage === 'overview' && <Dashboard />}
      {currentPage === 'pull-requests' && <PullRequests />}
    </Layout>
  );
};

export default App;