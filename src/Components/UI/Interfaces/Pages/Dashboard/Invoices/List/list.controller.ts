import { useLayoutEffect, useRef, useState } from "react";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";

export default function useInvoiceListController(invoices: Invoice[]) {
  const [currentRowDataID, setCurrentRowDataID] = useState<null | number>(null);

  const [showActions, setShowActions] = useState(false);

  const actionCard = useRef<HTMLDivElement>(null);

  const handleCloseActionCard = (e: Event) => {
    if (actionCard.current && !actionCard.current.contains(e.target as Node)) {
      setShowActions(false);
      setCurrentRowDataID(null);
    }
  };

  useLayoutEffect(() => {
    document.body.addEventListener("mousedown", handleCloseActionCard);
    return () => {
      document.body.removeEventListener("mousedown", handleCloseActionCard);
    };
  }, []);

  const [listPerTable] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextList = (id: number) => {
    setCurrentPage(id);
  };

  const lastInvoiceIndex = listPerTable * currentPage;
  const firstInvoiceIndex = lastInvoiceIndex - listPerTable;
  const currentInvoiceList = invoices.slice(
    firstInvoiceIndex,
    lastInvoiceIndex
  );

  return {
    showActions,
    actionCard,
    setCurrentRowDataID,
    currentRowDataID,
    setShowActions,
    listPerTable,
    currentInvoiceList,
    handleNextList,
  };
}
