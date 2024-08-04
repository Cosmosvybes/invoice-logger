import { Link } from "react-router-dom";

type textType = {
  text: string;
  icon: any;
  path: any;
};

const Btn = ({ text, icon, path }: textType) => {
  return (
    <Link
      to={`/${path}`}
      className={`h-72 w-72  hover:z-30 hover:bg-gray-200 max-sm:w-52 max-sm:h-52 flex flex-col bg-gray-50 text-black  justify-center  shadow-md shadow-gray-400  items-center text-center text-2xl :text-white duration-1000 transition   border rounded-lg   px-4  font-semibold hover:bg-gradient-to-tr `}
    >
      {icon} {text}
    </Link>
  );
};

export default Btn;
