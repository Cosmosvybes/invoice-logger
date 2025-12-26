import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../../../States/hoooks/hook";
import { getInvoice } from "../../../../../../States/Slices/invoice";

export default function useCreateController() {
  const { draft, loading, currentInvoice } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
        // If we have an ID but it's not in the draft list (e.g. refresh), check if we need to fetch it
        const existsInDraft = draft?.find((inv) => String(inv.id) === String(id));
        
        // If not in draft and not currently loaded (or loaded ID doesn't match), fetch it
        // Note: checking currentInvoice.id might need casting if types are loose
        if (!existsInDraft && (!currentInvoice || String((currentInvoice as any).id) !== String(id))) {
            dispatch(getInvoice(id));
        }
    }
  }, [id, draft, currentInvoice, dispatch]);

  // Priority: 1. Draft list (local edits) 2. Fetched invoice (server data)
  const invoiceInformation = id 
    ? (draft?.find((inv) => String(inv.id) === String(id)) || currentInvoice)
    : draft?.find((invoice) => invoice.id == localStorage.getItem("id"));

  return { invoiceInformation, loading };
}
