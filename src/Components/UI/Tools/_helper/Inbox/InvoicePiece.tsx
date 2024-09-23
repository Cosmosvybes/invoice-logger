import { MailArrowLeft } from "react-huge-icons/bulk";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
// import ViewModal from "../Formbuilder/View/ViewModal";
import { useState } from "react";
import PDFDownloader from "../../../../PDF/Components/PDFDownloader";
import GeneratePDF from "../../../../PDF/PDFGenereator";
import { useAppSelector } from "../../../../../States/hoooks/hook";
const InvoicePiece = () => {
  const { staticForm } = useAppSelector((state) => state.invoice);
  const [modal, setModal] = useState(false);
  const toggle_ = () => {
    setModal(!modal);
  };

  return (
    <>
      <Card className="h-auto max-sm:w-full flex justify-between  b-l-secondary ribbon-wrapper-right shadow-md">
        <CardHeader className="flex justify-between items-center ">
          <p className="text-green-500 text-4xl max-sm:text-xl"> ●●●</p>{" "}
          <MailArrowLeft className="h-full text-gray-400 text-5xl max-sm:text-4xl" />{" "}
        </CardHeader>
        <CardBody className="border-none  flex justify-between ">
          <h1 className="text-green-400  font-normal flex justify-center items-center px-1">
            Reference ID- 12345790F
          </h1>
          <div className="relative flex justify-center gap-1 max-sm:gap-3  items-center ">
            <PDFDownloader
              reportType={"1234566776-invoice"}
              file={
                <GeneratePDF
                  invoiceInformation={staticForm}
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
        <ModalHeader>Invoice-12347432JT</ModalHeader>
        <ModalBody>
          <h1>Hello </h1>
          {/* <ViewModal /> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default InvoicePiece;
