import { useParams } from "react-router-dom";
import Template from "../../Tools/_helper/Formbuilder/Template";
import useModalController from "../../Tools/InvoiceModal/controller";
import { useAppSelector } from "../../../../States/hoooks/hook";
import BreadCrumb from "../../Tools/Layout/BreadCrumb";

const Main = () => {
  const { forms, senderInfo } = useModalController();
  const { id } = useParams();
  const { invoices } = useAppSelector((state) => state.invoice);

  let itemsList = invoices.find(
    (invoice: any) => invoice.id == Number(id)
  )?.itemList;

  return (
    <>
      <div className="relative px-28 max-sm:px-0 ">
        <BreadCrumb useLink={false} title={"Invoice"} />
        <Template reciepient={forms} sender={senderInfo} item={itemsList} />
      </div>
    </>
  );
};

export default Main;
