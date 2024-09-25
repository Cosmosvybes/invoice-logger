import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import BreadCrumb from "../../../../Tools/Layout/BreadCrumb";

import InvoiceNav from "./InvoiceNav";
import Body from "./List/Body";

import useInvoiceController from "./invoice.controller";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../../States/Slices/ClientSlice/useAuth/user";

const Invoices = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);
  const { currentData, handleInvoiceFilter } = useInvoiceController();
  return (
    <>
      <div className="relative px-28 max-sm:px-0 overflow-x-scroll overflow-y-clip h-auto max-sm:h-auto">
        <BreadCrumb useLink={true} title="Invoices" linkTitle="new/invoice" />
        <InvoiceNav switchTab={handleInvoiceFilter} />
        <Body currentData={currentData} />
      </div>
    </>
  );
};

export default Invoices;
