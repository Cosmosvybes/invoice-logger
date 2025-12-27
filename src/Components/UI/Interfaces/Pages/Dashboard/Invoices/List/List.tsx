import {
  Modal,
  ModalBody,
} from "reactstrap";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";

import useInvoiceListController from "./list.controller";
import Paginate from "../../../../../Tools/Layout/Paginate/Paginate";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, ChatDot, Edit, RemoveCircle } from "react-huge-icons/outline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import GeneratePDF from "../../../../../../PDF/PDFGenereator";
import { useAppDispatch } from "../../../../../../../States/hoooks/hook";
import { deleteRecurring } from "../../../../../../../States/Slices/invoice";

const List = React.memo(({ currentData }: { currentData: Invoice[] }) => {
  const {
    currentRowDataID,
    setCurrentRowDataID,
    currentInvoiceList,
    handleNextList,
    listPerTable,
    currentPage,
  } = useInvoiceListController(currentData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const handleToggle = () => setModal(!modal);

  const activeInvoice = currentInvoiceList.find(item => Number(item.id) === currentRowDataID);

  return (
    <>
      <Modal centered={true} isOpen={modal} toggle={handleToggle} contentClassName="rounded-[2rem] border-none shadow-2xl">
        <ModalBody className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Invoice Actions</h3>
                <button onClick={handleToggle} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <RemoveCircle className="text-2xl" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <button
                    onClick={() => {
                        // Logic for marking overdue
                        console.log("Marking as overdue:", currentRowDataID);
                        handleToggle();
                    }}
                    disabled={activeInvoice?.status.toLowerCase() === "draft" || activeInvoice?.status.toLowerCase() === "overdue" || activeInvoice?.status.toLowerCase() === "paid"}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-bold text-sm disabled:opacity-50 disabled:grayscale"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm"><RemoveCircle className="text-xl" /></div>
                    Mark as Overdue
                </button>

                <button
                    onClick={() =>
                        navigate("/invoice/chat", {
                        state: { invoiceInformation: { id: currentRowDataID } },
                        })
                    }
                    className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-bold text-sm"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm"><ChatDot className="text-xl" /></div>
                    Send Message / Chat
                </button>

                {activeInvoice && (
                    <PDFDownloadLink
                        document={<GeneratePDF invoiceInformation={activeInvoice} />}
                        fileName={`invoice_${currentRowDataID}.pdf`}
                        style={{ textDecoration: 'none' }}
                    >
                        {({ loading }) => (
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50 text-violet-600 hover:bg-violet-100 transition-all font-bold text-sm cursor-pointer">
                                <div className="p-2 bg-white rounded-xl shadow-sm">
                                    <Edit className="text-xl" />
                                </div>
                                {loading ? "Generating..." : "Download PDF Document"}
                            </div>
                        )}
                    </PDFDownloadLink>
                )}

                {activeInvoice?.recurring && (
                    <button
                        onClick={() => {
                            if (currentRowDataID !== null) {
                                dispatch(deleteRecurring({ id: currentRowDataID, token: localStorage.getItem("token")! }));
                                handleToggle();
                            }
                        }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all font-bold text-sm"
                    >
                        <div className="p-2 bg-white rounded-xl shadow-sm"><RemoveCircle className="text-xl" /></div>
                        Stop Recurring Billing
                    </button>
                )}
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div className="w-full bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-left">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest pl-8 whitespace-nowrap">Invoice ID</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Client Entity</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Value</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Last Update</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center sticky right-0 bg-slate-50 shadow-[-12px_0_20px_-10px_rgba(0,0,0,0.05)] whitespace-nowrap">Options</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
                {currentInvoiceList.map((invoice) => (
                <tr
                    className="hover:bg-slate-50/50 transition-all group"
                    key={invoice.id}
                >
                    <td className="p-6 pl-8">
                        <span className="text-sm text-slate-400 font-mono font-black group-hover:text-slate-600 transition-colors">
                            #{String(invoice.id).slice(-6).toUpperCase()}
                        </span>
                    </td>
                    <td className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-[10px] font-black">
                                {invoice.Client.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm text-slate-900 font-black tracking-tight">{invoice.Client}</span>
                        </div>
                    </td>

                    <td className="p-6">
                        <Link to={`/invoice/update/${invoice.id}`}>
                            <span className={`inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider
                            ${invoice.status.toLowerCase() === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                              invoice.status.toLowerCase() === 'overdue' ? 'bg-red-50 text-red-600 border border-red-100' :
                              'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                    invoice.status.toLowerCase() === 'paid' ? 'bg-emerald-500' : 
                                    invoice.status.toLowerCase() === 'overdue' ? 'bg-red-500' : 'bg-amber-500'
                                }`}></div>
                                {invoice.status}
                            </span>
                        </Link>
                    </td>
                    <td className="p-6">
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-900 font-black">
                                {Number(invoice.TOTAL).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{invoice.currency === '--select--' ? 'USD' : invoice.currency}</span>
                        </div>
                    </td>

                    <td className="p-6">
                        <span className="text-xs text-slate-500 font-bold whitespace-nowrap">
                            {(() => {
                                const date = new Date(invoice.updatedAt);
                                return isNaN(date.getTime()) 
                                    ? String(invoice.updatedAt || 'N/A') 
                                    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            })()}
                        </span>
                    </td>

                    <td className="p-6 text-center sticky right-0 bg-white group-hover:bg-slate-50 transition-colors shadow-[-12px_0_20px_-10px_rgba(0,0,0,0.05)]">
                        <button
                            onClick={() => {
                                handleToggle();
                                setCurrentRowDataID(Number(invoice.id));
                            }}
                            className="p-2 rounded-xl hover:bg-slate-200 transition-all active:scale-95 group/btn"
                        >
                            <MoreVertical
                                className="text-xl text-slate-400 group-hover/btn:text-slate-900 transition-colors"
                            />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        <div className="p-6 border-t border-slate-50 flex justify-center bg-slate-50/30">
          <Paginate
            totalItems={currentData.length}
            onPageChange={handleNextList}
            itemsPerPage={listPerTable}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
});

export default List;
