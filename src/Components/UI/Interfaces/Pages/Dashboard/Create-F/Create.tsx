import Template from "../../../../Tools/_helper/Formbuilder/InvoiceTemplate/Template";
import Spinner_ from "../../../../Tools/_helper/Loader/Spinner";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import useCreateController from "./controller";
const Create = () => {
  const { invoiceInformation, loading } = useCreateController();
  return (
    <>
      {invoiceInformation && !loading ? (
        <div className="relative px-28  max-sm:px-0 max-md:w-full ">
          <div className="relative">
            <BreadCrumb
              useLink={false}
              title={"New invoice"}
              linkTitle="invoice"
            />

            {invoiceInformation && !loading ? <Template /> : <Spinner_ />}
          </div>
        </div>
      ) : (
        <Spinner_ />
      )}
    </>
  );
};

export default Create;
