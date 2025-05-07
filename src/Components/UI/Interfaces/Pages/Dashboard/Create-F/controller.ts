import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../../States/hoooks/hook";

export default function useCreateController() {
  const { draft, loading } = useAppSelector((state) => state.invoice);
  const { id } = useParams();

  let invoiceInformation: any;
  function setInvoiceInformation() {
    if (!id) {
      invoiceInformation = draft?.find(
        (invoice) => invoice.id == localStorage.getItem("id")
      )!;
    } else {
      invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
    }
  }

  setInvoiceInformation();
  setTimeout(() => {
    return setInvoiceInformation();
  }, 2000);

  return { invoiceInformation, loading };
}
