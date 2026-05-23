import React from 'react';
import { Home, GitPullRequest, BarChart2, Shield, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#111827] border-r border-slate-800 min-h-screen flex flex-col">
      {/* Brand Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <Shield className="w-8 h-8 text-emerald-400" />
        <span className="text-xl font-bold text-white">CodeGuard <span className="text-emerald-400">AI</span></span>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-medium">Overview</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <GitPullRequest className="w-5 h-5" />
          <span className="font-medium">Pull Requests</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <BarChart2 className="w-5 h-5" />
          <span className="font-medium">Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <Users className="w-5 h-5" />
          <span className="font-medium">Team</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </a>
      </nav>
      
      {/* User Profile Area */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            RS
          </div>
          <div>
            <p className="text-sm font-medium text-white">Ram S.</p>
            <p className="text-xs text-slate-500">Vortax Dev Team</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;