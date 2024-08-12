import InvoiceTable from "../../../../Tools/InvoiceModal/InvoiceTable";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import Empty from "./Empty";
import InvoiceNav from "./InvoiceNav";
import List from "./List/List";
import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  return (
    <>
      <div className="relative px-28 max-sm:px-0 overflow-x-scroll overflow-y-clip h-screen max-sm:h-auto">
        <BreadCrumb useLink={true} title="Invoices" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <InvoiceTable />

        <div className="relative h-screen ">
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
