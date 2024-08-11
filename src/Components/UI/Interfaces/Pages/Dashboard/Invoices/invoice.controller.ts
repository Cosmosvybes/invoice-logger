import { useState } from "react";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
//custom hook
export default function useInvoiceController() {
  const { draft, sent } = useAppSelector((state) => state.invoice);
  const [currentData, setFilter] = useState<Invoice[]>(sent);

  //filter func
  const handleInvoiceFilter = (arg: string) => {
    switch (arg) {
      case "Draft":
        setFilter(draft);
        break;
      case "Sent":
        setFilter(sent);
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
