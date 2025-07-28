import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import Empty from "../Dashboard/Invoices/Empty";
import { ArrowRight } from "react-huge-icons/solid";
import { Link } from "react-router-dom";
import { openEscrow } from "../../../../../States/Slices/escrow";
const Disputes = () => {
  const dispatch = useAppDispatch();
  const { disputes } = useAppSelector((store) => store.disputeSlice);

  //   console.log("disputes", disputes);
  const handleOpenEscrow = (escrowID: number) => {
    const escrow =
      disputes[disputes.findIndex((escrow) => escrow.escrowID == escrowID)];

    dispatch(openEscrow(escrow));
  };

  const { isConnected } = useAppSelector((store) => store.walletSlice);

  if (!isConnected) {
    return (
      <div className="relative flex justify-center items-center flex-col h-screen w-full">
          {/* <BreadCrumb title="Open Disputes" useLink={false} linkTitle="" /> */}
        <Empty message={"Connect wallet to proceed"} />
      </div>
    );
  }

  if (disputes.length == 0) {
    return (
      <div className="relative flex justify-center items-center h-screen w-full">
        <p className="text-purple-400 text-2xl">NO OPEN ESCROW YET.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative px-28  max-sm:px-1">
        <BreadCrumb title="Open Disputes" useLink={false} linkTitle="" />
        <div className="relative h-[24rem] max-sm:h-[90vh] max-sm:w-full  bg-gray-100 rounded-lg  flex max-sm:flex-col gap-2 justify-start  mt-4 items-start">
          <div className="relative h-[24rem] max-sm:h-screen max-sm:w-full w-1/2 px-2  max-sm:px-0 bg-gray-100 rounded-lg  flex max-sm:flex-col gap-2 justify-start  mt-4 items-start">
            {disputes.map(({ isCompleted, escrowID }) => (
              <div
                key={escrowID}
                className=" max-sm:w-full w-1/2 p-2 flex flex-col gap-2 rounded-tl-lg bg-purple-400 border-l-8 border-b-8 border-purple-900 rounded-br-lg h-auto rounded-bl-none shadow-md"
              >
                <h3 className="text-lg rounded-md text-white bg-purple-400 p-1  font-semibold">
                  Dispute ID: {escrowID}
                </h3>
                <p className="text-white">
                  Status: {isCompleted ? "Resolved" : "Pending"}
                </p>

                <div className="relative flex justify-end items-center">
                  <Link
                    to={`/deal/escrow/${escrowID}`}
                    onClick={() => handleOpenEscrow(escrowID)}
                    className="cursor-pointer text-white flex justify-start items-center"
                  >
                    <p>View dispute </p>{" "}
                    <ArrowRight className="text-2xl text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Disputes;
