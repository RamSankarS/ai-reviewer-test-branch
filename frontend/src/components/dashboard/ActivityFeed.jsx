import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, FileCode } from 'lucide-react';

const ActivityFeed = ({ data }) => {
  const details = data?.details || [];


  const getSeverityConfig = (severity) => {
    const s = severity?.toLowerCase() || '';
    if (s === 'critical' || s === 'high') {
      return { icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' };
    }
    if (s === 'medium') {
      return { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' };
    }

    return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }; 
  };

  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col min-h-0">
      <h3 className="text-md font-semibold text-slate-200 mb-3 shrink-0">Live Issue Log</h3>
      
      <div className="space-y-3 overflow-y-auto pr-2 flex-1 min-h-0 custom-scrollbar">
        
        {details.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2 opacity-80">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/50" />
            <p className="text-xs">No issues found in this pull request.</p>
          </div>
        ) : (
          

          details.map((issue, index) => {
            const { icon: Icon, color, bg } = getSeverityConfig(issue.severity);
            
            return (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-slate-800/50 rounded-lg transition-colors border border-transparent">
                

                <div className={`p-1.5 rounded-full ${bg} ${color} mt-0.5 shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-slate-200 truncate flex items-center gap-1.5">
                      <FileCode className="w-3 h-3 text-slate-400" />
                      {issue.file || 'unknown_file'} 
                      <span className="text-slate-500">Line {issue.line || '?'}</span>
                    </p>
                    
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded shrink-0">
                      {issue.type}
                    </span>
                  </div>
                  

                  <p className={`text-xs mt-1 truncate font-medium ${color}`}>
                    {issue.title}
                  </p>
                  <p className="text-[10px] mt-0.5 text-slate-400 truncate" title={issue.description}>
                    {issue.description}
                  </p>
                </div>
                
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;