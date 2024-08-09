import { ArrowRight } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/InvoiceTemplate";
const AccountDetails = () => {
  const { invoices, sent, revenue } = useAppSelector((state) => state.invoice);

  return (
    <>
      <div className="relative h-auto  w-full   flex-col  transition  max-sm:py-2 max-sm:h-auto  flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-auto  w-full  max-sm:w-full rounded-3xl   flex flex-col  gap-3 px-1  font-bold">
          <div className="w-full  mt-5 block relative">
            <p className="text-black px-3 text-xl max-sm:text-sm font-light ">
              Overview
            </p>

            <div className="relative w-full grid gap-5 max-md:gap-5 py-5 px-1 grid-cols-3   max-sm:grid-cols-1">
              <div className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-auto items-left w-full h-32 max-sm:h-24 gap-5 rounded-lg border border-gray-500 ">
                <p className="text-gray-500 text-xl font-bold">All invoice</p>
                <h1 className="text-black text-4xl max-sm:text-xl font-extrabold">
                  {invoices.length}
                </h1>
              </div>
              <div className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-32 max-sm:h-24 gap-5 rounded-lg border border-gray-500">
                <p className="text-gray-500 text-xl font-bold">
                  Outgoing invoices
                </p>
                <h1 className="text-black text-4xl max-sm:text-xl font-extrabold">
                  {sent.length}
                </h1>
              </div>
              <div className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-32 max-sm:h-24 gap-5 rounded-lg border border-gray-500">
                <p className="text-gray-500 text-xl font-bold">Revenue</p>
                <h1 className="text-black text-4xl max-sm:text-xl font-extrabold">
                  ${revenue}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative w-full flex items-center  gap-2 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-600 text-xl font-light ">
                Latest Invoice
              </p>{" "}
              <Link to={"/"} className="text-gray-600 text-xl  font-light">
                View Invoice
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-600 text-xl w-full font-light">Drafts</p>
              <ArrowRight className="text-black text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full flex justify-end ">
            {invoices.length == 0 ? (
              <p className="text-gray-300 text-4xl px-2  ">No invoice yet!</p>
            ) : (
              <div className="relative w-1/3 gap-1 h-auto py-2 flex flex-col-reverse  max-sm:w-full  ">
                {invoices.map((invoice: any) => (
                  <div className="relative" key={invoice.id}>
                    <InvoiceTemplate invoice={invoice} />
                  </div>
                ))}
              </div>
            )}
            {/* //invoice drfats */}
          </div>{" "}
          {/* //Latest invoiceF */}
          <div className="relative w-full max-sm:px-1 justify-between flex  items-center">
            <p className="text-gray-600 text-xl font-light ">
              {" "}
              Recent Invoices
            </p>{" "}
            <Link to={"/"} className="text-gray-600 text-xl  font-light">
              View All <ArrowRight className="text-black text-4xl inline" />
            </Link>{" "}
          </div>
          <div className="relative w-full max-sm:w-auto flex border   flex-col gap-0.5">
            <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-auto">
              <p className="text-gray-100  font-light px-2 text-xl max-sm:text-xs">
                Number
              </p>
              <p className="text-gray-100 font-light text-xl max-sm:text-xs">
                Client
              </p>
              <p className="text-gray-100 font-light text-xl max-sm:text-xs">
                Status
              </p>
              <p className="text-gray-100 font-light text-xl max-sm:text-xs">
                Amount
              </p>
              <p className="text-gray-100 font-light text-xl max-sm:text-xs">
                Date
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
