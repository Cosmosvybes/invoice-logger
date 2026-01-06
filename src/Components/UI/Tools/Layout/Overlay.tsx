import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-sm transition-all duration-300">
      <div className="relative z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
