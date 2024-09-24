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

  return (
    <>
      <ul className="flex justify-start gap-2 px-3 flex-wrap ">
        {pageLinks.map((linkNumber) => (
          <button
            onClick={() => {
              switchActive(linkNumber);
              paginateHandler(linkNumber);
            }}
            key={linkNumber}
            className={` w-8 rounded-md border   h-auto duration-700 transition shadow-md cursor-pointer ${
              active == linkNumber && "bg-gray-200"
            } ${
              active == linkNumber && "text-black"
            } text-black px-1 rounded-sm text-center`}
          >
            {linkNumber}
          </button>
        ))}
      </ul>
    </>
  );
};

export default Paginate;
