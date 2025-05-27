import { useLayoutEffect, useRef, useState } from "react";
import { MoreVertical } from "react-huge-icons/solid";
import useSmartContractController from "../../../../Web3/Credentials/Index";

const Job = ({
  jobTitle,
  executionStatus,
  deadline,
  budget,
  id,
}: {
  jobTitle: string;
  id: number;
  deadline: any;
  executionStatus: number;
  budget: number;
}) => {
  const { handleDelistDeal } = useSmartContractController();
  const [isOpen, setIsOpen] = useState(false);
  const options = useRef<HTMLDivElement>(null);

  const handleCloseOptions = (e: Event) => {
    if (options.current && !options.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useLayoutEffect(() => {
    document.body.addEventListener("mousedown", handleCloseOptions);
    () => document.body.removeEventListener("mousedown", handleCloseOptions);
  }, []);

  return (
    <>
      <div className="relative bg-purple-400 w-1/2 max-sm:w-full  gap-2 border-l-8 border-b-8 border-purple-900 h-auto flex flex-col file:h-auto justify-center shadow rounded-br-lg rounded-tl-lg p-3">
        <MoreVertical
          className="absolute text-5xl bottom-0 text-purple-700 right-1 cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            ref={options}
            className="absolute right-2 bottom-2 w-1/4 bg-gray-200 h-2/4 shadow"
          >
            <div className="relative w-full h-full  flex flex-col">
              <button className="w-full h-full bg-purple-200 text-purple-600 max-sm:text-[12px] ">
                Edit
              </button>
              <button
                className="bg-red-500 h-full text-white w-full max-sm:text-[14px]"
                onClick={() => handleDelistDeal(id)}
              >
                Delist
              </button>
            </div>
          </div>
        )}
        <h1 className="text-[16px] text-white font-bold max-sm:text-[15px]  ">
          {jobTitle.toUpperCase()}
        </h1>
        <span>
          {[
            { id: 0, title: "Pending" },
            { id: 1, title: "Started" },
            { id: 2, title: "Canceled" },
            { id: 3, title: "Completed" },
          ].map((statusIndicator) => (
            <span key={statusIndicator.id} className="w-1/3">
              <p
                className={`relative w-1/3 rounded-sm px-1 max-sm:text-[12px]  ${
                  executionStatus == 1 && "bg-blue-700 text-purple-600"
                }  ${executionStatus == 3 && "bg-green-700 text-purple-600"}  ${
                  executionStatus == 2 && "bg-red-700 text-purple-600"
                } ${executionStatus == 0 && "bg-amber-200 text-amber-600"}`}
              >
                {statusIndicator.id == executionStatus &&
                  statusIndicator["title"]}
              </p>
            </span>
          ))}
        </span>
      
        <p className="max-sm:text-[12px] text-white">$EBT {budget} </p>

        <p className="max-sm:text-[12px] text-white">DEADLINE- {deadline} </p>
      </div>
    </>
  );
};

export default Job;
