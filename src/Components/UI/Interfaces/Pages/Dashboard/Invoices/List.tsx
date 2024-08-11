// import { MoreHorizontal, MoreVertical } from "react-huge-icons/bulk";
import { Invoice } from "../../../../../../States/Slices/invoice.types";

const List = ({ currentData }: { currentData: Invoice[] }) => {
  return (
    <>
      {" "}
      <div className="relative">
        {currentData.map((invoice, index) => (
          <div
            className={` ${
              index % 2 == 0 ? "bg-gray-1000" : "bg-gray-200"
            } relative items-center grid grid-cols-5 py-3  border-b px-2 border-gray-100  gap-1 max-sm:gap-1  w-full max-sm:w-full`}
            key={invoice.id}
          >
            <p className="text-black font-normal text-xl max-sm:text-sm">
              {invoice.id}
            </p>
            <p className="text-black font-normal text-xl max-sm:text-sm">
              {invoice.Client}
            </p>
           
            <p className="text-black font-normal text-xl max-sm:text-sm">
              {invoice.status}
            </p>
            <p className="text-black font-normal text-xl max-sm:text-sm">
              ${invoice.TOTAL}
            </p>
            <p className="text-black font-normal text-xl max-sm:text-sm">
              {invoice.updatedAt}
            </p>
            {/* <p className="text-black font-normal text-xl max-sm:text-xl">
              <MoreVertical className="text-xl" />
            </p> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
