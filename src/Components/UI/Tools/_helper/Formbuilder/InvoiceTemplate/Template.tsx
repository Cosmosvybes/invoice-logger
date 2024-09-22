import {
  Button,
  Card,
  CardBody,
  Form,
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
import { useState } from "react";
import { Invoice } from "../../../../../../States/Slices/invoice.types";

const Template = ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
  const { forms } = useModalController();
  const [modal, setModal] = useState(false);
  const {
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
  } = useTemplateController();

  //   //?? ///////////////////////////////////////////////
  // FORM BUILDER TEMPLATE
  //   //?? ///////////////////////////////////////////////

  const emailHtml = render(<Mailer invoiceInformation={invoiceInformation} />, {
    pretty: true,
  });

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
              className=" bg-inherit px-1 font-bold border w-52   max-sm:w-full  max-sm:text-xs text-slate-400 border-none"
              value={invoiceInformation[input.name]}
              onChange={(e) => updateInvoiceDetails(e.target.value, input.name)}
            />
          </div>
        );
      default:
        return (
          <div className="relative" key={index}>
            <Input
              className="px-2 border-none py-2 text-xl  font-normal max-sm:text-xs outline-none rounded-sm bg-inherit text-black w-96 max-sm:w-full"
              type="text"
              value={invoiceInformation[input.name]}
              placeholder={input.placeholder}
              onChange={(e) => updateInvoiceDetails(e.target.value, input.name)}
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
        className="py-2 text-xl text-center max-sm:text-xs  max-md:text-md  outline-none rounded-sm text-black px-0 font-normal w-36  max-sm:w-full"
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
      {!invoiceInformation && loading ? (
        <Spinner_ />
      ) : (
        <Card className="border-none">
          <CardBody>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} fade={true}>
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
                  className="p-2 py-2"
                  color="dark"
                  onClick={() => {
                    handleSendInvoice(emailHtml);
                    setModal(!modal);
                  }}
                >
                  Yes, I'm sending.
                </Button>
              </ModalFooter>
            </Modal>

            <section className="flex bg-white relative  transition duration-700 justify-start w-full h-full flex-col  px-1 max-sm:px-1">
              {viewMode && (
                <ViewModal
                  data={{ ...invoiceInformation }}
                  callback={() => setViewMode(!viewMode)}
                />
              )}
              <div className="relative">

                
              </div>
              <div className="relative  flex justify-end items-center px-0 h-auto  gap-2">
                <Button
                  onClick={() => handleView()}
                  className="w-44 h-full mb-2 max-sm:w-28 shadow-md border-none border-gray-400 bg-black  text-center py-2 flex justify-center items-center transition duration-500 px-2 text-gray-black text-sm font-normal rounded-sm "
                >
                  <EyeLightDouble className="text-2xl text-white inline" />
                  VIEW
                </Button>

                <Button
                  onClick={() => {
                    setModal(!modal);
                  }}
                  className="w-44 h-full mb-2 max-sm:w-28 shadow-md border-none border-gray-400 bg-black  text-center flex py-2 justify-center items-center transition duration-500 px-2 text-gray-black text-sm font-normal rounded-sm "
                >
                  {isLoading ? (
                    <Spinner
                      type="grow"
                      color="light"
                      size="sm"
                      className="mr-0.5"
                    ></Spinner>
                  ) : (
                    <SendFast className="text-2xl inline text-white " />
                  )}
                  SEND
                </Button>
              </div>

              <Form className="grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-2 w-full mb-2  gap-3 max-sm:gap-4">
                {FORM}
              </Form>

              <ProductsList />

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
};

export default Template;
