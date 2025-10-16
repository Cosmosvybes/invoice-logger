import { useEffect } from "react";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";
import Template from "../../../../Tools/_helper/Formbuilder/InvoiceTemplate/Template";
import Spinner_ from "../../../../Tools/_helper/Loader/Spinner";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import useCreateController from "./controller";
const Create = () => {
  const { invoiceInformation } = useCreateController();
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="relative px-28  max-sm:px-0 max-md:w-full ">
        <div className="relative">
          <BreadCrumb
            useLink={false}
            title={"New invoice"}
            linkTitle="invoice"
          />

          {invoiceInformation ? (
            <Template invoiceInformation={invoiceInformation} />
          ) : (
            <Spinner_ />
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(Create);
