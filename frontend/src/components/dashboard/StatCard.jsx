import React from 'react';

const StatCard = ({ title, value, icon: Icon, iconColor }) => {
  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-6 rounded-xl flex items-center justify-between shadow-lg shadow-black/10">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;