import { Button } from "reactstrap";

type textType = {
  text: string;
  icon: any;
  callback(): void | boolean | object;
};

const Btn = ({ text, icon, callback }: textType) => {
  return (
    <Button
      onClick={() => callback()}
      className={`h-72 w-72  max-sm:w-52 max-sm:h-52 flex flex-col bg-gray-50  justify-center  shadow-md shadow-gray-400  items-center text-center text-2xl hover:from-sky-800 hover:to-sky-900 hover:text-white duration-1000 transition  text-sky-600 border rounded-lg   px-4  font-semibold hover:bg-gradient-to-tr `}
    >
      {icon} {text}
    </Button>
  );
};

export default Btn;
