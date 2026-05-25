import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, AlertTriangle, XCircle, ExternalLink, History } from 'lucide-react';

const PullRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('alaris_reviews');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'passed': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> Passed</span>;
      case 'warning': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium"><AlertTriangle className="w-3.5 h-3.5"/> Warning</span>;
      case 'blocked': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium"><XCircle className="w-3.5 h-3.5"/> Blocked</span>;
      default: 
        return <span className="text-slate-500 text-xs italic">Pending</span>;
    }
  };

  const filteredPRs = history.filter(pr => 
    pr.summary?.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pr.summary?.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
          <p className="text-slate-400 text-sm mt-1">Reviewing {history.length} historical AI-scanned code merges.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Filter by status or message..." 
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

      <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl shadow-lg flex-1 min-h-0 overflow-hidden flex flex-col">
        {history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
            <History className="w-12 h-12 opacity-20" />
            <p>No historical scans found yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">Analysis Summary</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">AI Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">Vulnerabilities</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">Health</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredPRs.map((pr, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">{pr.summary?.message}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Scan #{history.length - index}</p>
                    </td>
                    <td className="p-4">{getStatusBadge(pr.summary?.status)}</td>
                    <td className="p-4">
                      <span className={`text-sm font-bold ${pr.metrics?.vulnerabilities > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                        {pr.metrics?.vulnerabilities || 0} issues
                      </span>
                    </td>
                    <td className="p-4">
                       <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                         pr.healthScore >= 80 ? 'border-emerald-500/20 text-emerald-400' : 'border-rose-500/20 text-rose-400'
                       }`}>
                         {pr.healthScore}%
                       </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700" title="View Details">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PullRequests;