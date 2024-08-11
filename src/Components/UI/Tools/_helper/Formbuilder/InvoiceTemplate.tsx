

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
      <div className="relative w-full py-5 gap-5 flex-col  border rounded-md   border-gray-500 h-auto  flex justify-between items-center">
        {showOptions && (
          <div
            ref={invoiceOptions}
            className="absolute right-0 bottom-0  transition duration-500 flex justify-start gap-2  flex-col w-auto h-auto  bg-black  text-center z-20"
          >
            <button
              className="text-white hover:bg-gray-200 hover:text-black text-xl text-center font-light px-2 w-full"
              onClick={() => console.log(invoice)}
            >
              Send
            </button>
            <Link
              to={`/${"invoice/update"}/${invoice.id}`}
              className="text-white hover:bg-gray-200 hover:text-black text-xl text-center font-light px-2 w-full"
            >
              Edit
            </Link>
            <button
              onClick={() => dispatch(deleteInvoice({ id: invoice.id }))}
              className="text-white hover:bg-gray-200 hover:text-black text-xl text-center 0 font-light px-2 w-full"
            >
              Delete
            </button>
          </div>
        )}

        <div className="relative w-full flex justify-between px-2 max-sm:px-2">
          <p className="text-black font-normal">ID- {invoice.id}</p>{" "}
          <p className="text-black font-normal mr-2">${invoice.TOTAL}</p>
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col  justify-between px-2">
          <p className="text-black font-normal">
            Created At: {invoice.createdAt}
          </p>

          <p className="text-black font-normal">
            Last Updated: {invoice.updatedAt}
          </p>
          <div className="relative w-full flex justify-end">
            <MoreVertical
              className="text-4xl text-black "
              onClick={() => setShowOptions(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
