import React from 'react';
import { GitBranch } from 'lucide-react';

const RepoList = ({ data }) => {

  const health = data?.healthScore || 0;
  

  const username = localStorage.getItem('github_username') || 'Active';


  let colorClass = 'bg-slate-500';
  if (health >= 80) colorClass = 'bg-emerald-400';
  else if (health >= 50) colorClass = 'bg-amber-400';
  else colorClass = 'bg-rose-500';

  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col min-h-0 overflow-hidden">
      
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-md font-semibold text-slate-200">Monitored Repos</h3>
        <button className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors font-medium cursor-not-allowed opacity-80" title="Pro Feature">
          + Add Repo
        </button>
      </div>
      
      <div className="space-y-2 flex-1 min-h-0 overflow-y-auto">
        

        <div className="flex items-center justify-between p-2.5 bg-slate-800/30 rounded-lg border border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <GitBranch className={`w-4 h-4 shrink-0 ${health >= 80 ? 'text-emerald-400' : health >= 50 ? 'text-amber-400' : 'text-rose-500'}`} />
            <p className="text-xs font-medium text-slate-200 truncate">
              {username} / workspace
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
                style={{ width: `${health}%` }} 
              />
            </div>
            <span className="text-[10px] font-bold text-slate-300 w-5 text-right">{health}</span>
          </div>
        </div>
        

        <div className="flex items-center justify-center p-3 rounded-lg border border-dashed border-slate-700/40 text-[10px] text-slate-500 font-medium">
          Awaiting additional repositories...
        </div>

      </div>
    </div>
  );
};

export default RepoList;