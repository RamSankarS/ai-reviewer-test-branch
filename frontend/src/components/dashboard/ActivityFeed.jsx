import React from 'react';
import { recentActivity } from '../../data/mockData';
import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

const ActivityFeed = () => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'success': return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
      case 'warning': return { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' };
      case 'danger': return { icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' };
      default: return { icon: Clock, color: 'text-slate-400', bg: 'bg-slate-800' };
    }
  };

  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col min-h-0">
      <h3 className="text-md font-semibold text-slate-200 mb-3 shrink-0">Live AI Audit Log</h3>
      <div className="space-y-3 overflow-y-auto pr-2 flex-1 min-h-0 custom-scrollbar">
        {recentActivity.map((activity) => {
          const { icon: Icon, color, bg } = getStatusConfig(activity.status);
          return (
            <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-slate-800/50 rounded-lg transition-colors border border-transparent">
              <div className={`p-1.5 rounded-full ${bg} ${color} mt-0.5 shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-slate-200 truncate">PR {activity.pr} <span className="text-slate-500">by @{activity.user}</span></p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0"><Clock className="w-2.5 h-2.5" /> {activity.time}</span>
                </div>
                <p className={`text-xs mt-1 truncate ${activity.status === 'danger' ? 'text-rose-400' : 'text-slate-400'}`}>{activity.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;