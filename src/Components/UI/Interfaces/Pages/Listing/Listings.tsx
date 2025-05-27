import { LoadingDashed } from "react-huge-icons/solid";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import Job from "./Job";
import useSmartContractController from "../../../../Web3/Credentials/Index";
import { useEffect } from "react";
import withAuth from "../../../Tools/_helper/Auth/withAuth";

const Listings = () => {
  const { getUsersListedDeals } = useSmartContractController();
  useEffect(() => {
    getUsersListedDeals();
  }, []);
  const { userDeals } = useAppSelector((store) => store.marketplaceSlice);
  const { loading } = useAppSelector((store) => store.walletSlice);

  if (userDeals.length == 0) {
    return (
      <div className="relative flex justify-center items-center h-screen w-full">
        <h1 className="text-xl font-bold text-purple-500">
          YOU HAVE NOT LISTED A DEAL YET.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative px-28  max-sm:px-1 ">
      {loading && (
        <Overlay
          children={
            <div className="flex justify-center items-center">
              <LoadingDashed className="animate-spin text-5xl text-purple-600" />
            </div>
          }
        />
      )}

      <BreadCrumb title="My deals" useLink={false} linkTitle="" />

      <div className="relative w-full flex flex-col max-sm:h-screen max-sm:w-full  h-screen   rounded-tl-lg pb-2">
        <div className="relative h-[24rem] max-sm:w-full  bg-gray-100 rounded-lg p-1 max-sm:p-0 flex max-sm:flex-col gap-1 justify-start  mt-2 items-start">
          {userDeals.map(
            ({ budget, jobTitle, deadline, executionStatus, id }) => (
              <Job
                id={id}
                budget={budget}
                key={id}
                jobTitle={jobTitle}
                deadline={deadline}
                executionStatus={executionStatus}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Listings);
