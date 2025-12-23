import { Link } from "react-router-dom";

type textType = {
  text: string;
  icon: any;
  path: any;
};

const Btn = ({ text, icon, path }: textType) => {
  return (
    <Link
      to={`/${path}`}
      className={`relative group overflow-hidden h-72 w-72 max-sm:w-full max-sm:h-52 flex flex-col justify-center items-center text-center gap-4
      glass-card border border-white/10 p-6 transition-all duration-300
      hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:border-violet-500/50 hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 text-5xl text-violet-300 group-hover:text-white transition-colors duration-300 drop-shadow-lg">
        {icon}
      </span>
      <span className="relative z-10 text-2xl text-slate-200 font-semibold group-hover:text-white transition-colors duration-300 tracking-wide">
        {text}
      </span>
    </Link>
  );
};

export default Btn;
