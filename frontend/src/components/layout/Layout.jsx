import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-200 font-sans overflow-hidden">
      <Sidebar />
      {/* main container is locked to h-full and prevents scrolling */}
      <main className="flex-1 h-full overflow-hidden bg-[#0B1120]">
        <div className="h-full p-4 md:p-6 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;