import { useState } from "react";
import { Client } from "../../../../../States/Slices/ClientSlice/client.types";
import { setIsAuthenticated } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";

export default function useClientDataController(clients: Client[]) {
  const dispatch = useAppDispatch();
  dispatch(setIsAuthenticated());

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentList = clients.slice(indexOfFirstUser, indexOfLastUser);

  return {
    setCurrentPage,
    currentList,
    currentPage,
    postPerPage,
  };
}
