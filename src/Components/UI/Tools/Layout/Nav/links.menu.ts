import { useLayoutEffect, useRef, useState } from "react";

export default function useNavMenu(icons: any) {
  const [links] = useState([
    { id: 1, path: "", name: "Home" },
    { id: 2, path: "invoices", name: "Invoices" },
    { id: 3, path: "Clients", name: "Clients" },
  ]);
  const handleActive = (id: number) => {
    setActive(id);
  };
  const [active, setActive] = useState(links[0].id);
  const [viewMode, setMode] = useState(false);
  const sideMenu = [
    {
      id: 1,
      title: "Creator",
      children: [
        {
          id: 1,
          title: "Dashboard",
          path: "",
          icon: icons[8],
        },
        {
          id: 1,
          title: "Invoices",
          path: "invoices",
          icon: icons[0],
        },
        {
          id: 2,
          title: "New invoice",
          path: "new/invoice",
          icon: icons[1],
        },
        {
          id: 1,
          title: "Clients",
          path: "clients",
          icon: icons[2],
        },
        {
          id: 1,
          title: "Add Client",
          path: "client/new",
          icon: icons[3],
        },
      ],
    },
    {
      id: 2,
      title: "Account",
      children: [
        {
          id: 1,
          title: "Profile",
          path: "profile",
          icon: icons[4],
        },
        {
          id: 2,
          title: "Subscription",
          path: "subscription",
          icon: icons[5],
        },
        {
          id: 1,
          title: "Settings",
          path: "settings",
          icon: icons[6],
        },
        {
          id: 1,
          title: "Log out",
          path: "",
          icon: icons[7],
        },
      ],
    },
  ];
  const navRef = useRef<HTMLDivElement>(null);

  const handleCloseNav = (e: Event) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setMode(false);
    }
  };

  useLayoutEffect(() => {
    document.body.addEventListener("mousedown", handleCloseNav);
    return () => {
      document.body.removeEventListener("mousedown", handleCloseNav);
    };
  }, []);

  return {
    links,
    active,
    navRef,
    handleActive,
    sideMenu,
    viewMode,
    setMode,
  };
}
