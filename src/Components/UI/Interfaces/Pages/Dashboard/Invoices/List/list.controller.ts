import { useLayoutEffect, useRef, useState } from "react";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../../../States/hoooks/hook";
import { markAsPaid } from "../../../../../../../States/Slices/invoice";
import { API_URL } from "../../../../../../../Components/constants/Index";

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
  const dispatch = useAppDispatch();

  const handleMarkAsPaid = async (invoiceID: any) => {
    const response = await fetch(
      `${API_URL}/api/invoice/mark-as-paid/?invoiceID=${invoiceID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      toast.error("operation failed", { theme: "dark" });
    }
    const result = await response.json();
    toast.success(result.response, { theme: "light" });
    dispatch(markAsPaid({ invoiceID }));
  };

  return {
    showActions,
    actionCard,
    setCurrentRowDataID,
    currentRowDataID,
    setShowActions,
    listPerTable,
    currentInvoiceList,
    currentPage,
    handleNextList,
    handleMarkAsPaid,
  };
}
