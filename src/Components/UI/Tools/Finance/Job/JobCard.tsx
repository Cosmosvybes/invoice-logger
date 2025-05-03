import {
  BoxFavorite,
  InformationCircle,
  MoreVertical,
  TimeClock,
  TimeQuarter,
} from "react-huge-icons/solid";

import { useState } from "react";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import {
  JOBINTERFACE,
  setCurrentJob,
} from "../../../../../States/Slices/marketplace";

import useSmartContractController from "../../../../Web3/Credentials/Index";

const JobCard = ({
  id,
  jobTitle,
  description,
  category,
  executionDuration,
  postedAt,
  deadline,
  client,
  budget,
  executionStatus,
}: JOBINTERFACE) => {
  const [isReadingMore, setIsReadingMore] = useState(false);
  const dispatch = useAppDispatch();

  const handleSetJob = () => {
    dispatch(setCurrentJob({ id }));
  };

  const { handleBidForJob } = useSmartContractController();

  return (
    <div
      className="w-full flex-col p-2 gap-0 flex h-full rounded-lg py-2 px-2 max-sm:px-0 max-sm:gap-5  max-sm:w-full"
      onClick={handleSetJob}
    >
      <div className="relative flex w-full  p-2  justify-start items-center   ">
        <h1 className="text-[12px] max-sm:text-[14px] font-extrabold text-purple-600 hover:underline">
          {jobTitle.toUpperCase()}
        </h1>{" "}
      </div>
      <MoreVertical className="text-5xl max-sm:text-3xl text-purple-500 absolute top-2 -right-1" />{" "}
      <div className="relative w-full flex flex-col items-start h-auto gap-4  p-2">
        <div className="relative flex justify-start  items-center gap-2 ">
          {" "}
          <BoxFavorite className="text-sm inline  text-purple-500" />{" "}
          <p className="inline font-normal   text-purple-500">
            category - {category}
          </p>
        </div>
        <div className="relative flex justify-between items-center gap-2 ">
          {" "}
          <TimeQuarter className="text-sm inline  text-purple-500" />{" "}
          <p className="inline font-normal   text-purple-500">
            Posted at- {postedAt}
          </p>
        </div>{" "}
      </div>
      <span className="  flex justify-start w-full gap-2 p-2 items-center ">
        <TimeClock className="text-sm text-purple-600 inline " />
        <p className="text-purple-600 text-sm"> EDD</p>{" "}
        <p className="text-gray-400 text-[12px]">
          {deadline}
          {`  ${executionDuration}) `}
        </p>
      </span>
      <div className="relative w-full h-auto  mt-2   bg-white rounded-lg  ">
        <h1 className="text-[16px] p-2 flex items-center gap-1 text-purple-400 font-bold">
          <InformationCircle className="text-xl inline  text-purple-400" />{" "}
          Description
        </h1>
        <div className="w-full h-auto  p-2">
          <pre className="text-purple-400 font-thin  whitespace-pre-wrap h-auto">
            <p className="max-sm:hidden max-md:hidden">
              {description.slice(0, 400)}

              <a
                className="text-purple-400 inline cursor-pointer"
                onClick={() => setIsReadingMore(!isReadingMore)}
              >
                {description.length > 400 && !isReadingMore && "...read more"}
              </a>
            </p>
            <p className="hidden max-sm:block">
              {description.slice(0, 400)}

              <a
                className="text-purple-400 inline cursor-pointer"
                onClick={() => setIsReadingMore(!isReadingMore)}
              >
                {description.length > 400 && !isReadingMore
                  ? "...read more"
                  : description}
              </a>
            </p>
          </pre>
        </div>

        <div className="relative hidden max-sm:flex gap-2 p-2  flex-col">
          <span className="p-2  text-purple-600 text-[14px] w-3/6 max-sm:w-full flex justify-between items-center   rounded-md text-center">
            <p className="inline text-purple-100 bg-purple-600  w-1/2 rounded-sm p-1">
              client{" "}
            </p>{" "}
            <p className="inline text-purple-800 w-1/2 p-1 bg-purple-300 ">
              {client.slice(0, 5)}
            </p>
          </span>
          <span className="p-2  text-purple-600 text-[14px] w-3/6 max-sm:w-full flex justify-between items-center   rounded-md text-center">
            <p className="inline text-purple-100 bg-purple-600  w-1/2 rounded-sm p-1">
              budget{" "}
            </p>
            <p className="inline text-green-800 w-1/2 p-1 bg-green-300 ">
              $EBT {budget}
            </p>
          </span>

          <div className="relative  grid grid-cols-3  items-center  mt-10 max-sm:mt-2 w-full">
            {[
              { id: 0, title: "pending" },
              { id: 1, title: "started" },
              { id: 2, title: "completed" },
            ].map((statusIndicator) => (
              <div key={statusIndicator.id} className="relative w-full">
                <div className="relative flex justify-between w-full items-center">
                  <hr
                    className={`w-full ${
                      statusIndicator.id != executionStatus
                        ? "border-purple-900 border"
                        : "border-gray-700 bg-purple-400"
                    }  `}
                  />
                  <span
                    className={`relative rounded-full  ${
                      statusIndicator.id == executionStatus && "bg-purple-600"
                    }  h-3 w-3  border`}
                  ></span>
                </div>
                <p className="text-black text-sm text-center">
                  {statusIndicator.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-sm:flex mt-2 hidden  text-center rounded-br-lg rounded-bl-lg justify-start items-center  w-full bg-gradient-to-tr p-2 gap-2 ">
          <p className="text-sm">In order to start this contract, </p>
          <button
            onClick={() =>
              handleBidForJob(
                client,
                jobTitle,
                budget,
                executionDuration,
                id,
                deadline
              )
            }
            // to={`/deal/escrow/${id}`}
            className="px-2 text-sm  font-semibold place-items-center text-green-600"
          >
            click here.
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
