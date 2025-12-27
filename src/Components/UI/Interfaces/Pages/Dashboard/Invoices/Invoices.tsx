import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";

const Invoices = () => {
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <BreadCrumb useLink={true} title="Invoices" linkTitle="new/invoice" />
        <div className="mt-8">
            <InvoiceNav switchTab={handleInvoiceFilter} />
            <Body currentData={currentData} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Invoices);
