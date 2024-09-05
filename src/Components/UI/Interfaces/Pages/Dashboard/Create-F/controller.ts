import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { useEffect, useLayoutEffect } from "react";
import { setIsLoggedIn } from "../../../../../../States/Slices/ClientSlice/useAuth/user";
import { getUser } from "../../../../../../States/Slices/invoice";

export default function useCreateController() {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));

  }, []);

  const { draft } = useAppSelector((state) => state.invoice);
  const { id } = useParams();
  //
  let invoiceInformation: any;
  function setInvoiceInformation() {
    if (id) {
      invoiceInformation = draft.find((invoice: Invoice) => invoice.id == id)!;
    } else {
      invoiceInformation = draft.find(
        (invoice: Invoice) => invoice.id == localStorage.getItem("id")
      )!;
    }
  }
  setInvoiceInformation();
  return {
    invoiceInformation,
  };
}
