import { useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { logOut } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useNavigate } from "react-router-dom";

export default function useNavMenu(icons: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [links] = useState([
    { id: 1, path: "dashboard", name: "Home" },
    { id: 2, path: "invoices", name: "Invoices" },
    { id: 3, path: "Clients", name: "Clients" },
  ]);
  const handleActive = (id: number) => {
    setActive(id);
  };
  const [active, setActive] = useState(links[0].id);
  const [viewMode, setMode] = useState(false);

  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const sideMenu = [
    {
      id: 1,
      title: "Creator",
      children: [
        {
          id: 18,
          title: "Dashboard",
          path: "dashboard",
          icon: icons[8],
          onclick: "",
        },
        {
          id: 13,
          title: "Invoices",
          path: "invoices",
          icon: icons[0],
          onclick: "",
        },
        {
          id: 2,
          title: "New invoice",
          path: "new/invoice",
          icon: icons[1],
          onclick: "",
        },
        {
          id: 3,
          title: "Inbox",
          path: "account/invoice-received",
          icon: icons[9],
          onclick: "",
        },
        {
          id: 19,
          title: "Clients",
          path: "clients",
          icon: icons[2],
          onclick: "",
        },
        {
          id: 190,
          title: "Add Client",
          path: "client/new",
          icon: icons[3],
          onclick: "",
        },
      ],
    },
    {
      id: 2,
      title: "Account",
      children: [
        {
          id: 16,
          title: "Profile",
          path: "profile",
          icon: icons[4],
          onclick: "",
        },
        {
          id: 2,
          title: "Finance",
          path: "account/finance/overview",
          icon: icons[5],
          onclick: "",
        },
        {
          id: 3,
          title: "Settings",
          path: "account/settings",
          icon: icons[6],
          onclick: "",
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
    handleSignOut,
  };
}
