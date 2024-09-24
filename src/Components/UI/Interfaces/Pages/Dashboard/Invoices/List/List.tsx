import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";
// import { MoreHorizontal } from "react-huge-icons/outline";
import useInvoiceListController from "./list.controller";
import Paginate from "../../../../../Tools/Layout/Paginate/Paginate";
import { useState } from "react";

const List = ({ currentData }: { currentData: Invoice[] }) => {
  const {
    currentRowDataID,
    setCurrentRowDataID,
    currentInvoiceList,
    handleNextList,
    listPerTable,
    handleMarkAsPaid,
  } = useInvoiceListController(currentData);
  const [modal, setModal] = useState(false);
  const handleToggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <Modal centered={true} isOpen={modal} toggle={handleToggle}>
        <ModalHeader>
          <h1> Actions</h1>
        </ModalHeader>
        <ModalBody>
          <div className="relative justify-between  w-full flex ">Mark as</div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => console.log(currentRowDataID)}
            className="text-white  hover:bg-gray-300 hover:text-gray-50 text-xl max-sm:xl text-left font-light px-2"
          >
            OVERDUE
          </Button>
          <Button
            onClick={() => handleMarkAsPaid(currentRowDataID)}
            color="success"
            className="text-white hover:bg-gray-300 hover:text-gray-50 text-xl text-left  max-sm:xl font-light px-2"
          >
            PAID
          </Button>
        </ModalFooter>
      </Modal>
      <Container className="px-0" fluid={true}>
        <table className="w-full border-collapse">
          <tbody>
            {currentInvoiceList.map((invoice, index) => (
              <tr
                className={` ${
                  index % 2 != 0 ? "bg-gray-100" : "bg-gray-50"
                } py-3 px-3 `}
                key={invoice.id}
              >
                <td className="text-gray-500 text-center max-sm:text-xs font-normal py-2 w-20 max-sm:w-16 ">
                  {String(invoice.id).slice(0, 8)}
                </td>
                <td className="text-gray-500 text-center max-sm:text-xs font-normal py-2  w-20 max-sm:w-16 ">
                  {invoice.Client.slice(0, 8)}
                </td>

                <td className="text-green-500  text-center max-sm:text-xs  font-normal py-2 w-20 max-sm:w-16 ">
                  {invoice.status.toLowerCase()}
                </td>
                <td className="text-gray-500 text-center max-sm:text-xs font-normal py-2  w-20 max-sm:w-16 ">
                  {String(invoice.TOTAL.toLocaleString())}{" "}
                </td>

                <td className="text-gray-500 text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  {invoice.currency != "--select--" &&
                    invoice.currency.toLowerCase() + " "}
                </td>
                <td className="text-gray-500 text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  {String(invoice.updatedAt).length > 10 &&
                    String(invoice.updatedAt).slice(0, 17) + "..."}
                </td>

                <td className="text-black text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  <button
                    onClick={() => {
                      handleToggle(), setCurrentRowDataID(Number(invoice.id));
                    }}
                    className="text-gray-500 inline hover:bg-gray-300 hover:text-gray-50 text-sm max-sm:sm text-left font-light px-2 w-auto"
                  >
                    ●●●
                  </button>
                </td>
                {/* <div className="relative left-0  top-0 border h-6 bg-black"></div> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="relative flex justify-start max-sm:justify-start items-center w-full mt-2">
          <Paginate
            invoices={currentData}
            paginateHandler={handleNextList}
            postsPerPage={listPerTable}
          />
        </div>
      </Container>
    </>
  );
};

export default List;
