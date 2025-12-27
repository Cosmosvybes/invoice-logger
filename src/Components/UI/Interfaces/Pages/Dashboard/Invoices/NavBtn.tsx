const NavBtn = ({
  node,
  active,
  func,
  id,
}: {
  active: number;
  node: string;
  id: number;
  func(): void;
}) => {
  const isActive = active === id;
  
  return (
    <button
      onClick={() => func()}
      className={`px-6 py-2 rounded-xl text-sm font-black capitalize transition-all duration-200 whitespace-nowrap ${
        isActive 
          ? "bg-white text-violet-600 shadow-sm" 
          : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
      }`}
    >
      {node}
    </button>
  );
};

export default NavBtn;
