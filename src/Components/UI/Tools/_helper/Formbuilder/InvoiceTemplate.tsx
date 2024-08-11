import { Edit } from "react-huge-icons/outline";
import { Invoice } from "../../../../../States/Slices/invoice.types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { deleteInvoice } from "../../../../../States/Slices/invoice";

const InvoiceTemplate = ({ invoice }: { invoice: Invoice }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="relative w-full py-5 flex-col  border rounded-md   border-gray-500 h-32  flex justify-between items-center">
        <div className="absolute right-0 bottom-0  transition duration-500 flex justify-start gap-2  flex-col w-auto opacity-0 h-auto hover:opacity-100 bg-black  text-center z-10">
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

        <div className="relative w-full flex justify-between px-2">
          <p className="text-black font-normal">ID- {invoice.id}</p>{" "}
          <p className="text-black font-normal">${invoice.TOTAL}</p>
        </div>
        <div className="relative h-auto w-full flex text-sm flex-col  justify-between px-2">
          <p className="text-black font-normal">
            Created At: {invoice.createdAt}
          </p>
          <p className="text-black font-normal">
            Last Updated: {invoice.updatedAt}
          </p>
          <div className="relative w-full flex justify-end">
            <Edit className="text-2xl " />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
