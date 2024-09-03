import Template from "../../Tools/_helper/Formbuilder/InvoiceTemplate/Template";
import useModalController from "../../Tools/InvoiceModal/controller";
import BreadCrumb from "../../Tools/Layout/BreadCrumb";

const Create = () => {
  const { forms, senderInfo } = useModalController();

  return (
    <>
      <div className="relative px-28  max-sm:px-0 max-md:w-full ">
        <BreadCrumb useLink={false} title={"New invoice"} linkTitle="invoice" />
        <Template reciepient={forms} sender={senderInfo} />
      </div>
    </>
  );
};

export default Create;
