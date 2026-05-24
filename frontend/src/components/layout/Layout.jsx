import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, currentPage, setCurrentPage , setPat}) => {
  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-200 font-sans overflow-hidden">
      {/* Pass the state to the Sidebar so it knows what to click */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} setPat={setPat}/>
      
      <main className="flex-1 h-full overflow-hidden bg-[#0B1120]">
        <div className="h-full p-4 md:p-6 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;