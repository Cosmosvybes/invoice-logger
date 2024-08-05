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
        className="w-44 h-full max-sm:w-28  text-center flex justify-center items-center transition duration-500 px-2  text-gray-400 font-normal rounded-md "
      >
        {icon}
        {text}
      </Button>
    </>
  );
};

export default Btn;
