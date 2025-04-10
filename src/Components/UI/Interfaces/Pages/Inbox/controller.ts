import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import {
  getUser,
  setIsAuthenticated,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";

export default function useInvoiceReceivedController() {
  useEffect(() => {
    dispatch(setIsAuthenticated());
    dispatch(getUser());
  }, []);
  const dispatch = useAppDispatch();
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
    postPerPage,
  };
}
