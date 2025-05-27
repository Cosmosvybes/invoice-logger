
const Overlay = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="fixed z-50 left-0 top-0 backdrop-blur-sm max-sm:p-3  p-40 transition-all duration-500  h-[100dvh] w-[100dvw] flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
};

export default Overlay;
