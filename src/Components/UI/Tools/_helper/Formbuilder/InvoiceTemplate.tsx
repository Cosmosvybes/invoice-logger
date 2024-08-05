import { Edit } from "react-huge-icons/outline";
import { Data } from "./invoiceTemplate.types";
const InvoiceTemplate = ({ invoice }: { invoice: Data }) => {
  return (
    <>
      <div className="relative w-full py-5 flex-col  border   border-gray-300 h-32  flex justify-between items-center">
        <div className="absolute right-0 bottom-0  transition duration-500 flex justify-start gap-2  flex-col w-auto opacity-0 h-auto hover:opacity-100 bg-gray-100  text-center z-10">
          <button
            className="text-gray-700 hover:bg-gray-300 text-xl text-center font-light px-2 w-full"
            onClick={() => console.log(invoice)}
          >
            Edit
          </button>
          <button className="text-gray-700  hover:bg-gray-300 text-xl text-center 0 font-light px-2 w-full">
            Delete
          </button>
        </div>

        <div className="relative w-full flex justify-between px-2">
          <p>ID- {invoice.id}</p> <p>$ 0.00</p>
        </div>
        <div className="relative h-auto w-full flex   justify-between px-2">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <Edit className="text-2xl " />
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
