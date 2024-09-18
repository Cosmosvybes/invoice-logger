import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { useEffect } from "react";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../../States/Slices/ClientSlice/useAuth/user";

export default function useCreateController() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
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
