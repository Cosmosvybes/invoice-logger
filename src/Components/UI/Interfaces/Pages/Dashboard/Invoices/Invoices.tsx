import InvoiceTable from "../../../../Tools/InvoiceModal/InvoiceTable";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import Empty from "./Empty";
import InvoiceNav from "./InvoiceNav";
import List from "./List";
import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  return (
    <>
      <div className="relative px-28 max-sm:px-0 overflow-x-scroll">
        <BreadCrumb useLink={true} title="Invoices" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <InvoiceTable />

        <div className="relative">
          {currentData.length == 0 ? (
            <Empty />
          ) : (
            <List currentData={currentData} />
          )}
        </div>
      </div>
    </>
  );
};

export default Invoices;
