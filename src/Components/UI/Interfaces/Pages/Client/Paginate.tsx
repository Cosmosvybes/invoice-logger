import { useState } from "react";
import { Client } from "../../../../../States/Slices/ClientSlice/client.types";
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

  return (
    <>
      <ul className="flex justify-start gap-2 px-1 mt-2 flex-wrap ">
        {pageLinks.map((linkNumber) => (
          <button
            onClick={() => {
              handleNext(linkNumber);
              paginateHandler(linkNumber);
            }}
            key={linkNumber}
            className={`w-8 rounded-md border border-gray-300 h-auto duration-700 transition cursor-pointer 
              ${
                active != linkNumber
                  ? "bg-gray-200"
                  : "bg-gradient-to-br from-green-600 to-black"
              } ${
              active == linkNumber ? "text-white" : "text-black"
            } px-1 rounded-sm text-center`}
          >
            {linkNumber}
          </button>
        ))}
      </ul>
    </>
  );
};

export default Paginate;
