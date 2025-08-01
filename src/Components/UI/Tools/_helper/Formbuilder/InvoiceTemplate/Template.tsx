import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
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

const Template = React.memo(
  ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
    const { forms } = useModalController();
    const [modal, setModal] = useState(false);
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
              className="relative items-center  px-3 py-3 gap-1 flex justify-between"
              key={input.placeholder}
            >
              <p className="text-gray-500 inline">{input.placeholder}</p>
              <Input
                title="check"
                type="checkbox"
                className="max-sm:w-auto max-sm:text-xs"
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
              className="relative  justify-start   max-sm:ml-0 max-md:items-start max-md:ml-0 gap-1 flex flex-col  max-sm:justify-start"
              key={index}
            >
              {" "}
              <p className="text-gray-400 ml-0 font-normal px-2 text-xl max-sm:inline  block max-sm:text-sm">
                {input.placeholder}
              </p>
              <Input
                title="date"
                type="date"
                className=" bg-inherit px-1 py-2 font-bold border w-52   max-sm:w-full  max-sm:text-xs text-slate-400 border-none"
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
              <Input
                className="border-none py-3 px-1 bg-gray-200 border  text-xl  font-normal max-sm:text-xs outline-none rounded-md bg-inherit text-gray-400 w-full max-sm:w-full"
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
        className="relative py-2  max-sm:px-0 flex  items-center"
        key={input.id}
      >
        <Input
          className="py-2 text-xl text-center max-sm:text-xs  max-md:text-md  outline-none rounded-sm text-gray-400 px-0 font-normal w-36  max-sm:w-full"
          type={"text"}
          placeholder={`${input.placeholder} %`}
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
      </div>
    ));

    //

    return (
      <>
        {loading && (
          <Overlay
            children={
              <div className="animate-spin z-10 ">
                <LoadingDashed className="text-3xl text-purple-600" />
              </div>
            }
          />
        )}

        {!invoiceInformation && loading ? (
          <Spinner_ />
        ) : (
          <Card className="border-none">
            <CardBody>
              <Modal
                centered={true}
                isOpen={modal}
                toggle={() => setModal(!modal)}
                fade={true}
              >
                <ModalHeader>Sending Invoice</ModalHeader>
                <ModalBody>Do you want send this invoice now ?</ModalBody>
                <ModalFooter>
                  <Button
                    className="p-2 py-2"
                    color="danger"
                    onClick={() => setModal(!modal)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    className=" mt-1 bg-gradient-to-br from-black to-purple-900 h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto"
                    // color="success"
                    onClick={() => {
                      handleSendInvoice(emailHtml);
                      setModal(!modal);
                    }}
                  >
                    Yes, I'm sending.
                  </Button>
                </ModalFooter>
              </Modal>

              <section className="flex  relative  transition duration-700 justify-start w-full h-screen flex-col  ">
                {viewMode && (
                  <Overlay
                    children={
                      <div className="relative h-[44rem] overflow-y-scroll max-sm:py-5 w-full">
                        <ViewModal
                          data={{ ...invoiceInformation }}
                          callback={() => setViewMode(!viewMode)}
                        />{" "}
                      </div>
                    }
                  />
                )}
                {/* <hr className="mb-1 border border-gray-400" /> */}
                <div className="relative  flex justify-end items-center px-0 h-auto max-sm:mb-10  gap-2">
                  <button
                    className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
                    onClick={handleEditFormToggle}
                  >
                    FILL DETAILS
                    <Pencil className="text-2xl inline text-white" />
                  </button>
                  <button
                    className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
                    onClick={() => handleView()}
                  >
                    PREVIEW
                    <EyeLightDouble className="text-2xl inline text-white" />
                  </button>

                  <button
                    className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    {isLoading ? (
                      <Spinner
                        type="grow"
                        color="light"
                        size="sm"
                        className="mr-0.5"
                      ></Spinner>
                    ) : (
                      <SendFast className="text-2xl inline text-white" />
                    )}
                    SEND
                  </button>
                </div>

                <div className="relative flex  justify-start max-sm:justify-end">
                  <div className="relative flex flex-col  mb-1 w-full">
                    <strong className="w-full text-2xl max-sm:text-xl mb-2 font-semibold">
                      Sending to:
                    </strong>
                    <div className="relative w-1/5 max-sm:w-full  h-auto ">
                      {!useCustomChecked ? (
                        <Input
                          type="select"
                          id="client-list"
                          className="py-3 px-4 rounded-md bg-gray-100 w-full"
                          onChange={handleSelectClient}
                        >
                          {[{ email: "--select--" }, ...clients].map((_, i) => (
                            <option key={i}>{_.email}</option>
                          ))}
                        </Input>
                      ) : (
                        <Input
                          color="dark"
                          type="text"
                          placeholder="Receipient email here..."
                          value={customEmail}
                          onChange={handleSetCustomEmail}
                          className="py-3 px-3"
                        />
                      )}
                    </div>

                    <FormGroup color="dark" switch className="mt-3">
                      <Input
                        className="text-black"
                        color="dark"
                        type="switch"
                        onChange={(e) => {
                          setUseCustom(e.currentTarget.checked);
                        }}
                      />
                      <Label className="max-sm:text-xs text-xl text-gray-400">
                        use custom email
                      </Label>
                    </FormGroup>
                    <FormGroup switch className="mt-3">
                      <Input
                        type="switch"
                        checked={sendAsMessage}
                        onChange={(e) => {
                          setSetAsMessage(e.currentTarget.checked);
                        }}
                      />
                      <Label className="max-sm:text-xs text-xl text-gray-400">
                        send as direct message
                      </Label>
                    </FormGroup>
                  </div>
                </div>

                {editToggle && (
                  <Overlay
                    children={
                      <div className="w-full h-auto max-sm:w-full bg-purple-100 rounded-lg flex  mt-10 max-sm:mt-20 justify-between items-start">
                        <span className=" p-2   border right-16 max-sm:right-2 top-5 max-sm:top-10 rounded-full bg-gray-100  absolute">
                          <RemoveCircle
                            onClick={handleEditFormToggle}
                            className="text-3xl text-black hover:text-gray-400"
                          />
                        </span>
                        <div className="grid grid-cols-2 max-sm:w-full max-sm:px-2  w-1/2 gap-2 py-10 px-10 z-5">
                          {FORM}
                        </div>
                        <div className="relative w-1/2 h-full max-sm:hidden overflow-y-scroll">
                          {" "}
                          <ProductsList />
                        </div>
                      </div>
                    }
                  />
                )}
                <div className="relative hidden max-sm:block max-md:block">
                  {" "}
                  <ProductsList />
                </div>
                <br className="w-full border-gray-300" />
                <br className="w-full border-gray-300" />
                <div className="relative w-full flex items-center justify-start py-2">
                  <div className="relative  w-1/3 max-sm:w-full  mt-1 flex justify-start items-center  gap-3">
                    {VAT_DISCOUNT_INPUT} <Currency />
                  </div>
                </div>

                <hr className="w-1/2" />
                <div className="relative w-full flex justify-start  max-md:w-full  max-sm:grid grid-cols-1 max-sm:px-0 items-center">
                  <div className="relative grid grid-cols-1 items-center w-1/2 max-md:w-full max-sm:w-full  gap-2">
                    <div className="relative flex justify-between items-center max-sm:w-full">
                      <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                        discount
                      </p>

                      <p className="text-xl  text-gray-500 mr-2  font-normal">
                        {Number(invoiceInformation.Discount)}%
                      </p>
                    </div>

                    <div className="relative flex justify-between items-center   gap-2 ">
                      <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                        Tax
                      </p>

                      <p className="text-xl  text-gray-500 mr-2  font-normal">
                        {" "}
                        {Number(invoiceInformation.VAT)}%
                      </p>
                    </div>

                    <hr className="w-full border-gray-300" />

                    <div className="relative flex justify-between items-center   gap-2 ">
                      <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                        Total
                      </p>
                      <p className="text-xl  text-gray-500 mr-2  font-normal">
                        {Number(invoiceInformation.TOTAL).toLocaleString()}{" "}
                        {invoiceInformation.currency != "--select--" &&
                          invoiceInformation.currency}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </CardBody>
          </Card>
        )}
      </>
    );
  }
);

export default Template;
