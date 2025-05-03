
const Overlay = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="fixed left-0 top-0 backdrop-blur-sm max-sm:p-5  p-40 z-50  transition-all duration-500  h-[100vh] w-[100vw] flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      {children}
    </div>
  );
};

export default Overlay;
