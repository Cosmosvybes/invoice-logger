import { Spinner } from "reactstrap";

const Spinner_ = () => {
  return (
    <>
      <div className="relative h-screen flex-col flex justify-center gap-1 items-center">
        <Spinner type="grow" color="primary" />
        <p> Setting up, please wait</p>
        <div className="relative flex flex-col mt-2">
          {" "}
          <p className="text-gray-400"> Taking more than 30 seconds ?</p>
          <button className="mt-1 text-gray-500 hover:underline" onClick={() => location.reload()}> click here </button>
        </div>
      </div>
    </>
  );
};

export default Spinner_;
