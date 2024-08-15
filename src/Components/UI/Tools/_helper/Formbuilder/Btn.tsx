import { Button } from "reactstrap";

const Btn = ({
  icon,
  callback,
  text,
}: {
  icon: any;
  text?: string;
  callback(): void;
}) => {
  return (
    <>
      <Button
        onClick={() => callback()}
        className="w-44 h-full max-sm:w-full max-md:w-auto rounded-md  bg-black text-gray-50  text-center flex justify-center items-center transition duration-500 px-2  max-sm:text-xs text-gray-black text-sm font-normal"
      >
        {icon}
        {text}
      </Button>
    </>
  );
};

export default Btn;
