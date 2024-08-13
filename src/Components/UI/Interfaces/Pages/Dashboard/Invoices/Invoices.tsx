import InvoiceTable from "../../../../Tools/InvoiceModal/InvoiceTable";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  return (
    <>
      <div className="relative px-28 max-sm:px-0 overflow-x-scroll overflow-y-clip h-screen max-sm:h-auto">
        <BreadCrumb useLink={true} title="Invoices" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <InvoiceTable />
        <Body currentData={currentData} />
      </div>
    </>
  );
};

export default Invoices;
