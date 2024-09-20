import { Spinner } from "reactstrap";

const Spinner_ = () => {
  return (
    <>
      <div className="relative h-screen flex justify-center gap-1 items-center">
        <Spinner type="grow" color="primary" />
        <p> wait a moment...</p>
      </div>
    </>
  );
};

export default Spinner_;
