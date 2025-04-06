import React from "react";

const Overlay = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="fixed left-0 top-0 max-sm:p-5  transition-all duration-500 z-30 h-[100vh] w-[100vw] flex justify-center items-center bg-[rgba(0,0,0,0.6)]">
    
      {children}
    </div>
  );
};

export default Overlay;
