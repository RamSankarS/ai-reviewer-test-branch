import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import VulnerabilityChart from '../components/dashboard/VulnerabilityChart';
import HealthGauge from '../components/dashboard/HealthGauge';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import RepoList from '../components/dashboard/RepoList';
import { overviewStats } from '../data/mockData';
import { ShieldAlert, Bug, Zap, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header Area - Locked Size */}
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Engineering Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time code quality and security metrics.</p>
        </div>
      </div>

      {/* Top Metrics Row - Locked Size */}
      <div className="grid grid-cols-4 gap-4 shrink-0">
        <StatCard title="Total PRs Scanned" value={overviewStats.totalScanned} icon={Activity} iconColor="text-emerald-400" />
        <StatCard title="Vulnerabilities" value={overviewStats.vulnerabilitiesBlocked} icon={ShieldAlert} iconColor="text-rose-500" />
        <StatCard title="Logic Bugs" value={overviewStats.criticalBugs} icon={Bug} iconColor="text-amber-400" />
        <StatCard title="Performance" value={overviewStats.performanceIssues} icon={Zap} iconColor="text-blue-400" />
      </div>

      {/* Main 2x2 Grid - Fills remaining space exactly */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0 pb-2">
        <VulnerabilityChart />
        <HealthGauge />
        <ActivityFeed />
        <RepoList />
      </div>
    </div>
  );
};

export default Dashboard;