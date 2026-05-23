import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, AlertTriangle, XCircle, ExternalLink } from 'lucide-react';

const mockPRs = [
  { id: 1042, title: "Refactor payment gateway webhook", author: "ram-vortax", status: "danger", vulnerabilities: 3, time: "2m ago" },
  { id: 1041, title: "Update caching logic for Redis", author: "sarah-dev", status: "success", vulnerabilities: 0, time: "1hr ago" },
  { id: 1040, title: "Fix UI overflow on mobile nav", author: "mike-design", status: "success", vulnerabilities: 0, time: "3hr ago" },
  { id: 1039, title: "Bump dependency versions", author: "dependabot", status: "warning", vulnerabilities: 1, time: "5hr ago" },
  { id: 1038, title: "Add rate limiting to public API", author: "ram-vortax", status: "danger", vulnerabilities: 2, time: "1d ago" },
];

const PullRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> Passed</span>;
      case 'warning': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium"><AlertTriangle className="w-3.5 h-3.5"/> Warnings</span>;
      case 'danger': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium"><XCircle className="w-3.5 h-3.5"/> Blocked</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Pull Requests</h1>
          <p className="text-slate-400 text-sm mt-1">Audit logs for all AI-scanned code merges.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search PRs..." 
              className="bg-[#1E293B] border border-slate-700 text-sm text-slate-200 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-[#1E293B] border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl shadow-lg flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">PR Details</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">Author</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">AI Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">Issues</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockPRs.map((pr) => (
                <tr key={pr.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors cursor-pointer">{pr.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">#{pr.id} • opened {pr.time}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-300 px-2 py-1 bg-slate-800 rounded-md border border-slate-700">@{pr.author}</span>
                  </td>
                  <td className="p-4">{getStatusBadge(pr.status)}</td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${pr.vulnerabilities > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                      {pr.vulnerabilities} found
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PullRequests;