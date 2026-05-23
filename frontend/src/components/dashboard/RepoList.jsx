import React from 'react';
import { topRepos } from '../../data/mockData';
import { GitBranch } from 'lucide-react';

const RepoList = () => {
  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-md font-semibold text-slate-200">Monitored Repos</h3>
        <button className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors font-medium">
          + Add Repo
        </button>
      </div>
      
      <div className="space-y-2 flex-1 min-h-0 overflow-hidden">
        {topRepos.map((repo) => (
          <div key={repo.id} className="flex items-center justify-between p-2.5 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-2 min-w-0">
              <GitBranch className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-xs font-medium text-slate-300 truncate">{repo.name}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${repo.health >= 80 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${repo.health}%` }} />
              </div>
              <span className="text-[10px] font-bold text-slate-300 w-5 text-right">{repo.health}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;