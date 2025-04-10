import { MailArrowLeft } from "react-huge-icons/bulk";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState } from "react";
import PDFDownloader from "../../../../PDF/Components/PDFDownloader";
import GeneratePDF from "../../../../PDF/PDFGenereator";

import { Invoice } from "../../../../../States/Slices/invoice.types";
const InvoicePiece = ({
  invoiceInformation,
}: {
  invoiceInformation: Invoice;
}) => {
  const [modal, setModal] = useState(false);
  const toggle_ = () => {
    setModal(!modal);
  };

  return (
    <>
      <Card className="h-auto max-sm:w-full flex justify-between  b-l-secondary ribbon-wrapper-right shadow-md">
        <CardHeader className="flex justify-between items-center ">
          <p className="text-gray-400 text-4xl max-sm:text-xl"> ●●●</p>{" "}
          <MailArrowLeft className="h-full text-gray-400 text-5xl max-sm:text-4xl" />{" "}
        </CardHeader>
        <CardBody className="border-none  flex justify-between items-center ">
          <h1 className="text-gray-400  font-normal flex justify-between items-start ">
            {/* <p className="text-purple-600">  </p>{" "} */}
            {invoiceInformation.id.toString().slice(10, 17)}
          </h1>
          <div className="relative flex w-3/4 justify-end gap-1 max-sm:gap-2 max-sm:w-full  items-center ">
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

            <Button
              color="success"
              onClick={toggle_}
              className=" border-none shadow-inner font-extrabold"
            >
              OPEN
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle_}>
        <ModalBody>
          <div className="relative flex flex-col gap-2">
            <div className="relative block">
              <p className="text-black  font-normal">
                Invoice ID- {invoiceInformation.id}
              </p>
              <h1 className="text-2xl font-normal text-black underline">
                Business Details
              </h1>
              <p className="text-black  font-normal">
                Business name- {invoiceInformation.Business}
              </p>
              <p className="text-black  font-normal">
                Business address- {invoiceInformation.BusinessAddress}
              </p>
              <p className="text-black  font-normal">
                City/Postal- {invoiceInformation.ClientCity}
              </p>
              <p className="text-black  font-normal">
                State- {invoiceInformation.BusinessState}
              </p>
              <p className="text-black  font-normal">
                Country - {invoiceInformation.BusinessCountry}
              </p>
            </div>
          </div>

          <div className="relative block mt-2">
            <h1 className="text-2xl font-normal text-black underline">
              Client Details
            </h1>
            <div className="relative w-full grid grid-cols-1 text-black">
              <p className="text-black  font-normal">
                Client name- {invoiceInformation.Client}
              </p>
              <p className="text-black  font-normal">
                Client Address- {invoiceInformation.ClientAddress}
              </p>
              <p className="text-black  font-normal">
                City/Postal- {invoiceInformation.City}
              </p>
              <p className="text-black  font-normal">
                State- {invoiceInformation.State}
              </p>
              <p className="text-black  font-normal">
                Country - {invoiceInformation.Country}
              </p>
              <p className="text-black  font-normal">
                Date Issued - {invoiceInformation.DateIssued}
              </p>
              <p className="text-black  font-normal">
                Due Date - {invoiceInformation.DateDue}
              </p>
              <p className="text-black  font-normal">
                Payment information - {invoiceInformation.paymentInformation}
              </p>
              <p className="text-black  font-normal">
                Note - {invoiceInformation.Notes}
              </p>
              <p className="text-black  font-normal">
                Shipping Address - {invoiceInformation.shippingAddress}
              </p>
            </div>
          </div>
          <div className="relative block mt-2">
            <h1 className="text-2xl font-normal text-black underline">
              Items List
            </h1>
            <div className="relative gap-1 grid grid-cols-4">
              <p className="text-black text-center  font-normal">Description</p>
              <p className="text-black text-center font-normal">Quantity</p>
              <p className="text-black text-center  font-normal">Unit Price</p>
              <p className="text-black  text-center font-normal">Sub-total</p>
            </div>
            <div className="relative">
              <div className="relative flex-col flex">
                {invoiceInformation.itemList?.map(
                  ({ description, unitPrice, unitTotal, quantity }, i) => (
                    <div className="relative grid grid-cols-4 gap-1" key={i}>
                      <p className="text-black text-center font-normal">
                        {description}
                      </p>
                      <p className="text-black text-center  font-normal">
                        {quantity}
                      </p>
                      <p className="text-black text-center  font-normal">
                        {unitPrice}
                      </p>
                      <p className="text-black text-center  font-normal">
                        {Number(unitTotal).toFixed(2)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <hr className="w-full border border-black" />
          <div className="relative w-full h-auto grid grid-cols-1  gap-3 mt-2 text-black">
            <div className="relative flex  justify-start items-center">
              <p className="text-black  font-normal">Discount- </p>
              <p className="underline text-black  font-normal">
                {invoiceInformation.Discount}%
              </p>
            </div>
            <div className="relative  flex justify-start items-center">
              <p className="text-black  font-normal">Tax- </p>
              <p className="underline text-black  font-normal">
                {invoiceInformation.VAT}%
              </p>
            </div>
            <div className="relative flex justify-start gap-1 items-center">
              <p className="text-black  font-normal">Total - </p>
              <p className="underline text-black  font-normal">
                {Number(invoiceInformation.TOTAL).toLocaleString() + " "}{" "}
                {invoiceInformation.currency != "--select--" &&
                  invoiceInformation.currency}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className=" mt-1 bg-gradient-to-br from-green-700 to-green-900 h-auto max-sm:h-auto max-sm:text-sm font-semibold flex justify-center items-center rounded-md  text-gray-100 w-auto py-2 px-2 max-sm:w-auto"
            onClick={toggle_}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default InvoicePiece;
