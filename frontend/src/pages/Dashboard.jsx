import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import VulnerabilityChart from '../components/dashboard/VulnerabilityChart';
import HealthGauge from '../components/dashboard/HealthGauge';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import RepoList from '../components/dashboard/RepoList';
import { Megaphone, Bug, Zap, Activity, Wifi, WifiOff, GitPullRequest } from 'lucide-react';

const Dashboard = () => {
  const [allReviews, setAllReviews] = useState(() => {
    const saved = localStorage.getItem('alaris_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const dashboardData = allReviews.length > 0 ? allReviews[0] : null;
  const totalScanned = allReviews.length;

  useEffect(() => {
    let ws; 
    let reconnectTimeout; 

    const connectWebSocket = () => {
      const socketUrl = `wss://giddily-status-energize.ngrok-free.dev/ws`;
      ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        setConnectionStatus('connected');
      };
      
      ws.onmessage = (event) => {
        try {
          const liveData = JSON.parse(event.data);

          const newReview = liveData.review || liveData;

          setAllReviews(prev => {
            const updated = [newReview, ...prev];
            localStorage.setItem('alaris_reviews', JSON.stringify(updated));
            return updated;
          });
          
        } catch (err) {
          console.error("Failed to parse WebSocket message", err);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        reconnectTimeout = setTimeout(connectWebSocket, 3000); 
      };

      ws.onerror = () => ws.close();
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

  // Function to reset for a clean demo run
  const resetDemo = () => {
    localStorage.removeItem('alaris_reviews');
    setAllReviews([]);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Engineering Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time code quality and security metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          {allReviews.length > 0 && (
            <button 
              onClick={resetDemo}
              className="text-[10px] text-slate-500 hover:text-rose-400 font-bold uppercase tracking-widest transition-colors"
            >
              Reset History
            </button>
          )}
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
            connectionStatus === 'connected' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {connectionStatus === 'connected' ? (
              <><Wifi className="w-4 h-4 animate-pulse" /> Live Sync Active</>
            ) : (
              <><WifiOff className="w-4 h-4" /> Offline</>
            )}
          </div>
        </div>
      </div>

      {!dashboardData ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20 animate-in fade-in duration-500">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping blur-xl"></div>
            <div className="bg-slate-800 p-4 rounded-full border border-slate-700 relative z-10 shadow-xl">
              <GitPullRequest className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Awaiting First Pull Request</h2>
          <p className="text-slate-400 max-w-md mb-8">Alaris MergeGuard is listening. Trigger a webhook to generate your first AI health score.</p>
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 text-left w-full max-w-sm">
            <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Quick Start Guide</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">1</span> Create a new branch.</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">2</span> Push code to GitHub.</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">3</span> Open a Pull Request.</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <StatCard title="Total PRs Scanned" value={totalScanned} icon={Activity} iconColor="text-emerald-400" />
            <StatCard title="Vulnerabilities" value={dashboardData?.metrics?.vulnerabilities || 0} icon={Megaphone} iconColor="text-rose-500" />
            <StatCard title="Logic Bugs" value={dashboardData?.metrics?.logicBugs || 0} icon={Bug} iconColor="text-amber-400" />
            <StatCard title="Code Smells" value={dashboardData?.metrics?.codeSmells || 0} icon={Zap} iconColor="text-blue-400" />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0 pb-2">
            <VulnerabilityChart data={dashboardData} />
            <HealthGauge data={dashboardData} />
            <ActivityFeed data={dashboardData} history={allReviews} />
            <RepoList data={dashboardData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;