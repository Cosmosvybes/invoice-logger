import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import { useAppSelector } from "../../../../../States/hoooks/hook";
import useSmartContractController from "../../../../Web3/Credentials/Index";
import { LoadingDashed } from "react-huge-icons/bulk";
import { Input } from "reactstrap";
import {
  Activity,
  ArrowTransferRectangle,
  CheckCircle,
  CoinDollar,
  Deal,
  Login,
  Logout,
  MoneyArrowDown,
  Send,
  UsersDouble,
  UsersTriple,
} from "react-huge-icons/solid";
import BUYINGFORM from "./BUYINGFORM";
import Paginate from "../../../Tools/Layout/Paginate/Paginate";
import Overlay from "./_OverlayComp/Overlay";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useEffect } from "react";

const Subscription = () => {
  const Transaction = ({
    from,
    amount,
    date,
    category,
  }: {
    from: string;
    amount: string;
    date: string;
    category: string;
  }) => {
    return (
      <>
        <div className="relative ">
          <div className="relative flex flex-col gap-0.5 mt-2">
            <div className=" shadow w-full rounded-tr-lg rounded-tl-lg  flex p-2 justify-between items-center ">
              <h1 className="text-purple-500 text-[12px]">{date}</h1>
              <h1
                className={` flex items-center justify-normal gap-0.5 text-[12px] ${
                  category == "Internal swap" ||
                  category == "Invoicing" ||
                  category == "sent" ||
                  category == "Job listing" ||
                  category == "Bidding & Proposal"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {category}{" "}
                <CheckCircle
                  className={` ${
                    category == "Internal swap" ||
                    category == "sent" ||
                    category == "Invoicing" ||
                    category == "Job listing" ||
                    category == "Bidding & Proposal"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                />{" "}
              </h1>
            </div>
            <div className="relative flex flex-row justify-between items-center bg-gray-100 p-2 rounded-bl-lg rounded-br-lg ">
              <div className="relative flex justify-between gap-2 items center">
                <span className="relative">
                  {category == "Internal swap" || category == "sent" ? (
                    <ArrowTransferRectangle className="text-yellow-500 text-4xl" />
                  ) : (
                    <MoneyArrowDown
                      className={`text-green-500 text-4xl ${
                        category == "Internal swap" ||
                        category == "sent" ||
                        category == "Invoicing" ||
                        category == "Job listing" ||
                        category == "Bidding & Proposal"
                          ? "text-red-600"
                          : "text-green-600"
                      }  `}
                    />
                  )}
                </span>
                <span className="flex justify-center gap-2 items-center w-auto">
                  <h1 className="text-gray-400">hash -</h1>{" "}
                  <p className=" text-sm text-gray-400">
                    {from.slice(0, 6) + "..." + from.slice(20, 28)}
                  </p>
                </span>
              </div>

              <span className="flex flex-col w-auto justify-center items-center ">
                <h1
                  className={`text-[12px] ${
                    category == "sent" ||
                    category == "Invoicing" ||
                    category == "Internal swap" ||
                    category == "Job listing" ||
                    category == "Bidding & Proposal"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  $EBT{" "}
                </h1>{" "}
                <p
                  className={`${
                    category == "sent" ||
                    category == "Internal swap" ||
                    category == "Invoicing" ||
                    category == "Job listing" ||
                    category == "Bidding & Proposal"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {
                    <span>
                      {" "}
                      {category == "sent" ||
                      category == "Internal swap" ||
                      category == "Invoicing" ||
                      category == "Job listing"
                        ? "-" + Number(amount) / 100
                        : "+" + Number(amount) / 100}
                    </span>
                  }
                </p>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const {
    handleConnectWallet,
    handleDisconnect,
    handleRedeemToken,
    balance,
    handleSendEBT,
    isToggled,
    handleOpenSendingForm,
    recipient,
    active,
    handleRecipientChange,
    handleAmountChange,
    purchaseFormToggle,
    swapTokenToggle,
    handleSetBuyTokenForm,
    handleSwapTokenForm,
    transactionHistory,
    handlePageChange,
    currentTransactions,
    transactionPerPage,
    handleApproval,
    handleGetTransactionHistory,
    currentPage,
    // getEscrows,
  } = useSmartContractController();

  const { isConnected, loading } = useAppSelector((state) => state.walletSlice);
  const { escrows } = useAppSelector((state) => state.escrowSlice);
  const { userDeals } = useAppSelector((state) => state.marketplaceSlice);
  const { disputes } = useAppSelector((state) => state.disputeSlice);
  // useDashboardController();

  useEffect(() => {
    async function loadHistory() {
      await handleGetTransactionHistory();
    }
    loadHistory();
  }, [isConnected]);

  const SENDINGFORM = ({
    amounts,
    isUsingInputForm,
    isUsingAmounts,
    closehandler,
    actionHandler,
    header,
  }: {
    amounts: any[];
    isUsingAmounts: boolean;
    isUsingInputForm: boolean;
    closehandler: () => void;
    actionHandler: () => void;
    header: string;
  }) => {
    return (
      <>
        <div className="relative w-1/2 max-sm:w-full h-auto max-sm:h-auto bg-white rounded-lg flex flex-col justify-start items-start gap-4 p-2 shadow-lg">
          <div className="relative flex justify-between gap-3 w-full items-center">
            <h1 className="text-[16px] text-purple-600">{header}</h1>{" "}
            <button
              onClick={closehandler}
              className="w-20 p-1 rounded-md bg-red-500 text-white"
            >
              close{" "}
            </button>
          </div>
          <br />
          <div className="relative flex w-96 max-sm:w-full flex-col gap-5">
            {isUsingInputForm && (
              <Input
                required
                value={recipient}
                onChange={handleRecipientChange}
                type="text"
                placeholder="Receiver's Address"
                className="outline-none  h-10 w-full p-4 bg-gray-50 rounded-md"
              />
            )}

            {isUsingAmounts && (
              <div className="relative flex-col w-full">
                <h1 className="text-purple-600 text-center">CHOOSE AMOUNT</h1>
                <br />
                <div className="relative flex   max-sm:w-full  justify-center items-center">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      className={`border p-2 place-items-center w-14 ${
                        active == amount
                          ? "bg-gray-50 text-purple-500"
                          : "bg-purple-500 text-white"
                      } rounded-lg m-2`}
                      onClick={() => handleAmountChange(amount)}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="relative p-2 w-full ">
              {" "}
              <button
                onClick={actionHandler}
                className="bg-purple-600 text-white p-3 w-full rounded-lg"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="relative px-28 h-screen  max-sm:px-1">
        <BreadCrumb title="Finance Overview" useLink={false} linkTitle="" />

        {purchaseFormToggle && (
          <Overlay
            children={<BUYINGFORM closeHandler={handleSetBuyTokenForm} />}
          />
        )}
        {isToggled && (
          <Overlay
            children={
              <SENDINGFORM
                header="SEND EBT"
                isUsingAmounts={true}
                actionHandler={handleSendEBT}
                amounts={[10, 50, 100, 500, 1000]}
                isUsingInputForm={true}
                closehandler={handleOpenSendingForm}
              />
            }
          />
        )}

        {swapTokenToggle && (
          <Overlay
            children={
              <SENDINGFORM
                header="SWAP AMOUNT"
                isUsingAmounts={true}
                actionHandler={handleRedeemToken}
                amounts={[50, 100, 200, 500, 1000]}
                isUsingInputForm={false}
                closehandler={handleSwapTokenForm}
              />
            }
          />
        )}

        {loading && (
          <Overlay
            children={
              <LoadingDashed className="text-5xl text-purple-600 animate-spin z-30" />
            }
          />
        )}

        <div className="relative  flex flex-col w-full justify-between h-auto">
          <div className="relativ flex justify-between w-full max-sm:flex-col-reverse ">
            <div className="relative rounded-lg w-1/2 max-sm:w-full  h-auto">
              <div className="relative   py-2  rounded-md h-auto text-[28px] px-2 max-sm:px-3 flex flex-col w-full  justify-start items-start ">
                <div className="relative w-full border bg-purple-200 mt-1 grid grid-cols-2 rounded-lg h-[10rem] ">
                  {[
                    {
                      id: 1,
                      icon: <Activity className="text-xl text-purple-600" />,
                      title: "$EBT",
                      value: isConnected ? Number(balance) / 100 : 0,
                    },
                    ,
                    {
                      id: 3,
                      icon: <UsersDouble className="text-xl text-purple-600" />,
                      title: "Listings",
                      value: userDeals.length,
                    },
                    {
                      id: 21,
                      icon: <Deal className="text-xl text-purple-600" />,
                      title: "Escrow",
                      value: escrows.length,
                    },
                    {
                      id: 51,
                      icon: <UsersTriple className="text-xl text-purple-600" />,
                      title: "Disputes",
                      value: disputes.length,
                    },
                  ].map((data) => (
                    <div
                      key={data?.id}
                      className="relative w-full border-b h-full  flex p-2 justify-start items-center "
                    >
                      <div className="relative  w-full h-full flex justify-center gap-4 items-center">
                        <div className="relative flex justify-center items-center rounded-full h-8 w-8">
                          {data?.icon}
                        </div>
                        <div className="relative w-1/2 h-auto block">
                          <p className="text-purple-500 text-[14px] font-normal">
                            {data?.title}
                          </p>
                          <p className="text-purple-500 text-[12px] font-bold">
                            {data?.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative max-sm:h-auto h-16 w-full mt-5 p-1  place-items-center b flex justify-start max-sm:grid max-sm:grid-cols-3 max-sm:w-full  gap-2   rounded-lg  ">
                  <button
                    className=" gap-2 w-1/3 max-sm:w-full  flex justify-between items-center p-4 bg-purple-900 text-white  h-full max-sm:h-12 rounded-md  text-[10px]"
                    onClick={handleSetBuyTokenForm}
                  >
                    {" "}
                    BUY <CoinDollar className="text-2xl inline text-white" />
                  </button>
                  <button
                    className=" rounded-md gap-2 w-1/3 max-sm:w-full  flex justify-between items-center p-4 bg-purple-900 text-white  h-full max-sm:h-12  text-[10px]"
                    onClick={handleOpenSendingForm}
                  >
                    {" "}
                    SEND <Send className="text-2xl inline text-white" />
                  </button>
                  <button
                    className="rounded-md gap-2 w-1/3 max-sm:w-full  flex justify-between items-center p-4 bg-purple-900 text-white  h-full max-sm:h-12  text-[10px]"
                    onClick={handleSwapTokenForm}
                  >
                    {" "}
                    SWAP{" "}
                    <ArrowTransferRectangle className="text-2xl inline text-white" />
                  </button>
                </div>
                <div className="relative mt-4  ml-1 w-full gap-2 flex">
                  <p className="text-sm text-gray-400">
                    To approve etherbill for spending,
                  </p>
                  <button
                    onClick={handleApproval}
                    className="text-sm font-[12px] text-purple-500 visited:text-purple-500 hover:text-purple-600"
                  >
                    {" "}
                    click here.
                  </button>
                </div>
              </div>
            </div>

            <div className="relative px-2 w-1/2 max-sm:w-full">
              <div className="relative h-10 gap-2  flex justify-end items-center ">
                {!isConnected ? (
                  <button
                    onClick={handleConnectWallet}
                    className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white   text-[10px]"
                  >
                    <p>connect </p>{" "}
                    <Login className="text-2xl inline text-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnect}
                    className=" rounded-lg gap-2  bg-purple-900 flex justify-between items-center p-2 text-white text-[10px]"
                  >
                    <p>disconnect </p>{" "}
                    <Logout className="text-2xl inline text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <section className="relative px-2 w-2/4  mt-2 max-sm:ml-0 flex flex-col h-auto  max-sm:w-full py-2 bg-gray-100 rounded-lg ">
            <h1 className=""> {`TRANSACTION HISTORY`} </h1>
            <div className="relative flex flex-col gap-1 ">
              {currentTransactions.map((transaction) => (
                <Transaction
                  key={transaction.date + Math.random() + Math.random() + 342}
                  from={transaction.addressFrom}
                  amount={transaction.amount}
                  category={transaction.category}
                  date={transaction.date}
                />
              ))}
            </div>
            <br />
            <Paginate
              totalItems={transactionHistory.length}
              onPageChange={handlePageChange}
              itemsPerPage={transactionPerPage}
              currentPage={currentPage}
            />
          </section>

          {/* <form>
            <label>
              <input onChange={handleFileUpload} type="file" value="" multiple />
            </label>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default withAuth(Subscription);
