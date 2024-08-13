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
        className={`text-black font-normal text-2xl w-auto transition duration-500 max-sm:w-auto  max-sm:mt-1 max-sm:text-sm border-b-2 ${
          active == id ? "border-black" : "border-none"
        } `}
        onClick={() => func()}
      >
        {node}
      </Button>
    </div>
  );
};

export default NavBtn;
