import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";
import { useEffect, useLayoutEffect } from "react";
import { getUser } from "../../../../../../States/Slices/invoice";

export default function useCreateController() {
  const dispatch = useAppDispatch();

  //
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
  }, []);
  useLayoutEffect(() => {
    const timeOutId = setTimeout(() => {
      return location.reload();
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, []);

  //
  const { draft, loading } = useAppSelector((state) => state.invoice);
  const { id } = useParams();

  let invoiceInformation: any;
  function setInvoiceInformation() {
    if (id) {
      invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
    } else {
      invoiceInformation = draft?.find(
        (invoice) => invoice.id == localStorage.getItem("id")
      )!;
    }
  }

  setInvoiceInformation();
  setTimeout(() => {
    return setInvoiceInformation();
  }, 2000);

  return { invoiceInformation, loading };
}
