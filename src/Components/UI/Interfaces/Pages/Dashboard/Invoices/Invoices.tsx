import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();

  return (
    <>
      <div className="relative px-28 max-sm:px-0 max-sm:overflow-x-scroll max-sm:overflow-y-clip h-auto max-sm:h-auto">
        <BreadCrumb useLink={true} title="Invoices" linkTitle="new/invoice" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <Body currentData={currentData} />
      </div>
    </>
  );
};

export default withAuth(Invoices);
