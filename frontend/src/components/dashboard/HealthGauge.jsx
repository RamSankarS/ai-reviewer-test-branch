import React from 'react';
import { overviewStats } from '../../data/mockData';

const HealthGauge = () => {
  const score = overviewStats.healthScore;
  const radius = 60; // Reduced size to guarantee fit
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg h-full flex flex-col items-center justify-between min-h-0">
      <h3 className="text-md font-semibold text-slate-200 w-full text-left shrink-0">Repository Health</h3>
      
      <div className="relative flex items-center justify-center flex-1 w-full min-h-0 py-2">
        <svg className="transform -rotate-90 w-36 h-36">
          <circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-700/50" />
          <circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-emerald-400 transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center w-full bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 shrink-0">
        Status: <span className="text-emerald-400 font-semibold">Passing checks</span>
      </p>
    </div>
  );
};

export default HealthGauge;