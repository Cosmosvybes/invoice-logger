import { useState } from "react";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useInvoiceReceivedController() {
  const { inbox } = useAppSelector((state) => state.invoice);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentList = inbox.slice(indexOfFirstPage, indexOfLastPage);
  return {
    inbox,
    setCurrentPage,
    currentList,
    currentPage,
    postPerPage,
  };
}
