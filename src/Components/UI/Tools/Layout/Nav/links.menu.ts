import { useState } from "react";

export default function useNavMenu() {
  const [links] = useState([
    { id: 1, path: "", name: "Home" },
    { id: 2, path: "invoice", name: "Invoice" },
    { id: 3, path: "Clients", name: "Clients" },
  ]);
  const handleActive = (id: number) => {
    setActive(id);
  };
  const [active, setActive] = useState(links[0].id);

  return {
    links,
    active,
    handleActive,
  };
}
