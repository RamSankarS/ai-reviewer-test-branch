import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import VulnerabilityChart from '../components/dashboard/VulnerabilityChart';
import HealthGauge from '../components/dashboard/HealthGauge';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import RepoList from '../components/dashboard/RepoList';
import { ShieldAlert, Bug, Zap, Activity, Wifi, WifiOff, GitPullRequest } from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    let ws; 
    let reconnectTimeout; 

    const connectWebSocket = () => {
      const userPat = localStorage.getItem('github_pat');
      const username = localStorage.getItem('github_username');
      
      const socketUrl = `wss://giddily-status-energize.ngrok-free.dev/ws?user=${username}&token=${userPat}`;
      ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        console.log('WebSocket Connected!');
        setConnectionStatus('connected');
      };
      
      ws.onmessage = (event) => {
        try {
          const liveData = JSON.parse(event.data);
          console.log("Incoming AI Data:", liveData);
          setDashboardData(liveData);
        } catch (err) {
          console.error("Failed to parse WebSocket message", err);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected. Attempting to reconnect...');
        setConnectionStatus('disconnected');
        reconnectTimeout = setTimeout(connectWebSocket, 3000); 
      };

      ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
        setConnectionStatus('error');
        ws.close(); 
      };
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws) {
        ws.onclose = null; 
        ws.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Engineering Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time code quality and security metrics.</p>
        </div>

        {/* Live Sync Indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
          connectionStatus === 'connected' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {connectionStatus === 'connected' ? (
            <><Wifi className="w-4 h-4 animate-pulse" /> Live Sync Active</>
          ) : (
            <><WifiOff className="w-4 h-4" /> Disconnected</>
          )}
        </div>
      </div>

      {/* THE CONDITIONAL RENDER: Empty State vs Live Data */}
      {!dashboardData ? (
        
        // --- ACTIONABLE EMPTY STATE (Waiting Room) ---
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20 animate-in fade-in duration-500">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping blur-xl"></div>
            <div className="bg-slate-800 p-4 rounded-full border border-slate-700 relative z-10 shadow-xl">
              <GitPullRequest className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">Awaiting First Pull Request</h2>
          <p className="text-slate-400 max-w-md mb-8">
            Alaris PR Lens is securely connected to your workspace and actively listening. Trigger a webhook to generate your first AI health score.
          </p>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 text-left w-full max-w-sm">
            <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Quick Start Guide</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">1</span>
                Create a new branch in your repository.
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">2</span>
                Commit and push some test code.
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">3</span>
                Open a Pull Request on GitHub.
              </li>
            </ul>
          </div>
        </div>

      ) : (

        // --- LIVE DATA DASHBOARD (Your existing layout) ---
        <div className="flex flex-col h-full gap-4 animate-in fade-in zoom-in-95 duration-500">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            {/* Using optional chaining (?) so it doesn't crash if a field is missing in the JSON */}
            <StatCard title="Total PRs Scanned" value={dashboardData?.totalScanned || 0} icon={Activity} iconColor="text-emerald-400" />
            <StatCard title="Vulnerabilities" value={dashboardData?.vulnerabilitiesBlocked || 0} icon={ShieldAlert} iconColor="text-rose-500" />
            <StatCard title="Logic Bugs" value={dashboardData?.criticalBugs || 0} icon={Bug} iconColor="text-amber-400" />
            <StatCard title="Performance" value={dashboardData?.performanceIssues || 0} icon={Zap} iconColor="text-blue-400" />
          </div>

          {/* Main 2x2 Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0 pb-2">
            {/* You will need to pass the live data down into these components next! */}
            <VulnerabilityChart data={dashboardData} />
            <HealthGauge data={dashboardData} />
            <ActivityFeed data={dashboardData} />
            <RepoList data={dashboardData} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;