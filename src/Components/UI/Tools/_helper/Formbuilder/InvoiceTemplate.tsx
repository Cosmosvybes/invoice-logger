import { Edit } from "react-huge-icons/outline";
import { Data } from "./invoiceTemplate.types";
import { Link } from "react-router-dom";
const InvoiceTemplate = ({ invoice }: { invoice: Data }) => {
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
          <button className="text-white hover:bg-gray-200 hover:text-black text-xl text-center 0 font-light px-2 w-full">
            Delete
          </button>
        </div>

        <div className="relative w-full flex justify-between px-2">
          <p className="text-black font-normal">ID- {invoice.id}</p> <p className="text-black font-normal">${invoice.TOTAL}</p>
        </div>
        <div className="relative h-auto w-full flex text-sm  justify-between px-2">
          <p className="text-black font-normal">
            Last Updated:{" "}
            {new Date().toLocaleString("en-US", {
              day: "2-digit",
              month: "long",
              dayPeriod: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <Edit className="text-2xl " />
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
