import { Link } from "react-router-dom";
const Link_ = ({ to, action, icon }: any) => {
  return (
    <>
      <Link
        to={`/${to}`}
        onClick={action}
        className="w-full h-16 gap-2 flex justify-start items-center text-center hover:text-gray-50 px-10 transition duration-700 text-2xl font-light hover:bg-gray-900 border-b border-gray-300 bg-gray-200 text-black "
      >
        {icon} {to}
      </Link>
    </>
  );
};

export default Link_;
