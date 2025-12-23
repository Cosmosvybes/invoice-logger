import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import { deleteInvoice } from "../../../../../../States/Slices/invoice";
import { MoreVertical } from "react-huge-icons/solid";
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
      <div className="relative w-full p-4 gap-2 flex-col h-auto flex justify-between items-center group">
        {showOptions && (
          <div
            ref={invoiceOptions}
            className="absolute right-1 top-10 border border-slate-200 rounded-xl overflow-hidden bg-white flex justify-start gap-1 flex-col w-40 h-auto p-1 z-50 shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            <Link
              to={`/${"invoice/update"}/${invoice.id}`}
              className="text-slate-700 hover:bg-violet-50 transition duration-200 hover:text-violet-700 text-sm text-left font-medium py-2 px-3 w-full rounded-lg"
            >
              Edit invoice
            </Link>
            <button
              onClick={() =>
                dispatch(
                  deleteInvoice({
                    id: invoice.id,
                    token: String(localStorage.getItem("token")),
                  })
                )
              }
              className="text-red-500 hover:bg-red-50 transition duration-200 hover:text-red-700 text-sm text-left font-medium py-2 px-3 w-full rounded-lg"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="relative w-full h-auto flex justify-between rounded-lg items-center">
          <div className="relative justify-start items-center">
            <h1 className="text-slate-900 text-2xl inline font-bold tracking-tight">
              {Number(invoice.TOTAL).toLocaleString()}{" "}
              <span className="text-violet-600 text-lg">
                {invoice.currency != "--select--" && invoice.currency}
              </span>
            </h1>
          </div>

          <MoreVertical
            className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            onClick={() => setShowOptions(true)}
          />
        </div>

        <div className="relative w-full flex justify-between mt-2">
          <p className="text-slate-500 text-xs font-mono bg-slate-100 px-2 py-1 rounded">
            ID: {invoice.id}
          </p>
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col gap-1 justify-between mt-1">
          <div className="flex justify-between items-center">
             <span className="text-slate-500 text-xs">Created:</span>
             <span className="text-slate-700 font-bold text-xs">{invoice.createdAt}</span>
          </div>

          <div className="flex justify-between items-center">
             <span className="text-slate-500 text-xs">Updated:</span>
             <span className="text-slate-700 font-bold text-xs">{invoice.updatedAt}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
