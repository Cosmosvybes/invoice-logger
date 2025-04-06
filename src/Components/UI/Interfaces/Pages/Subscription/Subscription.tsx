import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import { useAppSelector } from "../../../../../States/hoooks/hook";
import useSmartContractController from "../../../../Web3/Credentials/Index";
import { LoadingDashed } from "react-huge-icons/bulk";
import { Input } from "reactstrap";
import useDashboardController from "../Dashboard";
import {
  ArrowTransferRectangle,
  CheckCircle,
  CoinDollar,
  Login,
  Logout,
  MoneyArrowDown,
  Send,
} from "react-huge-icons/solid";
import BUYINGFORM from "./BUYINGFORM";
import Paginate from "../../../Tools/Layout/Paginate/Paginate";
import Overlay from "./_OverlayComp/Overlay";

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
            <div className="relative w-full shadow rounded-tr-lg rounded-tl-lg  flex p-2 justify-between items-center ">
              <h1 className="text-purple-500 text-[12px]">{date}</h1>
              <h1
                className={` flex items-center justify-normal gap-0.5 text-[12px] ${
                  category == "Internal swap" ||
                  category == "Invoicing" ||
                  category == "sent"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {category}{" "}
                <CheckCircle
                  className={` ${
                    category == "Internal swap" ||
                    category == "sent" ||
                    category == "Invoicing"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                />{" "}
              </h1>
            </div>
            <div className="relative flex flex-row justify-between items-center bg-gray-100 p-2 rounded-bl-lg rounded-br-lg shadow">
              <span className="relative">
                {category == "Internal swap" || category == "sent" ? (
                  <ArrowTransferRectangle className="text-yellow-500 text-4xl" />
                ) : (
                  <MoneyArrowDown
                    className={`text-green-500 text-4xl ${
                      category == "Internal swap" ||
                      category == "sent" ||
                      category == "Invoicing"
                        ? "text-red-600"
                        : "text-green-600"
                    }  `}
                  />
                )}
              </span>
              <span className="flex justify-center gap-1 items-center w-auto">
                <h1 className="text-purple-700">Hash -</h1>{" "}
                <p className=" text-sm text-purple-600">
                  {from.slice(0, 6) + "..." + from.slice(20, 28)}
                </p>
              </span>
              <span className="flex flex-col w-auto justify-center items-center ">
                <h1
                  className={`text-[12px] ${
                    category == "sent" ||
                    category == "Invoicing" ||
                    category == "Internal swap"
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
                    category == "Invoicing"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {
                    <span>
                      {" "}
                      {category == "sent" ||
                      category == "Internal swap" ||
                      category == "Invoicing"
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
    getAccountBalance,
    handlePageChange,
    currentTransactions,
    transactionPerPage,
  } = useSmartContractController();

  const { isConnected, loading } = useAppSelector((state) => state.walletSlice);
  useDashboardController();

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
        <div className="relative w-1/2 max-sm:w-full h-1/2 max-sm:h-auto bg-white rounded-lg flex flex-col justify-start items-start gap-4 p-2 shadow-lg">
          <div className="relative flex justify-between gap-5 w-full items-center">
            <h1 className="text-[16px] text-purple-600">{header}</h1>{" "}
            <button
              onClick={closehandler}
              className="w-20 p-1 rounded-md bg-red-500 text-white  a"
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
      <div className="relative px-28  max-sm:px-1">
        <BreadCrumb title="Finance" useLink={false} linkTitle="" />
        <br />
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
            children={<LoadingDashed className="text-2xl text-purple-500" />}
          />
        )}
        <div className="relative flex  flex-col">
          <div className="relative   rounded-md h-auto text-[24px] px-2 flex flex-row  justify-between items-center ">
            <h1
              onClick={getAccountBalance}
              className="font-extrabold text-[20px] text-purple-800"
            >
              {" "}
              {`$EBT ${isConnected ? Number(balance) / 100 : 0} `}
            </h1>
            <div className="relative h-12 gap-2  flex justify-start items-center ">
              {!isConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className=" rounded-lg gap-2  flex justify-between items-center p-2 bg-purple-900 text-white   text-[10px]"
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

          <div className="relative h-28 gap-4  place-items-center grid grid-cols-3   max-sm:grid max-sm:grid-cols-3 max-sm:w-full rounded-lg  ">
            <button
              className=" rounded-lg gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
              onClick={handleSetBuyTokenForm}
            >
              {" "}
              BUY <CoinDollar className="text-2xl inline text-white" />
            </button>
            <button
              className=" rounded-lg gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
              onClick={handleOpenSendingForm}
            >
              {" "}
              SEND <Send className="text-2xl inline text-white" />
            </button>
            <button
              className=" rounded-lg gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
              onClick={handleSwapTokenForm}
            >
              {" "}
              SWAP{" "}
              <ArrowTransferRectangle className="text-2xl inline text-white" />
            </button>
          </div>

          <section className="relative flex flex-col h-auto bg-gray-50 p-2 mt-4 rounded-lg shadow">
            <h1 className=""> {`TRANSACTION HISTORY`} </h1>
            <div className="relative flex flex-col gap-1 mt-4">
              {currentTransactions.map((transaction) => (
                <Transaction
                  key={transaction.date}
                  from={transaction.addressFrom}
                  amount={transaction.amount}
                  category={transaction.category}
                  date={transaction.date}
                />
              ))}
            </div>
            <br />
            <Paginate
              invoices={transactionHistory}
              paginateHandler={handlePageChange}
              postsPerPage={transactionPerPage}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Subscription;
