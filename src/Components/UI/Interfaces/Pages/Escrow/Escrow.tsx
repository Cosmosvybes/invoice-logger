import {
  BriefcaseTwoLocks,
  Deal,
  LoadingDashed,
  TimeClock,
  User,
} from "react-huge-icons/solid";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import { useAppSelector } from "../../../../../States/hoooks/hook";
import useSmartContractController from "../../../../Web3/Credentials/Index";
import { useEffect, useState } from "react";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
// import { StopwatchMinus } from "react-huge-icons/outline";

const Escrow = () => {
  const {
    handleCLoseEscrow,
    handleStartJob,
    getEscrows,
    handleMarkJobAsComplete,
    handleReleaseFunds,
    handleGetJobStatus,
  } = useSmartContractController();
  const { currentEscrow } = useAppSelector((store) => store.escrowSlice);
  const { address, loading } = useAppSelector((store) => store.walletSlice);
  const [jobStatus, setJobStatus] = useState<any>(1);

  useEffect(() => {
    async function runGetJobStatus() {
      const status = await handleGetJobStatus(currentEscrow._jobID);
      setJobStatus(status);
    }
    runGetJobStatus();
    getEscrows();
  }, []);
  // console.log(currentEscrow)
  return (
    <>
      <div className="relative px-28  max-sm:px-1">
        <BreadCrumb
          title={`Escrow #${String(currentEscrow.escrowID)}`}
          useLink={false}
          linkTitle=""
        />

        {loading && (
          <Overlay
            children={
              <div className="flex justify-center items-center">
                {" "}
                <LoadingDashed className="animate-spin text-5xl text-purple-600" />
              </div>
            }
          />
        )}

        <div className="relative w-full flex rounded-lg justify-between max-sm:flex-col h-[44rem]  max-sm:h-auto  mt-3 max-sm:mt-0">
          <div className="relative w-1/2 max-sm:w-full h-full max-sm:flex-col-reverse bg-gray-100 flex justify-between gap-2 p-2">
            <div className="relative w-1/2 flex gap-1 flex-col max-sm:flex-row-reverse max-sm:w-full  h-full">
              <div className="relative w-full max-sm:rounded-lg rounded-tr-lg rounded-tl-lg flex justify-between p-4  flex-col bg-purple-200   h-1/2">
                <div className="relative h-1/5 max-sm:w-full max-sm:flex-col  flex justify-between items-center p-4">
                  <div className="relative  rounded-full bg-purple-400 p-2">
                    {" "}
                    <Deal className="text-2xl text-purple-600" />{" "}
                  </div>
                  <h1 className="text-xl text-purple-500 max-sm:text-sm font-extrabold">
                    #client
                  </h1>
                </div>

                <span className="relative w-full flex justify-center items-center">
                  <h1 className="text-xl max-sm:text-sm text-purple-500 font-semibold">
                    {currentEscrow.client.slice(0, 4) +
                      "..." +
                      currentEscrow.client.slice(39, 42)}
                  </h1>
                </span>
              </div>

              <div className="relative w-full flex justify-between p-4 flex-col max-sm:rounded-lg  max-sm:w-full bg-purple-200 rounded-br-lg rounded-bl-lg h-1/2">
                <div className="relative h-1/5  max-sm:flex-col  max-sm:w-full  flex justify-between items-center p-4">
                  <div className="relative rounded-full bg-gray-100 p-2">
                    <User className="text-2xl text-purple-600" />
                  </div>
                  <h1 className="text-xl text-purple-500  max-sm:text-sm font-extrabold">
                    #worker
                  </h1>
                </div>

                <span className="relative w-full flex justify-center items-center">
                  <h1 className="text-xl text-purple-500 font-semibold max-sm:text-sm">
                    {currentEscrow.worker.slice(0, 4) +
                      "..." +
                      currentEscrow.worker.slice(39, 42)}
                  </h1>
                </span>
              </div>
            </div>

            <div className="relative w-1/2 h-full max-sm:w-full rounded-tr-lg rounded-tl-lg   flex-col  flex justify-between ">
              <div className="relative  rounded-tr-lg rounded-tl-lg  flex gap-2 flex-col h-4/5 bg-purple-200 p-2 ">
                <h1 className="text-center font-extrabold text-purple-400 text-[20px]">
                  Deal status
                </h1>

                <span className="p-2 bg-purple-200 text-purple-600 text-[14px] w-full max-sm:w-full justify-between flex  items-center   rounded-md text-center">
                  <p className="inline text-purple-100 bg-purple-600  w-1/2 rounded-sm p-1">
                    status
                  </p>
                  <p
                    className={`line  w-1/2 p-1 ${
                      currentEscrow.isCompleted
                        ? "text-white bg-red-600"
                        : "bg-amber-300 text-yellow-800"
                    } `}
                  >
                    {currentEscrow.isCompleted ? "closed" : "open"}
                  </p>
                </span>
                <div className="relative text-center h-60 max-sm:h-28  w-full flex-col flex justify-center items-center border-b">
                  <div className="relative w-14 h-14 rounded-full flex justify-center items-center bg-gray-300">
                    <div className="relative rounded-full w-10 h-10 flex justify-center items-center bg-purple-300  p-2">
                      {" "}
                      <BriefcaseTwoLocks className="text-2xl text-purple-600" />{" "}
                    </div>
                  </div>
                  <div className="h-8 w-1/7 rounded-lg  px-2 font-semibold  place-items-center text-purple-600">
                    {" "}
                    <p
                      className={`${
                        currentEscrow.inDispute
                          ? "text-red-600 p-1 rounded-md  bg-red-200"
                          : "text-purple-600"
                      }`}
                    >
                      {currentEscrow.inDispute
                        ? "Transaction in dispute"
                        : "Everything OK."}
                    </p>
                  </div>
                </div>
              </div>

              <span className="relative w-full rounded-bl-lg rounded-br-lg bg-purple-300 h-1/5 flex flex-col justify-center items-center p-2 text-sm">
                <h1 className="text-md text-purple-500 font-semibold">
                  Before you click the "Mark as complete" button, ensure that
                  your read, understand and agree to the contract terms and
                  agreement.
                </h1>
              </span>
            </div>
          </div>

          <div className="relative w-1/2 h-full max-sm:w-full  rounded-bl-lg rounded-br-lg bg-gray-white p-2 ">
            <div className="relative h-1/6 flex rounded-tr-lg rounded-tl-lg justify-start items-center  w-full bg-gradient-to-tr p-2 gap-2 from-purple-200 to-purple-950">
              <div className="relative w-10 h-10  flex justify-center bg-gray-100 rounded-lg items-center">
                <TimeClock className="text-2xl text-purple-600" />{" "}
              </div>
              <p className="text-xl font-semibold  text-black">
                Waiting for action.
              </p>
            </div>

            <div className="relative h-5/6  flex gap-4 flex-col  p-2">
              <h1 className="text-2xl font-extrabold">Agreements</h1>

              <div className="relative flex justify-between w-full">
                <div className="relative flex justify-start gap-2 mt-2">
                  <p className="text-purple-500  max-sm:text-sm">
                    Deal Execution duration -{" "}
                  </p>{" "}
                  <p className="text-gray-400"> </p>
                  <p className="text-gray-500 max-sm:text-sm">
                    {currentEscrow.jobDuration}
                  </p>
                </div>
              </div>

              {currentEscrow.worker.toUpperCase() ==
                String(address).toUpperCase() && (
                <div className="relative flex justify-between w-full">
                  <div className="relative flex items-center justify-start gap-2 mt-2">
                    <p className="text-purple-500   max-sm:text-sm">
                      Next step -
                    </p>{" "}
                    {/* <p className="text-gray-400"> {">"}</p> */}
                    <p className="text-gray-500 text-sm"> Are you ready ? </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        handleStartJob(
                          currentEscrow._jobID,
                          currentEscrow.escrowID
                        )
                      }
                      className="h-8 w-1/7 rounded-lg max-sm:w-6/7 px-2 hover:text-white hover:bg-purple-800 bg-purple-200 font-semibold border place-items-center text-purple-600"
                    >
                      {" "}
                      Yes,please.
                    </button>
                  </div>
                </div>
              )}

              <div className="relative p-3 w-full h-auto  bg-purple-200 rounded-lg">
                <h1 className="text-md font-bold">{currentEscrow.jobTitle}</h1>

                <div className="relative max-sm:place-items-start gap-2 flex flex-col justify-between w-full mt-4">
                  <div className="relative flex items-center justify-center gap-2">
                    <h3 className="text-xl text-purple-600 max-sm:text-sm font-extrabold">
                      $EBT {currentEscrow.budget}
                    </h3>{" "}
                    <button className="h-8 w-1/7 rounded-lg max-sm:w-6/7 px-2 bg-green-200 font-semibold border place-items-center text-green-600">
                      Funded
                    </button>
                  </div>
                  <div className="relative w-1/7 max-sm:w-6/7 gap-2 flex justify-center items-center">
                    <TimeClock className="text-sm inline font-light text-purple-600" />
                    <p className="text-purple-600 text-sm">
                      Started at -{" "}
                      {currentEscrow.startTime
                        ? currentEscrow.startTime
                        : "Job not started"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-start gap-4">
                <h1 className="text-xl font-extrabold">Job execution status</h1>
                <span className="text-gray-500 max-sm:text-sm bg-gray-purple">
                  {[
                    { id: 0, title: "pending" },
                    { id: 1, title: "started" },
                    { id: 2, title: "cancelled" },
                    { id: 3, title: "completed" },
                  ].map((statusIndicator) => (
                    <p
                      className={`text-sm ${
                        jobStatus == 0 && "text-amber-600"
                      } ${jobStatus == 1 && "text-blue-600"}  ${
                        jobStatus == 3 && "text-green-600"
                      }   ${jobStatus == 2 && "text-red-600"} `}
                    >
                      {jobStatus == statusIndicator.id && statusIndicator.title}
                    </p>
                  ))}
                </span>
              </div>

              {currentEscrow.worker.toUpperCase() ==
                String(address).toUpperCase() && (
                <div className="relative flex flex-col items-center justify-start gap-3  max-sm:flex-col  h-14 max-sm:h-auto  w-full">
                  <div className="relative max-sm:w-full max-sm:p-2">
                    <p className="text-purple-400 max-sm:text-sm">
                      Consider clicking the green button if the job is done
                      completely, Thank you.
                    </p>
                  </div>

                  <div className="relative w-full  flex jusify-between items-center  gap-2 max-s:gap-4 max-sm:w-full">
                    <button
                      disabled={
                        currentEscrow.isCompleted ||
                        jobStatus == 2 ||
                        jobStatus == 3
                      }
                      onClick={() =>
                        handleMarkJobAsComplete(
                          currentEscrow._jobID,
                          currentEscrow.escrowID
                        )
                      }
                      className="w-1/2 h-[4rem] rounded-lg   max-sm:w-1/2  max-sm:h-12  px-2 bg-green-200 font-semibold outline-none place-items-center text-green-600"
                    >
                      Mark as complete
                    </button>
                    <button
                      onClick={() => handleCLoseEscrow(currentEscrow.escrowID)}
                      className=" w-1/2 h-[4rem] rounded-lg outline-none  max-sm:h-12  max-sm:w-1/2 px-2 bg-red-200 font-semibold  place-items-center text-red-600"
                    >
                      Close escrow
                    </button>
                  </div>
                </div>
              )}

              {currentEscrow.client.toUpperCase() ==
                String(address).toUpperCase() && (
                <div className="relative flex flex-col items-center justify-start gap-3  max-sm:flex-col  h-14 max-sm:h-auto  w-full">
                  <div className="relative max-sm:w-full max-sm:p-2">
                    <p className="text-purple-400 max-sm:text-sm">
                      Consider clicking the green button to release funds when
                      the job is done completely, Thank you.
                    </p>
                  </div>

                  <div className="relative w-full  flex jusify-between items-center  gap-2 max-s:gap-4 max-sm:w-full">
                    <button
                      disabled={jobStatus != 3}
                      onClick={() => handleReleaseFunds(currentEscrow.escrowID)}
                      className="w-1/2 h-[4rem] rounded-lg   max-sm:w-full  max-sm:h-12  px-2 bg-purple-600 font-semibold outline-none place-items-center hover:bg-purple-700 text-white"
                    >
                      Release funds
                    </button>
                  </div>
                </div>
              )}

              <div className="relative h-full mt-5 flex rounded-br-lg rounded-bl-lg justify-start items-center  w-full bg-gradient-to-tr p-2 gap-2 ">
                <p>To open dispute, </p>
                <button className="px-2  font-semibold place-items-center text-red-600">
                  click here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Escrow);
