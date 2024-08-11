import InvoiceTable from "../../../../Tools/InvoiceModal/InvoiceTable";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import InvoiceNav from "./InvoiceNav";

const Invoices = () => {
  return (
    <>
      <div className="relative px-28 max-sm:px-0">
        <BreadCrumb useLink={true} title="Invoices" />
        <InvoiceNav />
        <InvoiceTable />

        
      </div>
    </>
  );
};

export default Invoices;
