import { BoxFavorite, TimeQuarter } from "react-huge-icons/outline";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import JobCard from "../../../Tools/Finance/Job/JobCard";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import { AddRectangle, LoadingDashed } from "react-huge-icons/solid";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import { useState } from "react";
import MarketplaceForm from "./MarketplaceForm";
import useSmartContractController from "../../../../Web3/Credentials/Index";

const TrustTradePage = () => {
  const { jobs } = useAppSelector((store) => store.marketplaceSlice);
  const { loading } = useAppSelector((store) => store.walletSlice);
  const { currentJobSelected } = useAppSelector(
    (store) => store.marketplaceSlice
  );
  const { handleBidForJob } = useSmartContractController();

  const [isToggled, setIsTOggled] = useState(false);

  if (jobs.length == 0) {
    return (
      <div className="relative flex justify-center items-center h-screen w-full">
        <h1 className="text-xl font-bold text-purple-500">
          No jobs available at the moment.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative px-28  max-sm:px-1 ">
      {isToggled && (
        <Overlay
          children={<MarketplaceForm isToggled setIsToggled={setIsTOggled} />}
        />
      )}

      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-purple-600 animate-spin" />
          }
        />
      )}

      <div className="fixed z-20 flex justify-center items-center bottom-0 right-5  w-1/5 h-48">
        <AddRectangle
          className="text-7xl text-purple-500"
          onClick={() => setIsTOggled(!isToggled)}
        />
      </div>
      <BreadCrumb title="Business Deals" useLink={false} linkTitle="" />
      <div className="relative flex    rounded-tl-lg h-[44rem] max-sm:h-auto justify-start items-center   gap-2 w-full ">
        <div className="relative w-3/6 flex flex-col p-2  max-sm:h-auto max-sm:w-full  h-[44rem]   rounded-tl-lg pb-2">
          {" "}
          <div className="relative max-sm:p-0  flex flex-col-reverse overflow-y-auto w-full  h-auto gap-1  rounded-lg max-sm:gap-1 max-sm:mt-2">
            {jobs.map(
              ({
                id,
                jobTitle,
                description,
                budget,
                client,
                executionDuration,
                executionStatus,
                postedAt,
                category,
                deadline,
              }) => (
                <JobCard
                  key={id}
                  id={id}
                  deadline={deadline}
                  jobTitle={jobTitle}
                  description={description}
                  client={client}
                  budget={budget}
                  category={category}
                  postedAt={postedAt}
                  executionStatus={executionStatus}
                  executionDuration={executionDuration}
                />
              )
            )}
          </div>
        </div>
        <div className="relative pb-2  p-3 rounded-lg w-3/6 h-[44rem] overflow-y-scroll max-sm:hidden">
          <div className="relative flex flex-col overflow-y-scroll  gap-3 ">
            <h1 className="text-[24px] font-extrabold text-purple-600">
              JOB INFORMATION .
            </h1>

            <br />
            <h1 className="text-[16px] font-extrabold text-purple-600">
              {currentJobSelected.jobTitle}
            </h1>

            <div className="w-full h-3/4 ">
              <pre className="whitespace-pre-wrap">
                {" "}
                <p className="text-gray-400">
                  {currentJobSelected.description}
                </p>{" "}
              </pre>
            </div>

            <div className="relative flex justify-between flex-col gap-2 items-start w-full">
              <span className="p-2 bg-purple-200 text-purple-600 text-[14px] w-3/6 max-sm:w-full flex justify-between items-center   rounded-md text-center">
                <p className="inline text-purple-100 bg-purple-600  w-1/2 rounded-sm p-1">
                  client{" "}
                </p>{" "}
                <p className="inline text-purple-800 w-1/2 p-1 bg-purple-300 ">
                  {currentJobSelected.client.slice(0, 5)}
                </p>
              </span>
              <span className="p-2 bg-purple-200 text-purple-600 text-[14px] w-3/6 max-sm:w-full flex justify-between items-center   rounded-md text-center">
                <p className="inline text-purple-100 bg-purple-600  w-1/2 rounded-sm p-1">
                  budget{" "}
                </p>
                <p className="inline text-green-800 w-1/2 p-1 bg-green-300 ">
                  $EBT {currentJobSelected.budget}
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
                          statusIndicator.id !=
                          currentJobSelected.executionStatus
                            ? "border-purple-900 border"
                            : "border-gray-700 bg-purple-400"
                        }  `}
                      />
                      <span
                        className={`relative rounded-full  ${
                          statusIndicator.id ==
                            currentJobSelected.executionStatus &&
                          "bg-purple-600"
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

            <div className="relative w-full flex flex-col items-start h-auto gap-2  p-2">
              <div className="relative flex justify-start  items-center gap-2 ">
                {" "}
                <BoxFavorite className="text-xl inline  text-purple-500" />{" "}
                <p className="inline font-bold text-[12px]  text-purple-500">
                  Job category - {currentJobSelected.category}
                </p>
              </div>
              <div className="relative flex justify-between items-center gap-2 ">
                {" "}
                <TimeQuarter className="text-xl inline  text-purple-500" />{" "}
                <p className="inline font-bold text-[12px]  text-purple-500">
                  Posted At- {currentJobSelected.postedAt}
                </p>
              </div>{" "}
            </div>

            <div className="relative h-full flex rounded-br-lg rounded-bl-lg justify-start items-center  w-full bg-gradient-to-tr p-2 gap-2 ">
              <p>In order to start this contract, </p>
              <button
                onClick={() =>
                  handleBidForJob(
                    currentJobSelected.client,
                    currentJobSelected.jobTitle,
                    currentJobSelected.budget,
                    currentJobSelected.executionDuration,
                    currentJobSelected.id,
                    currentJobSelected.deadline
                  )
                }
                // to={`/new-deal/escrow/${currentJobSelected.id}`}
                className="px-2  font-semibold place-items-center text-green-600"
              >
                click here.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustTradePage;
