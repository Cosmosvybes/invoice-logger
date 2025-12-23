import { Chatting, MailArrowLeft } from "react-huge-icons/bulk";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState } from "react";
import PDFDownloader from "../../../../PDF/Components/PDFDownloader";
import GeneratePDF from "../../../../PDF/PDFGenereator";

import { Invoice } from "../../../../../States/Slices/invoice.types";
import { useNavigate } from "react-router-dom";
const InvoicePiece = ({
  invoiceInformation,
}: {
  invoiceInformation: Invoice;
}) => {
  const [modal, setModal] = useState(false);
  const toggle_ = () => {
    setModal(!modal);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 hover:shadow-md transition-all duration-200 group">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                    <MailArrowLeft className="text-2xl" />
                </div>
                <div>
                     <h3 className="text-lg font-bold text-slate-900">
                        Invoice #{invoiceInformation.id.toString().slice(0, 8)}...
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                        From: {invoiceInformation.Business || "Unknown Sender"}
                    </p>
                </div>
             </div>

             <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="hidden md:block">
                     <PDFDownloader
                        reportType={`${invoiceInformation.id} - invoice`}
                        file={
                            <GeneratePDF
                            invoiceInformation={invoiceInformation}
                            headers={[
                                "ID",
                                "Description",
                                "Quantity",
                                "Unit price",
                                "Unit total",
                            ]}
                            />
                        }
                    />
                </div>
               
                <button
                    onClick={toggle_}
                    className="flex-1 md:flex-none px-4 py-2 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
                >
                    View Details
                </button>
             </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle_} size="lg" className="modal-dialog-centered">
        <ModalBody className="bg-white p-8 rounded-xl">
          <div className="flex flex-col gap-6">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                <div>
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Invoice ID</p>
                     <h2 className="text-2xl font-bold text-slate-900">#{invoiceInformation.id}</h2>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                    <h2 className="text-2xl font-extrabold text-violet-600">
                        {Number(invoiceInformation.TOTAL).toLocaleString()} 
                        <span className="text-sm text-slate-400 ml-1">{invoiceInformation.currency !== "--select--" ? invoiceInformation.currency : ""}</span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Business Details */}
                <div>
                     <h3 className="text-sm font-bold text-slate-900 underline decoration-violet-200 decoration-2 underline-offset-4 mb-4">From (Business)</h3>
                     <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-bold text-slate-700">Name:</span> {invoiceInformation.Business}</p>
                        <p><span className="font-bold text-slate-700">Address:</span> {invoiceInformation.BusinessAddress}</p>
                        <p>{invoiceInformation.BusinessState}, {invoiceInformation.BusinessCountry}</p>
                     </div>
                </div>

                 {/* Client Details */}
                <div>
                     <h3 className="text-sm font-bold text-slate-900 underline decoration-violet-200 decoration-2 underline-offset-4 mb-4">To (Client)</h3>
                     <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-bold text-slate-700">Name:</span> {invoiceInformation.Client}</p>
                        <p><span className="font-bold text-slate-700">Address:</span> {invoiceInformation.ClientAddress}</p>
                        <p>{invoiceInformation.City}, {invoiceInformation.State}, {invoiceInformation.Country}</p>
                     </div>
                </div>
            </div>
            
            {/* Dates & Notes */}
             <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">Date Issued</span>
                    <span className="text-sm font-bold text-slate-800">{invoiceInformation.DateIssued}</span>
                </div>
                <div>
                     <span className="text-xs font-bold text-slate-400 uppercase block">Due Date</span>
                    <span className="text-sm font-bold text-slate-800">{invoiceInformation.DateDue}</span>
                </div>
                 <div className="col-span-2">
                     <span className="text-xs font-bold text-slate-400 uppercase block">Notes</span>
                    <span className="text-sm text-slate-600 italic">{invoiceInformation.Notes || "No notes"}</span>
                </div>
             </div>

            {/* Items Table */}
            <div>
                 <h3 className="text-sm font-bold text-slate-900 mb-3">Items</h3>
                 <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-slate-50 p-3 border-b border-slate-200">
                        <p className="text-xs font-bold text-slate-500 uppercase">Description</p>
                        <p className="text-xs font-bold text-slate-500 uppercase text-center">Qty</p>
                        <p className="text-xs font-bold text-slate-500 uppercase text-center">Price</p>
                        <p className="text-xs font-bold text-slate-500 uppercase text-right">Total</p>
                    </div>
                    {invoiceInformation.itemList?.map((item, i) => (
                        <div key={i} className="grid grid-cols-4 p-3 border-b border-slate-100 last:border-0 text-sm md:text-base">
                             <p className="font-medium text-slate-800">{item.description}</p>
                             <p className="text-slate-600 text-center">{item.quantity}</p>
                             <p className="text-slate-600 text-center">{item.unitPrice}</p>
                             <p className="font-bold text-slate-800 text-right">{Number(item.unitTotal).toFixed(2)}</p>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
                <div className="w-full md:w-1/2 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Discount</span>
                        <span className="text-slate-800 font-bold">{invoiceInformation.Discount}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Tax</span>
                        <span className="text-slate-800 font-bold">{invoiceInformation.VAT}%</span>
                    </div>
                     <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                        <span className="text-base font-bold text-slate-900">Total Due</span>
                        <span className="text-xl font-extrabold text-violet-600">
                             {Number(invoiceInformation.TOTAL).toLocaleString()} {invoiceInformation.currency !== "--select--" ? invoiceInformation.currency : ""}
                        </span>
                    </div>
                </div>
            </div>

          </div>
        </ModalBody>
        <ModalFooter className="border-t border-slate-100 bg-slate-50 rounded-b-xl gap-3">
          <Button
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded-lg shadow-sm transition-colors"
            onClick={toggle_}
          >
            Close
          </Button>
          <Button
            className="px-4 py-2 bg-violet-600 text-white font-bold hover:bg-violet-700 rounded-lg shadow-md transition-all flex items-center gap-2"
            onClick={() =>
              navigate("/invoice/chat", { state: { invoiceInformation } })
            }
          >
             Message Sendor <Chatting className="text-lg" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default InvoicePiece;
