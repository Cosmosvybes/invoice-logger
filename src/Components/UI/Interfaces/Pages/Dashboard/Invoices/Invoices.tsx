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
      <div className="relative  h-screen px-28 max-sm:px-0 max-sm:overflow-x-scroll border max-sm:overflow-y-clip s max-sm:h-screen border border-grey-500 bg-transparent">
        <BreadCrumb useLink={true} title="Invoices" linkTitle="new/invoice" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <Body currentData={currentData} />
      </div>
    </>
  );
};

export default withAuth(Invoices);
