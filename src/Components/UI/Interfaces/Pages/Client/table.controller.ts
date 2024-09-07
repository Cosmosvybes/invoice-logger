import { useState } from "react";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useTableController() {
  const { clients } = useAppSelector((state) => state.invoice);
  const [search, setSearch] = useState("");

  const handleSearch = (args: string) => {
    setSearch(args);
  };
  return {
    clients,
    search,
    handleSearch,
  };
}
