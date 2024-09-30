import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";

import useInvoiceListController from "./list.controller";
import Paginate from "../../../../../Tools/Layout/Paginate/Paginate";
import React, { useState } from "react";
import { MoreHorizontal } from "react-huge-icons/outline";
import InvoiceTable from "../../../../../Tools/InvoiceModal/InvoiceTable";

const List = React.memo(({ currentData }: { currentData: Invoice[] }) => {
  const {
    currentRowDataID,
    setCurrentRowDataID,
    currentInvoiceList,
    handleNextList,
    listPerTable,
    handleMarkAsPaid,
  } = useInvoiceListController(currentData);

  //  /////////
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
          <div className="relative justify-between  w-full flex ">
            Mark this invoice as
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => console.log(currentRowDataID)}
            className=" mt-1  h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto max-sm:mr-2"
          >
            OVERDUE
          </Button>
          <Button
            onClick={() => handleMarkAsPaid(currentRowDataID)}
            color="success"
            className="mt-1 bg-gradient-to-br from-green-700 to-green-900 h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto"
          >
            PAID
          </Button>
        </ModalFooter>
      </Modal>

      <Container className="px-0 mt-2" fluid={true}>
        <InvoiceTable />
        <table className="w-full border-collapse">
          <tbody>
            {currentInvoiceList.map((invoice, index) => (
              <tr
                className={` ${
                  index % 2 != 0 ? "bg-gray-100" : "bg-gray-50"
                } py-3 px-3 `}
                key={invoice.id}
              >
                <td className="text-black text-center max-sm:text-xs font-normal py-2 w-20 max-sm:w-16 ">
                  {String(invoice.id).slice(10, 13)}
                </td>
                <td className="text-black text-center max-sm:text-xs font-normal py-2  w-20 max-sm:w-16 ">
                  {invoice.Client.slice(0, 8)}
                </td>

                <td className="text-green-500  text-center max-sm:text-xs  font-normal py-2 w-20 max-sm:w-16 ">
                  {invoice.status.toLowerCase()}
                </td>
                <td className="text-black text-center max-sm:text-xs font-normal py-2  w-20 max-sm:w-16 ">
                  {String(invoice.TOTAL.toLocaleString())}{" "}
                </td>

                <td className="text-black text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  {invoice.currency != "--select--" &&
                    invoice.currency.toLowerCase() + " "}
                </td>
                <td className="text-black text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  {String(invoice.updatedAt).length > 10 &&
                    String(invoice.updatedAt).slice(0, 17) + "..."}
                </td>

                <td className="text-black text-center max-sm:text-xs   font-normal py-2 w-20 max-sm:w-16 ">
                  <button
                    disabled={
                      (invoice.status == "paid" || invoice.status == "Draft") &&
                      true
                    }
                    onClick={() => {
                      handleToggle(), setCurrentRowDataID(Number(invoice.id));
                    }}
                    className="text-black inline hover:bg-gray-300 hover:text-gray-50 text-sm max-sm:sm text-left font-light px-2 w-auto"
                  >
                    <MoreHorizontal className="text-4xl text-gray-600 max-sm:text-xl" />
                  </button>
                </td>
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
});

export default List;
