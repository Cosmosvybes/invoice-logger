import { useEffect } from "react";
import { getUser } from "../../States/Slices/invoice";
import { useAppDispatch, useAppSelector } from "../../States/hoooks/hook";
import { useParams } from "react-router-dom";

export default function useInvoiceMailerController() {
  const dispatch = useAppDispatch();
  const { draft } = useAppSelector((state) => state.invoice);

  const { id } = useParams();

  
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
  }, []);

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

  return { invoiceInformation };
}
