import { useState } from "react";
import { Client } from "../../../../../States/Slices/ClientSlice/client.types";
import { ArrowLeftCircle, ArrowRightCircle } from "react-huge-icons/solid";
const Paginate = ({
  list,
  listPerPage,
  handleNext,
}: {
  list: Client[];
  listPerPage: number;
  handleNext(arg: number): void;
}) => {
  const pageLinks = [];
  for (let i = 1; i <= Math.ceil(list.length / listPerPage); i++) {
    pageLinks.push(i);
  }

  const [active, setActive] = useState(1);
  const paginateHandler = (arg: number) => {
    setActive(arg);
  };

  const handlePrevious = () => {
    setActive((prev) => (prev >= 2 ? prev - 1 : prev));
    handleNext(active >= 2 ? active - 1 : active);
  };

  const handleNext_ = () => {
    setActive((prev) => (prev < list.length / listPerPage ? prev + 1 : prev));
    handleNext(
      active < Math.ceil(list.length / listPerPage) ? active + 1 : active
    );
  };

  return (
    <>
      <ul className="flex justify-center gap-2 px-2 place-items-center mt-4 flex-wrap rounded-md py-2 ">
        <button 
        
        onClick={handlePrevious}>
          <ArrowLeftCircle   className="text-2xl text-black " />{" "}
        </button>
        <span>...</span>
        {pageLinks.map((linkNumber) => (
          <button
            onClick={() => {
              handleNext(linkNumber);
              paginateHandler(linkNumber);
            }}
            key={linkNumber}
            className={` w-8 rounded-lg border text-xl   h-auto duration-700 transition shadow-md cursor-pointer ${
              active != linkNumber ? "bg-gray-200" : "bg-purple-400 text-white"
            } ${
              active == linkNumber ? "text-white" : "text-black"
            } px-1 rounded-sm text-center`}
          >
            {linkNumber}
          </button>
        ))}
    <span>...</span>
        <button>
          <ArrowRightCircle
            className="text-2xl text-black "
            onClick={handleNext_}
          />{" "}
        </button>
      </ul>
    </>
  );
};

export default Paginate;
