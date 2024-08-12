import { Button } from "reactstrap";

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
    <div>
      <Button
        className={`text-black font-semibold text-2xl w-28 transition duration-500 max-sm:w-auto   mt-12 max-sm:mt-14 max-sm:text-xl border-b ${
          active == id ? "border-black" : "border-gray-300"
        } `}
        onClick={() => func()}
      >
        {node}
      </Button>
    </div>
  );
};

export default NavBtn;
