import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../States/hoooks/hook";
import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";
import { useLocation } from "react-router-dom";

export default function useLayoutController(icons: any) {
  const { account } = useAppSelector((state) => state.userSlice);
  const { pathname } = useLocation();

  const userMenu = [
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
          title: "Invoice inbox",
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
      id: 24,
      title: "Account",
      children: [
        {
          id: 16,
          title: "Profile",
          path: "profile",
          icon: icons[11],
          onclick: "",
        },

        {
          id: 3,
          title: "Settings",
          path: "account/settings",
          icon: icons[6],
          onclick: "",
        },
        {
          id: 90,
          title: "Customer Support",
          path: "support",
          icon: icons[14], // InformationRectangle
          onclick: "",
        },
      ],
    },
  ];

  const adminMenu = [
    {
        id: 100,
        title: "Admin OS",
        children: [
            {
                id: 101,
                title: "Control Center",
                path: "admin",
                icon: icons[36] || icons[8], // Using Dashboard icon
                onclick: "",
            },
            {
                id: 102,
                title: "User Management",
                path: "admin/users",
                icon: icons[31] || icons[2], // User icon
                onclick: "",
            }
        ]
    },
    {
        id: 200,
        title: "Platform",
        children: [
            {
                id: 201,
                title: "Back to App",
                path: "dashboard",
                icon: icons[40] || icons[4], // Return icon
                onclick: "",
            }
        ]
    }
  ];

  const isAdmin = account?.isAdmin || account?.Role === 'admin' || account?.role === 'admin' || account?.Email === 'admin@invoicelogger.com';
  // console.log("Current User Role Check:", { email: account?.email, isAdmin, account });

  if (isAdmin && !pathname.startsWith("/admin")) {
    userMenu.push({
      id: 99,
      title: "Administration",
      children: [
        {
          id: 1,
          title: "Switch to Admin",
          path: "admin",
          icon: icons[4], // ChartHistogram
          onclick: "",
        },
      ],
    });
  }

  const sideMenu = pathname.startsWith("/admin") ? adminMenu : userMenu;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        dispatch(getUser(token));
    }
  }, [dispatch]);

  const [viewMode, setMode] = useState(false);
  return {
    sideMenu,
    viewMode,
    setMode,
  };
}
