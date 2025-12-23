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
  return (
    <div className="h-full">
      <button
        className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 border border-transparent ${
          active == id 
            ? "bg-violet-600/20 text-violet-300 border-violet-500/50 shadow-[0_0_10px_-3px_rgba(124,58,237,0.3)]" 
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
        }`}
        onClick={() => func()}
      >
        {node}
      </button>
    </div>
  );
};

export default NavBtn;
