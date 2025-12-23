import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  // console.log(currentData)
  return (
    <>
      <div className="relative w-full h-full min-h-screen px-4 md:px-12 py-6">
        <BreadCrumb useLink={true} title="Invoices" linkTitle="new/invoice" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <Body currentData={currentData} />
      </div>
    </>
  );
};

export default withAuth(Invoices);
