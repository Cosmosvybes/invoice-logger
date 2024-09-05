import { useState } from "react";
import { Client } from "../../../../../States/Slices/ClientSlice/client.types";
import { setIsLoggedIn } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";

export default function useClientDataController(clients: Client[]) {
  const dispatch = useAppDispatch()
  dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  const [notFound] = useState([
    { id: 1, text: "Empty" },
    { id: 1, text: "Empty" },
    { id: 1, text: "Empty" },
    { id: 1, text: "Empty" },
    { id: 1, text: "Empty" },
    { id: 1, text: "Empty" },
  ]);

  const [tableColums] = useState([
    { id: 1, text: "ID" },
    { id: 1, text: "Name" },
    { id: 1, text: "Email" },
    { id: 1, text: "Address" },
    { id: 1, text: "City" },
    { id: 1, text: "Country" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(7);
  const indexOfLastUser = currentPage * listPerPage;
  const indexOfFirstUser = indexOfLastUser - listPerPage;
  const currentList = clients.slice(indexOfFirstUser, indexOfLastUser);
  return {
    setCurrentPage,
    currentList,
    listPerPage,
    notFound,
    tableColums,
  };
}
