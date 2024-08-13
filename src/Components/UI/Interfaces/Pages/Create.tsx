import { useParams } from "react-router-dom";
import Template from "../../Tools/_helper/Formbuilder/Template";
import useModalController from "../../Tools/InvoiceModal/controller";
import { useAppSelector } from "../../../../States/hoooks/hook";
import BreadCrumb from "../../Tools/Layout/BreadCrumb";

const Create = () => {
  const { forms, senderInfo } = useModalController();
  const { id } = useParams();
  const { draft } = useAppSelector((state) => state.invoice);

  let itemsList = draft.find(
    (invoice: any) => invoice.id == Number(id)
  )?.itemList;

  return (
    <>
      <div className="relative px-28 max-sm:px-0 ">
        <BreadCrumb useLink={false} title={"New invoice"} linkTitle="invoice" />
        <Template reciepient={forms} sender={senderInfo} item={itemsList} />
      </div>
    </>
  );
};

export default Create;
