import { Button } from "reactstrap";

const Link = ({ to, action, icon }: any) => {
  return (
    <>
      <Button
        onClick={action}
        className="w-full h-20 transition duration-700 text-2xl hover:bg-gray-900 border-b border-gray-300 bg-black text-white "
      >
        {to}
      </Button>
    </>
  );
};

export default Link;
