import React from 'react';

const StatCard = ({ title, value, icon: Icon, iconColor }) => {
  return (
    <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-lg flex items-center justify-between group hover:border-slate-600 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1 transition-all">
          {value !== undefined ? value : 0}
        </h3>
      </div>
      
   
      <div className={`p-3 rounded-lg bg-slate-800/80 border border-slate-700/50 ${iconColor} group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StatCard;