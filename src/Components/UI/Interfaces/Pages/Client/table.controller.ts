import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../States/hoooks/hook";
import { deleteClient } from "../../../../../States/Slices/invoice";

export default function useTableController() {
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.invoice);
  const [search, setSearch] = useState("");

  const handleSearch = (args: string) => {
    setSearch(args);
  };

  const handleDeleteClient = (email: string) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (window.confirm("Are you sure you want to delete this client?")) {
            dispatch(deleteClient({ email, token }));
        }
    }
  };

  return {
    clients,
    search,
    handleSearch,
    handleDeleteClient,
  };
}
