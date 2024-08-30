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
        className={`text-black w-auto  text-center px-2 border-b  font-semibold transition duration-1000   py-3 hover:text-black ${
          active == id ? "border-black" : "border-none"
        }  ${active == id && "text-gray-900"} `}
        to={`/${to}`}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLink;
