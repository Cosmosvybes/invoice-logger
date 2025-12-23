import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";

import useInvoiceListController from "./list.controller";
import Paginate from "../../../../../Tools/Layout/Paginate/Paginate";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical } from "react-huge-icons/solid";
// import InvoiceTable from "../../../../../Tools/InvoiceModal/InvoiceTable";

const List = React.memo(({ currentData }: { currentData: Invoice[] }) => {
  const {
    currentRowDataID,
    setCurrentRowDataID,
    currentInvoiceList,
    handleNextList,
    listPerTable,
    handleMarkAsPaid,
  } = useInvoiceListController(currentData);

  const navigate = useNavigate();
  //  /////////
  const [modal, setModal] = useState(false);
  const handleToggle = () => {
    setModal(!modal);
  };

  const handleViewInvoice = () => {};

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
            onClick={() => handleMarkAsPaid(currentRowDataID)}
            color="success"
            className="mt-1 bg-gradient-to-br from-green-700 to-purple-900 h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto"
          >
            PAID
          </Button>
          <Button
            color="danger"
            onClick={() => console.log(currentRowDataID)}
            className=" mt-1  h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto max-sm:mr-2"
          >
            OVERDUE
          </Button>
          <Button
            color="primary"
            onClick={() =>
              navigate("/invoice/chat", {
                state: { invoiceInformation: { id: currentRowDataID } },
              })
            }
            className=" mt-1  h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto max-sm:mr-2"
          >
            SEND MESSAGE
          </Button>
        </ModalFooter>
      </Modal>

      <div className="w-full clean-card p-6 overflow-hidden">
        {/* <InvoiceTable /> */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Currency</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Updated</th>
                <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
                {currentInvoiceList.map((invoice) => (
                <tr
                    className="hover:bg-slate-50 transition-colors group"
                    key={invoice.id}
                >
                    <td className="p-4 text-sm text-slate-600 font-mono">
                    #{String(invoice.id).slice(0, 8)}...
                    </td>
                    <td className="p-4 text-sm text-slate-900 font-semibold">
                    {invoice.Client.slice(0, 15)}
                    </td>

                    <td className="p-4">
                    <Link to={`/invoice/update/${invoice.id}`}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                        ${invoice.status.toLowerCase() === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                          invoice.status.toLowerCase() === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'}`}>
                        {invoice.status.toLowerCase()}
                        </span>
                    </Link>
                    </td>
                    <td className="p-4 text-sm text-slate-900 font-bold">
                    {String(invoice.TOTAL.toLocaleString())}
                    </td>

                    <td className="p-4 text-sm text-slate-500">
                    {invoice.currency != "--select--" &&
                        invoice.currency.toUpperCase()}
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                    {String(invoice.updatedAt).length > 10 &&
                        String(invoice.updatedAt).slice(0, 10)}
                    </td>

                    <td className="p-4 text-center">
                    <button
                        disabled={
                        (invoice.status == "paid" || invoice.status == "Draft") &&
                        true
                        }
                        onClick={() => {
                        handleToggle(), setCurrentRowDataID(Number(invoice.id));
                        }}
                        className="p-1 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <MoreVertical
                        onClick={handleViewInvoice}
                        className="text-xl text-slate-400 group-hover:text-slate-700 transition-colors"
                        />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="relative flex justify-center items-center w-full mt-6">
          <Paginate
            invoices={currentData}
            paginateHandler={handleNextList}
            postsPerPage={listPerTable}
          />
        </div>
      </div>
    </>
  );
});

export default List;
