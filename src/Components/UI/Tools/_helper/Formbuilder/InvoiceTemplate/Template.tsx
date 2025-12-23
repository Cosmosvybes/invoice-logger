import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import useTemplateController from "./main";
import { EyeLightDouble } from "react-huge-icons/bulk";
import useModalController from "../../../InvoiceModal/controller";

import ViewModal from "../View/ViewModal";
import { SendFast } from "react-huge-icons/bulk";
import ProductsList from "../ProductsList/ProductsList";
import Currency from "../Common/CurrOptions/Currency";

import { render } from "@react-email/components";
import Mailer from "../../../../../EMAIL/Mailer";
import Spinner_ from "../../Loader/Spinner";
import React, { useState } from "react";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
import Overlay from "../../../../Interfaces/Pages/Subscription/_OverlayComp/Overlay";
import { LoadingDashed, Pencil, RemoveCircle } from "react-huge-icons/solid";
// import { toast } from "react-toastify";
import SubscriptionModal from "../../../../Interfaces/Pages/Subscription/SubscriptionModal";

const Template = React.memo(
  ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
    const { forms } = useModalController();
    const [modal, setModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const {
      customEmail,
      sendAsMessage,
      setSetAsMessage,
      // setCustomEmail,
      handleSetCustomEmail,
      setUseCustom,
      setViewMode,
      handleView,
      updateInvoiceDetails,
      dispatch,
      tax_discount_input,
      updateDiscount,
      updateVAT,
      viewMode,
      token,
      loading,
      handleSendInvoice,
      isLoading,
      clients,
      useCustomChecked,
      handleSelectClient,
      editToggle,
      handleEditFormToggle,
    } = useTemplateController();

    //   //?? ///////////////////////////////////////////////
    // FORM BUILDER TEMPLATE
    //   //?? ///////////////////////////////////////////////

    const emailHtml = render(
      <Mailer invoiceInformation={invoiceInformation} />,
      {
        pretty: true,
      }
    );

    const FORM = forms.map((input, index) => {
      switch (input.type) {
        case "checkbox":
          return (
            <div
              className="relative items-center px-1 py-1 gap-1 flex justify-between bg-slate-50 rounded-lg p-2 border border-slate-200 hover:bg-slate-100 transition-colors"
              key={input.placeholder}
            >
              <p className="text-slate-700 inline text-sm font-medium">{input.placeholder}</p>
              <Input
                title="check"
                type="checkbox"
                className="max-sm:w-auto max-sm:text-xs accent-violet-600"
                value={invoiceInformation[input.name]}
                onChange={(e) =>
                  updateInvoiceDetails(e.currentTarget.checked, input.name)
                }
              />
            </div>
          );
        case "date":
          return (
            <div
              className="relative justify-start max-sm:ml-0 max-md:items-start max-md:ml-0 gap-1 flex flex-col max-sm:justify-start"
              key={index}
            >
              <p className="text-slate-600 ml-0 font-bold px-1 text-xs uppercase tracking-wider">
                {input.placeholder}
              </p>
              <Input
                title="date"
                type="date"
                className="clean-input w-full p-2 text-sm text-slate-800 font-medium"
                value={invoiceInformation[input.name]}
                onChange={(e) =>
                  updateInvoiceDetails(e.target.value, input.name)
                }
              />
            </div>
          );
        default:
          return (
            <div className="relative" key={index}>
                <label className="text-xs text-slate-600 ml-1 mb-1 block uppercase font-bold">{input.placeholder}</label>
              <Input
                className="clean-input w-full p-2.5 text-sm font-medium text-slate-800"
                type="text"
                value={invoiceInformation[input.name]}
                placeholder={input.placeholder}
                onChange={(e) =>
                  updateInvoiceDetails(e.target.value, input.name)
                }
              />
            </div>
          );
      }
    });

    const VAT_DISCOUNT_INPUT = tax_discount_input.map((input: any) => (
      <div
        className="relative py-1 flex items-center gap-2"
        key={input.id}
      >
        <span className="text-xs text-slate-600 font-bold">{input.placeholder}</span>
        <Input
          className="clean-input p-2 text-xs text-center w-20 font-mono text-violet-700 font-bold bg-white border-slate-300"
          type={"text"}
          placeholder={`0`}
          value={invoiceInformation[input.name]}
          onChange={(e) =>
            input.name == "Discount"
              ? dispatch(
                  updateDiscount({
                    invoiceId: invoiceInformation.id,
                    value: Number(e.target.value),
                    token,
                  })
                )
              : dispatch(
                  updateVAT({
                    token,
                    invoiceId: invoiceInformation.id,
                    value: Number(e.target.value),
                  })
                )
          }
        />
        <span className="text-slate-500 font-bold">%</span>
      </div>
    ));

    //

    return (
      <>
        {loading && (
          <Overlay
            children={
              <div className="animate-spin z-10 ">
                <LoadingDashed className="text-3xl text-violet-600" />
              </div>
            }
          />
        )}

        {!invoiceInformation && loading ? (
          <Spinner_ />
        ) : (
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 md:p-8 animate-fade-in-up">
              <Modal
                centered={true}
                isOpen={modal}
                toggle={() => setModal(!modal)}
                fade={true}
                contentClassName="bg-white border border-slate-200 shadow-xl rounded-xl"
              >
                <ModalHeader className="text-slate-800 border-b border-slate-100">Sending Invoice</ModalHeader>
                <ModalBody className="text-slate-600">Do you want to send this invoice now?</ModalBody>
                <ModalFooter className="border-t border-slate-100">
                  <Button
                    className="bg-transparent border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-500 transition-all duration-300"
                    onClick={() => setModal(!modal)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    className="bg-violet-600 text-white font-semibold shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-300 border-none"
                    onClick={() => {
                      handleSendInvoice(emailHtml);
                      setModal(!modal);
                    }}
                  >
                    Yes, Send it
                  </Button>
                </ModalFooter>
              </Modal>

              <section className="flex relative transition duration-700 justify-start w-full h-auto flex-col border-none gap-6">
                {viewMode && (
                  <Overlay
                    children={
                      <div className="relative h-[90vh] w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                         <div className="h-full overflow-y-auto p-4 custom-scrollbar">
                            <ViewModal
                            data={{ ...invoiceInformation }}
                            callback={() => setViewMode(!viewMode)}
                            />
                        </div>
                      </div>
                    }
                  />
                )}
                
                {/* Actions Toolbar */}
                <div className="relative flex justify-end items-center gap-3 mb-2">
                  <button
                    className="group relative px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-violet-700 hover:border-violet-200 hover:bg-violet-50 transition-all duration-200 flex items-center gap-2 text-xs font-bold shadow-sm"
                    onClick={handleEditFormToggle}
                  >
                    <span>EDIT</span>
                    <Pencil className="text-lg group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    className="group relative px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-violet-700 hover:border-violet-200 hover:bg-violet-50 transition-all duration-200 flex items-center gap-2 text-xs font-bold shadow-sm"
                    onClick={() => handleView()}
                  >
                    <span>PREVIEW</span>
                    <EyeLightDouble className="text-lg group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    className="group relative px-6 py-2 rounded-lg bg-violet-600 text-white font-bold shadow-sm hover:bg-violet-700 hover:shadow-md transition-all duration-200 flex items-center gap-2 text-xs"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    {isLoading ? (
                      <Spinner
                        type="grow"
                        color="light"
                        size="sm"
                        className="mr-1"
                      ></Spinner>
                    ) : (
                      <SendFast className="text-xl group-hover:rotate-12 transition-transform" />
                    )}
                    SEND INVOICE
                  </button>
                </div>

                {/* Recipient Section */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex flex-col gap-4">
                    <strong className="text-lg text-slate-800 font-bold tracking-tight">
                      Sending to:
                    </strong>
                    <div className="w-full md:w-1/2">
                      {!useCustomChecked ? (
                        <div className="relative">
                            <Input
                            type="select"
                            id="client-list"
                            className="clean-input w-full p-2.5 rounded-lg appearance-none cursor-pointer bg-white text-slate-800 font-medium"
                            onChange={handleSelectClient}
                            >
                            {[{ email: "-- Select Client --" }, ...clients].map((_, i) => (
                                <option key={i} className="text-slate-800">{_.email}</option>
                            ))}
                            </Input>
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="Recipient email address..."
                          value={customEmail}
                          onChange={handleSetCustomEmail}
                          className="clean-input w-full p-2.5 rounded-lg"
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-6 mt-2">
                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    onChange={(e) => setUseCustom(e.currentTarget.checked)} 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 shadow-inner"></div>
                                <span className="ml-3 text-sm font-bold text-slate-600">Use custom email</span>
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={sendAsMessage}
                                    className="sr-only peer"
                                    onChange={(e) => setSetAsMessage(e.currentTarget.checked)} 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 shadow-inner"></div>
                                <span className="ml-3 text-sm font-bold text-slate-600">Send as direct message</span>
                            </label>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Recurring Invoice Section (Monetization Feature - Clean UI) */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-violet-200 hover:shadow-md transition-all">
                  <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <SendFast className="text-9xl text-violet-600 transform rotate-12" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                         <strong className="text-lg text-slate-800 font-bold tracking-tight">Recurring Invoice</strong>
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">PRO FEATURE</span>
                      </div>
                      <p className="text-slate-600 text-sm font-medium">Automatically bill this client on a schedule.</p>
                    </div>

                    <div className="flex items-center gap-4">
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              className="sr-only peer"
                              onChange={(e) => {
                                // Gated Feature: Recurring Invoices
                                // TODO: Replace with actual state check after verifying backend mapping
                                // const isPro = subscriptionStatus === 'pro'; 
                                if (false) { // forcing false for demo until backend is ready or manually toggled
                                   // Allow toggle
                                } else {
                                   e.preventDefault();
                                   e.currentTarget.checked = false;
                                   setShowUpgradeModal(true);
                                }
                              }} 
                          />
                          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-violet-600 shadow-inner"></div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Collapsible Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-100 transition-all duration-300">
                      <div className="relative">
                        <label className="text-xs text-slate-600 uppercase font-bold tracking-wider mb-2 block">Frequency</label>
                         <div className="relative">
                            <select className="clean-input w-full p-2.5 rounded-lg appearance-none cursor-pointer text-slate-800 bg-white font-medium">
                                <option>Weekly</option>
                                <option>Bi-Weekly</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Annually</option>
                            </select>
                         </div>
                      </div>
                      <div className="relative">
                        <label className="text-xs text-slate-600 uppercase font-bold tracking-wider mb-2 block">Start Date</label>
                         <input type="date" className="clean-input w-full p-2.5 rounded-lg text-slate-800 font-medium" />
                      </div>
                      <div className="relative">
                        <label className="text-xs text-slate-600 uppercase font-bold tracking-wider mb-2 block">End Date (Optional)</label>
                         <input type="date" className="clean-input w-full p-2.5 rounded-lg text-slate-800 font-medium" />
                      </div>
                  </div>
                </div>

                {editToggle && (
                  <Overlay
                    children={
                      <div className="w-full max-w-5xl h-[85vh] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col md:flex-row overflow-hidden relative animate-fade-in-up m-4">
                        <button 
                            onClick={handleEditFormToggle}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <RemoveCircle className="text-2xl" />
                        </button>
                        
                        <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-slate-100">
                            <h3 className="text-xl text-slate-800 font-bold mb-6">Invoice Details</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {FORM}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-0 bg-slate-50">
                          <div className="h-full overflow-y-auto custom-scrollbar p-6">
                             <ProductsList />
                          </div>
                        </div>
                      </div>
                    }
                  />
                )}
                
                {/* Mobile Products List */}
                <div className="relative h-auto overflow-y-auto block md:hidden border-t border-slate-200 pt-4">
                  <ProductsList />
                </div>

                <div className="w-full h-px bg-slate-200 my-6" />

                <div className="relative w-full flex items-center justify-end py-2">
                   {/* VAT Discount Input Area */}
                  <div className="w-full max-w-md bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex justify-between items-center gap-3 shadow-sm">
                     <span className="text-slate-600 text-sm font-bold">Params:</span>
                    {VAT_DISCOUNT_INPUT} 
                    <Currency />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 mt-4">
                    <div className="bg-white shadow-sm p-6 rounded-xl w-full max-w-sm border border-slate-200/60">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-600 text-sm font-bold">Discount</span>
                            <span className="text-slate-800 font-mono font-bold">{Number(invoiceInformation.Discount)}%</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-600 text-sm font-bold">Tax (VAT)</span>
                            <span className="text-slate-800 font-mono font-bold">{Number(invoiceInformation.VAT)}%</span>
                        </div>
                        <div className="w-full h-px bg-slate-100 mb-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-slate-800 font-extrabold text-lg">Total</span>
                            <span className="text-violet-600 font-extrabold text-2xl">
                                {Number(invoiceInformation.TOTAL).toLocaleString()}{" "}
                                <span className="text-sm text-slate-500 font-medium">{invoiceInformation.currency != "--select--" && invoiceInformation.currency}</span>
                            </span>
                        </div>
                    </div>
                </div>
              </section>
          </div>
        )}
        <SubscriptionModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      </>
    );
  }
);

export default Template;
