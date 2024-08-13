import { Invoice } from "../../../../../States/Slices/invoice.types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { deleteInvoice } from "../../../../../States/Slices/invoice";
import { MoreVertical } from "react-huge-icons/bulk";
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
      <div className="relative w-full  gap-2 flex-col  border-b   border-gray-300 h-auto  flex justify-between items-center">
        {showOptions && (
          <div
            ref={invoiceOptions}
            className="absolute right-1 bottom-1  shadow-md   transition duration-500 flex justify-start gap-2  flex-col w-auto h-auto  bg-gray-50  text-center z-20"
          >
            <button
              className="text-slate-950 hover:bg-black hover:text-gray-50 text-xl text-center font-light px-2 w-full"
              onClick={() => console.log(invoice)}
            >
              Send
            </button>
            <Link
              to={`/${"invoice/update"}/${invoice.id}`}
              className="text-slate-950 hover:bg-black hover:text-gray-50 text-xl text-center font-light px-2 w-full"
            >
              Edit
            </Link>
            <button
              onClick={() => dispatch(deleteInvoice({ id: invoice.id }))}
              className="text-slate-950 hover:bg-black hover:text-gray-50 text-xl text-center 0 font-light px-2 w-full"
            >
              Delete
            </button>
          </div>
        )}
        <div className="relative w-full flex justify-end">
          <MoreVertical
            className="text-4xl text-slate-950 "
            onClick={() => setShowOptions(true)}
          />
        </div>

        <div className="relative w-full flex justify-between px-2 max-sm:px-2">
          <p className="text-slate-950 ">ID- {invoice.id}</p>{" "}
          <h1 className="text-slate-800 text-2xl font-extrabold ">
            ${invoice.TOTAL}
          </h1>
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col gap-5  justify-between px-2">
          <p className="text-slate-950 ">
            Created At: {invoice.createdAt}
          </p>

          <p className="text-slate-950">
            Last Updated: {invoice.updatedAt}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
