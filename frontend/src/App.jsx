import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PullRequests from './pages/PullRequests';
import Login from './pages/Login';

const App = () => {
  // Check if they already logged in previously
  const [pat, setPat] = useState(localStorage.getItem('github_pat'));
  const [currentPage, setCurrentPage] = useState('overview');

  // If there is no PAT, lock them on the Login screen
  if (!pat) {
    return <Login onLogin={setPat} />;
  }

  // Otherwise, render the main app
  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} setPat={setPat}>
      {currentPage === 'overview' && <Dashboard />}
      {currentPage === 'pull-requests' && <PullRequests />}
    </Layout>
  );
};

export default App;