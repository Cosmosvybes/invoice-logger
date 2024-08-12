import { CheckMarkCircle } from "react-huge-icons/outline";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { MoreHorizontal, LoadingDashed } from "react-huge-icons/bulk";

const List = ({ currentData }: { currentData: Invoice[] }) => {
  return (
    <>
      {" "}
      <div className="relative overflow-x-scroll ">
        {currentData.map((invoice, index) => (
          <div
            className={` ${
              index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
            } relative items-center grid grid-cols-7 py-3  overflow-x-visible  border-b px-2 border-gray-100  gap-2 max-sm:gap-2 w-auto max-sm:w-full`}
            key={invoice.id}
          >
            <p className="text-black font-normal text-xl max-sm:text-sm">
              {String(invoice.id).slice(6, 14)}
            </p>
            <p className="text-black font-normal text-center text-xl max-sm:text-sm">
              {invoice.Client}
            </p>

            <p className="text-black  rounded-md max-sm:w-auto px-2 py-2  text-center  w-auto font-normal text-xl max-sm:text-sm">
              {invoice.status == "Awaiting" ? "Draft" : "Sent"}
            </p>
            <p className="text-black font-normal text-center text-xl max-sm:text-sm">
              ${invoice.TOTAL}
            </p>

            <p className="text-black font-normal text-center text-xl max-sm:text-sm">
              {invoice.createdAt}
            </p>
            <p className="text-black font-normal text-center text-xl max-sm:text-sm">
              {invoice.updatedAt}
            </p>
            <p className="text-black font-normal text-center text-xl max-sm:text-sm">
              <MoreHorizontal className="text-5xl text-center " />{" "}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
