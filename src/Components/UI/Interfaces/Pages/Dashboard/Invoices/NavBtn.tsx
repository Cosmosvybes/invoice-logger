

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
        className={`text-black h-full bg-inherit border-b font-normal text-2xl w-auto transition duration-500 max-sm:w-auto  max-sm:mt-1  max-sm:text-sm  ${
          active == id ? "border-black" : "border-none"
        } `}
        onClick={() => func()}
      >
        {node}
      </button>
    </div>
  );
};

export default NavBtn;
