import React from 'react';

// 1. Accept the live data prop
const HealthGauge = ({ data }) => {
  // 2. Safely extract the score and summary (fallback to 0/pending if missing)
  const score = data?.healthScore || 0;
  const status = data?.summary?.status || 'pending';
  const message = data?.summary?.message || 'Awaiting scan...';

  // 3. SVG Circle Math
  const radius = 60; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // 4. Dynamic Color Logic based on Kashi's AI status
  let colorClass = 'text-slate-500'; 
  let statusDisplay = 'Pending';
  
  if (status === 'passed') {
    colorClass = 'text-emerald-400';
    statusDisplay = 'Passing Checks';
  } else if (status === 'warning') {
    colorClass = 'text-amber-400';
    statusDisplay = 'Needs Review';
  } else if (status === 'blocked') {
    colorClass = 'text-rose-500';
    statusDisplay = 'Merge Blocked';
  }

  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col items-center justify-between min-h-0">
      <h3 className="text-md font-semibold text-slate-200 w-full text-left shrink-0">PR Health</h3>
      
      <div className="relative flex items-center justify-center flex-1 w-full min-h-0 py-2">
        <svg className="transform -rotate-90 w-36 h-36">

          <circle 
            cx="72" cy="72" r={radius} 
            stroke="currentColor" strokeWidth="10" fill="transparent" 
            className="text-slate-700/50" 
          />

          <circle 
            cx="72" cy="72" r={radius} 
            stroke="currentColor" strokeWidth="10" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 

            className={`${colorClass} transition-all duration-1000 ease-out`} 
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
        </div>
      </div>

      <div className="w-full bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 shrink-0 text-center flex flex-col gap-1">
         <p className="text-xs text-slate-400">
           Status: <span className={`${colorClass} font-semibold uppercase tracking-wider`}>{statusDisplay}</span>
         </p>

         <p className="text-[10px] text-slate-500 truncate px-2" title={message}>
           {message}
         </p>
      </div>
    </div>
  );
};

export default HealthGauge;