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
      <ul className="flex justify-start flex-wrap gap-0">
        {pageLinks.map((linkNumber) => (
          <li
            onClick={() => {
              switchActive(linkNumber);
              paginateHandler(linkNumber);
            }}
            key={linkNumber}
            className={`border w-8 rounded-md h-auto duration-700 transition cursor-pointer ${
              active == linkNumber && "bg-black"
            } ${
              active == linkNumber && "text-white"
            } text-black px-1 rounded-sm text-center`}
          >
            {linkNumber}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Paginate;
