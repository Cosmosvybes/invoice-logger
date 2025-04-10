import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";
import {
  getUser,
  setIsAuthenticated,
} from "../../../../../../States/Slices/ClientSlice/useAuth/user";

const Invoices = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(setIsAuthenticated());
  }, []);
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

export default Invoices;
