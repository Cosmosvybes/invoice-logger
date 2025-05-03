import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import { deleteInvoice } from "../../../../../../States/Slices/invoice";
import { MoreVertical } from "react-huge-icons/outline";
import { useLayoutEffect, useRef, useState } from "react";


const InvoiceTemplate = ({ invoice }: { invoice: Invoice }) => {
  const dispatch = useAppDispatch();
  const invoiceOptions = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  function handleCloseOptions(e: Event) {
    if (
      invoiceOptions.current &&
      !invoiceOptions.current.contains(e.target as Node)
    ) {
      setShowOptions(false);
    }
  }

  useLayoutEffect(() => {
    document.body.addEventListener("mousedown", handleCloseOptions);
    return () => {
      document.body.removeEventListener("mousedown", handleCloseOptions);
    };
  }, []);

  return (
    <>
      <div className="relative w-full p-2  gap-2 flex-col  h-auto  flex justify-between items-center">
        {showOptions && (
          <div
            ref={invoiceOptions}
            className="absolute right-1 border-gray-100 border-2 bottom-4   transition duration-500 flex justify-start gap-2 flex-col w-auto h-auto  bg-gray-50  text-center z-20"
          >
            <Link
              to={`/${"invoice/update"}/${invoice.id}`}
              className="text-slate-950 hover:bg-green-900 transition duration-500 hover:text-gray-50 text-xl text-center font-light py-1 px-2 w-full "
            >
              Edit invoice
            </Link>
            {/* <hr /> */}
            <button
              onClick={() =>
                dispatch(
                  deleteInvoice({
                    id: invoice.id,
                    token: String(localStorage.getItem("token")),
                  })
                )
              }
              className="text-slate-950 hover:bg-red-900 transition duration-500 hover:text-gray-50 text-xl text-center 0 font-light py-1 px-2 w-full  "
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="relative w-full  h-auto flex justify-between rounded-lg items-center">
          <div className="relative justify-start items-center ">
            {" "}
            <h1 className="text-purple-600 text-2xl inline font-semibold">
              {Number(invoice.TOTAL).toLocaleString()}{" "}
              {invoice.currency != "--select--" && invoice.currency}
            </h1>{" "}
          </div>

          <MoreVertical
            className="text-4xl text-purple-700 "
            onClick={() => setShowOptions(true)}
          />
        </div>

        <div className="relative w-full flex justify-between ">
          <p className="text-gray-800 ">ID- {invoice.id}</p>{" "}
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col gap-2  justify-between ">
          <p className="text-gray-800 font-semibold ">
            Created At: {invoice.createdAt}
          </p>

          <p className="text-gray-800 font-semibold">
            Last Updated: {invoice.updatedAt}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
