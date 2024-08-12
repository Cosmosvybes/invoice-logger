import { useLayoutEffect, useRef, useState } from "react";

export default function useInvoiceListController() {
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

  return {
    showActions,
    actionCard,
    setCurrentRowDataID,
    currentRowDataID,
    setShowActions,
  };
}
