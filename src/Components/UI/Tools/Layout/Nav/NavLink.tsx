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
        className={`text-black w-28  text-center px-2  font-semibold transition duration-1000 border-black  py-3 rounded-md hover:text-black ${
          active == id && "bg-gray-200"
        }  ${ active == id && "text-gray-900"} `    }
        to={`/${to}`}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLink;