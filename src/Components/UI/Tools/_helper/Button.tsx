import { Button } from "reactstrap";

interface btnI {
  text: string;
  callback(): void;
  icon: any;
}

const BTN = ({ text, callback, icon }: btnI) => {
  return (
    <>
      <Button
        onClick={() => callback()}
        className="w-44 h-16 gap-1 bg-gradient-to-tr text-2xl flex justify-center items-center font-normal rounded-md from-sky-90 hover:bg-gradient-to-tl text-gray-50 to-sky-400"
      >
        {text}
        {icon}
      </Button>
    </>
  );
};

export default BTN;
