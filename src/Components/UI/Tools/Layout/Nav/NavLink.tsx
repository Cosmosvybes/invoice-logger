import { Link } from "react-router-dom";

const NavLink = ({
  to,
  name,
  activeCallback,
  active,
  id,
}: {
  to: string;
  name: string;
  active: number;
  id: number;
  activeCallback(): void;
}) => {
  return (
    <>
      <Link
        onClick={() => activeCallback()}
        className={`text-purple-800 w-auto  text-center border-t px-0 h-auto font-semibold transition duration-1000  hover:text-purple-500 ${
          active == id ? "border-purple-900" : "border-none"
        }  ${active == id && "text-purple-900"} `}
        to={`/${to}`}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLink;
