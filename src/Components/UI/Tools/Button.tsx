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
      className={`h-72 w-72  max-sm:w-full gap-2 hover:z-30 hover:bg-gray-200 max-sm:h-52 flex  bg-gray-50 text-gray-600  justify-center  shadow-md shadow-gray-400  items-center text-center text-2xl :text-white duration-1000 transition   border rounded-lg   px-4  font-semibold hover:bg-gradient-to-tr `}
    >
      {text} {icon}
    </Link>
  );
};

export default Btn;
