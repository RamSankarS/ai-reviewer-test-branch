import React, { useState } from 'react';
import { Home, GitPullRequest, BarChart2, Shield, Users, Settings, ChevronLeft, Menu } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper for the nav items to keep code clean
  const NavItem = ({ icon: Icon, label, isActive }) => (
    <a 
      href="#" 
      className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors overflow-hidden ${
        isActive 
          ? 'bg-emerald-500/10 text-emerald-400' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
      title={isCollapsed ? label : ""}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
    </a>
  );

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
        <NavItem icon={Home} label="Overview" isActive={true} />
        <NavItem icon={GitPullRequest} label="Pull Requests" />
        <NavItem icon={BarChart2} label="Analytics" />
        <NavItem icon={Users} label="Team" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
      
      {/* User Profile Area */}
      <div className="p-4 border-t border-slate-800">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors overflow-hidden`}>
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
      </div>
      
    </aside>
  );
};

export default Sidebar;