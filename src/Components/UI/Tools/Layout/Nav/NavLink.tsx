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
        className={`text-green-800 w-auto  text-center border-b px-0 h-auto font-semibold transition duration-1000  hover:text-green-800 ${
          active == id ? "border-green-900" : "border-none"
        }  ${active == id && "text-green-900"} `}
        to={`/${to}`}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLink;
