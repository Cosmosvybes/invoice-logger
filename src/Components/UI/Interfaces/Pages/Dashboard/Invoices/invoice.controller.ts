import { useState } from "react";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
//custom hook
export default function useInvoiceController() {
  const { draft, sent, paid, overdue } = useAppSelector(
    (state) => state.invoice
  );
  const [currentData, setFilter] = useState<Invoice[]>(sent);

  //filter func
  const handleInvoiceFilter = (arg: string) => {
    switch (arg) {
      case "draft":
        setFilter(draft);
        break;
      case "sent":
        setFilter(sent);
        break;
      case "paid":
        setFilter(paid);
        break;
      case "overdue":
        setFilter(overdue);
        break;
      default:
        break;
    }
  };

  return {
    currentData,
    handleInvoiceFilter,
  };
}
