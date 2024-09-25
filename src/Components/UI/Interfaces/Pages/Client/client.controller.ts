import { useState } from "react";
import { Client } from "../../../../../States/Slices/ClientSlice/client.types";
import { setIsLoggedIn } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
export default function useClientDataController(clients: Client[]) {
  const dispatch = useAppDispatch();
  dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));

  const notFound = [
    { id: 1, text: "Empty" },
    { id: 2, text: "Empty" },
    { id: 4, text: "Empty" },
    { id: 45, text: "Empty" },
    { id: 153, text: "Empty" },
    { id: 121, text: "Empty" },
  ];

  const tableColums = [
    { id: 4, text: "ID" },
    { id: 13, text: "Name" },
    { id: 15, text: "Email" },
    { id: 16, text: "Address" },
    { id: 17, text: "City" },
    { id: 173, text: "Country" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentList = clients.slice(indexOfFirstUser, indexOfLastUser);

  return {
    setCurrentPage,
    currentList,
    postPerPage,
    notFound,
    tableColums,
  };
}
