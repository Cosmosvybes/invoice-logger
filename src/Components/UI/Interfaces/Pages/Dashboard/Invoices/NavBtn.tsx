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
        className={`text-purple-800 h-full bg-inherit text-center border-b-2 font-normal text-xs w-auto transition duration-500 max-sm:w-auto   max-sm:text-sm  ${
          active == id ? "border-purple-900" : "border-none"
        } `}
        onClick={() => func()}
      >
        {node.toLowerCase()}
      </button>
    </div>
  );
};

export default NavBtn;
