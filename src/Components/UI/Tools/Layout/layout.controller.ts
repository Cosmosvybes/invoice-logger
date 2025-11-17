import { useEffect, useLayoutEffect, useState } from "react";
// import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch, useAppSelector } from "../../../../States/hoooks/hook";
import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";
// import { getUser as userState } from "../../../../States/Slices/invoice";

export default function useLayoutController(icons: any) {
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);
  const sideMenu = [
    // {
    //   id: 2,
    //   title: "Finance",
    //   children: [
    //     {
    //       id: 18,
    //       title: "Dashboard",
    //       path: "dashboard",
    //       icon: icons[8],
    //       onclick: "",
    //     },
    //     {
    //       id: 16,
    //       title: "Business deals",
    //       path: "account/business/trust-trade",
    //       icon: icons[12],
    //       onclick: "",
    //     },
    //     {
    //       id: 164,
    //       title: "Transactions",
    //       path: "account/finance/overview",
    //       icon: icons[4],
    //       onclick: "",
    //     },
    //     {
    //       id: 2,
    //       title: "Escrow",
    //       path: "finance/escrows",
    //       icon: icons[13],
    //       onclick: "",
    //     },
    //     {
    //       id: 3,
    //       title: "My Listings",
    //       path: "finance/user/listings",
    //       icon: icons[15],
    //       onclick: "",
    //     },
    //     {
    //       id: 93,
    //       title: "Disputes",
    //       path: "finance/deal/disputes",
    //       icon: icons[14],
    //       onclick: "",
    //     },
    //   ],
    // },
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
      ],
    },
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  // useLayoutEffect(() => {
  //   dispatch(userState(localStorage.getItem("token")!));
  // }, [isAuthenticated]);
  const [viewMode, setMode] = useState(false);
  return {
    sideMenu,
    viewMode,
    setMode,
  };
}
