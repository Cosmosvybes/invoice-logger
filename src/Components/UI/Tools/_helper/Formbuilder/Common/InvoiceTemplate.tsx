import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import { deleteInvoice } from "../../../../../../States/Slices/invoice";
import { MoreVertical } from "react-huge-icons/bulk";
import { useLayoutEffect, useRef, useState } from "react";
// import { Card, CardBody } from "reactstrap";


//
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
              onClick={() =>
                dispatch(
                  deleteInvoice({
                    id: invoice.id,
                    token: String(localStorage.getItem("token")),
                  })
                )
              }
              className="text-slate-950 hover:bg-black hover:text-gray-50 text-xl text-center 0 font-light px-2 w-full"
            >
              Delete
            </button>
          </div>
        )}
  

    
        <div className="relative w-full h-auto flex justify-between items-center">
          <div className="relative justify-start items-center ">
            {" "}
            <h1 className="text-slate-950 text-2xl inline font-semibold">
              {Number(invoice.TOTAL).toFixed(2)}{" "}
              {invoice.currency != "--select--" && invoice.currency}
            </h1>{" "}
          </div>

          <MoreVertical
            className="text-4xl text-slate-950 "
            onClick={() => setShowOptions(true)}
          />
        </div>

        <div className="relative w-full flex justify-between ">
          <p className="text-slate-950 ">ID- {invoice.id}</p>{" "}
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col gap-2  justify-between ">
          <p className="text-slate-950 font-semibold ">
            Created At: {invoice.createdAt}
          </p>

          <p className="text-slate-950  font-semibold">
            Last Updated: {invoice.updatedAt}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
