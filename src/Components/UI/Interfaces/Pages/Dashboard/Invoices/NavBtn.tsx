

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
        className={`text-green-500 h-full bg-inherit text-center border-b-2 font-semibold text-2xl w-auto transition duration-500 max-sm:w-auto   max-sm:text-sm  ${
          active == id ? "border-green-400" : "border-none"
        } `}
        onClick={() => func()}
      >
        {node.toUpperCase()}
      </button>
    </div>
  );
};

export default NavBtn;
