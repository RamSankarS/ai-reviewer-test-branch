import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PullRequests from './pages/PullRequests';

const App = () => {
  // State to track which page is currently active
  const [currentPage, setCurrentPage] = useState('overview');

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'overview' && <Dashboard />}
      {currentPage === 'pull-requests' && <PullRequests />}
    </Layout>
  );
};

export default App;