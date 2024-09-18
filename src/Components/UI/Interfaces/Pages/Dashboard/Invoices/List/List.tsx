import { Table } from "reactstrap";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";
import { MoreHorizontal } from "react-huge-icons/outline";
import useInvoiceListController from "./list.controller";
import Paginate from "../../../../../Tools/Layout/Paginate/Paginate";

const List = ({ currentData }: { currentData: Invoice[] }) => {
  const {
    actionCard,
    showActions,
    setCurrentRowDataID,
    setShowActions,
    currentInvoiceList,
    handleNextList,
    listPerTable,
  } = useInvoiceListController(currentData);

  return (
    <>
      <Table className="w-full border-collapse">
        <tbody>
          {currentInvoiceList.map((invoice, index) => (
            <tr
              className={` ${
                index % 2 == 0 ? "bg-gray-100" : "bg-black"
              } py-2 px-3 `}
              key={invoice.id}
            >
              <td className="text-gray-200 text-center max-sm:text-sm font-normal py-2 w-20 max-sm:w-16 ">
                {String(invoice.id).slice(9, 16)}
              </td>
              <td className="text-gray-200 text-center max-sm:text-sm font-normal py-2  w-20 max-sm:w-16 ">
                {invoice.Client.slice(0, 10)}
              </td>

              <td className="text-gray-200 text-center max-sm:text-sm  font-normal py-2 w-20 max-sm:w-16 ">
                {invoice.status.toLowerCase()}
              </td>
              <td className="text-gray-200 text-center max-sm:text-sm font-normal py-2  w-20 max-sm:w-16 ">
                {invoice.TOTAL}{" "}
                {invoice.currency != "--select--" && invoice.currency.toLowerCase() + " "}
              </td>

              <td className="text-gray-200 text-center max-sm:text-sm   font-normal py-2 w-20 max-sm:w-16 ">
                {String(invoice.updatedAt).length > 10 &&
                  String(invoice.updatedAt).slice(0, 14) + "..."}
              </td>
              <td className="text-black text-center max-sm:text-sm   font-normal py-2 w-20 max-sm:w-16 ">
                <button>
                  <MoreHorizontal
                    className="inline text-xl"
                    onClick={() => {
                      setCurrentRowDataID(Number(invoice.id));
                      setShowActions(true);
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="relative flex justify-end max-sm:justify-start items-center w-full mt-2">
        <Paginate
          invoices={currentData}
          paginateHandler={handleNextList}
          postsPerPage={listPerTable}
        />
      </div>

      {showActions && (
        <div
          ref={actionCard}
          className="absolute right-20 top-5  shadow-md  transition duration-500 flex justify-start gap-2  flex-col w-auto h-auto  bg-gray-50  text-center z-50"
        >
          <button className="text-black  hover:bg-gray-300 hover:text-gray-50 text-xl max-sm:text-xs text-left font-light px-2 w-full">
            Mark as paid
          </button>
          <button className="text-black hover:bg-gray-300 hover:text-gray-50 text-xl text-left  max-sm:text-xs font-light px-2 w-full">
            Mark as overdue
          </button>
          <button className="text-black  hover:bg-gray-300 hover:text-gray-50 text-xl text-left max-sm:text-xs  font-light px-2 w-full">
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default List;
