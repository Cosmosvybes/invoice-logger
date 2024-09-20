import Template from "../../../../Tools/_helper/Formbuilder/InvoiceTemplate/Template";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import useCreateController from "./controller";
const Create = () => {
  const { invoiceInformation } = useCreateController();
  return (
    <>
      {invoiceInformation && (
        <div className="relative px-28  max-sm:px-0 max-md:w-full ">
          <div className="relative">
            <BreadCrumb
              useLink={false}
              title={"New invoice"}
              linkTitle="invoice"
            />

            {invoiceInformation && (
              <Template invoiceInformation={invoiceInformation} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Create;
