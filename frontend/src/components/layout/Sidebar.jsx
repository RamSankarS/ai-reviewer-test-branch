import React, { useState } from 'react';
// 1. Added LogOut to the imports here
import { Home, GitPullRequest, BarChart2, Shield, Users, Settings, ChevronLeft, Menu, LogOut } from 'lucide-react';

// 2. Added setPat to the props here
const Sidebar = ({ currentPage, setCurrentPage, setPat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, label, id }) => {
    const isActive = currentPage === id;
    return (
      <button 
        onClick={() => setCurrentPage(id)}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors overflow-hidden ${
          isActive 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
        title={isCollapsed ? label : ""}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!isCollapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
      </button>
    );
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#111827] border-r border-slate-800 h-screen flex flex-col transition-all duration-300 relative z-20`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-8 bg-slate-800 text-slate-400 p-1.5 rounded-full border border-slate-700 hover:text-white hover:bg-slate-700 transition-colors z-30"
      >
        {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Brand Logo Area */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'} h-20 overflow-hidden`}>
        <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
        {!isCollapsed && <span className="text-xl font-bold text-white whitespace-nowrap">CodeGuard <span className="text-emerald-400">AI</span></span>}
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2 mt-2">
        <NavItem icon={Home} label="Overview" id="overview" />
        <NavItem icon={GitPullRequest} label="Pull Requests" id="pull-requests" />
        <NavItem icon={BarChart2} label="Analytics" id="analytics" />
        <NavItem icon={Users} label="Team" id="team" />
        <NavItem icon={Settings} label="Settings" id="settings" />
      </nav>
      
      {/* User Profile Area */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-lg overflow-hidden`}>
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
            RS
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap">
              <p className="text-sm font-medium text-white">Ram S.</p>
              <p className="text-xs text-slate-500">Vortax Dev Team</p>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('github_pat');
            setPat(null);
          }}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} px-4 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20`}
          title="Disconnect Workspace"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Disconnect</span>}
        </button>
      </div>
      
    </aside>
  );
};

export default Sidebar;