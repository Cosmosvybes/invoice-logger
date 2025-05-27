import { ArrowLeftCircle, ArrowRightCircle } from "react-huge-icons/solid";
import { IPaginate } from "./types";
import { useState } from "react";

const Paginate = ({ invoices, paginateHandler, postsPerPage }: IPaginate) => {
  let pageLinks = [];

  for (let i = 1; i <= Math.ceil(invoices.length / postsPerPage); i++) {
    pageLinks.push(i);
  }

  const [active, setActive] = useState(1);
  const switchActive = (val: number) => {
    setActive(val);
  };

  const handlePrevious = () => {
    setActive((prev) => (prev >= 2 ? prev - 1 : prev));
    paginateHandler(active >= 2 ? active - 1 : active);
  };

  const handleNext = () => {
    setActive((prev) =>
      prev < invoices.length / postsPerPage ? prev + 1 : prev
    );
    paginateHandler(
      active < Math.ceil(invoices.length / postsPerPage) ? active + 1 : active
    );
  };

  return (
    <>
      <ul className="flex justify-center gap-2 px-2 place-items-center mt-4 flex-wrap rounded-md py-2 ">

        <button onClick={handlePrevious}>
 
          <ArrowLeftCircle className="text-5xl text-purple-500" />{" "}
        </button>

        <span>...</span>
        {pageLinks.slice(0, 3).map((linkNumber) => (
          <button
            onClick={() => {
              switchActive(linkNumber);
              paginateHandler(linkNumber);
            }}
            key={linkNumber}
            className={` w-8 rounded-lg border text-xl font-bold  h-auto duration-700 transition shadow-md cursor-pointer ${
              active != linkNumber ? "bg-gray-200" : "bg-purple-400 text-white"
            } ${
              active == linkNumber ? "text-white" : "text-black"
            } px-1 rounded-sm text-center`}
          >
            {linkNumber}
          </button>
        ))}
        <span>...</span>
        <button className="text-3xl text-gray-500 font-semibold">
          <ArrowRightCircle
            className="text-5xl text-purple-500"
            onClick={handleNext}
          />{" "}
        </button>
      </ul>
    </>
  );
};

export default Paginate;
