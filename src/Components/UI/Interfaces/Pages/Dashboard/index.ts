import { useState } from "react";
export default function useDashboardController(icon: any[]) {
  const [currentView, setCurrentView] = useState("invoice");
  const [links] = useState([
    {
      id: 1,
      to: "Invoice",
      icon: icon[0],
      action: () => setCurrentView("invoice"),
    },
    {
      id: 6,
      to: "Revenue",
      icon: icon[1],
      // action: () => setCurrentView("revenue"),
    },
    {
      id: 9,
      to: "Clients",
      icon: icon[2],
      // action: () => setCurrentView("revenue"),
    },
    {
      id: 3,
      to: "Profile",
      icon: icon[3],
      // action: () => setCurrentView("revenue"),
    },
    {
      id: 76,
      to: "Subscription",
      icon: icon[4],
      // action: () => setCurrentView("revenue"),
    },
    {
      id: 3,
      to: "Settings",
      icon: icon[5],
      // action: () => setCurrentView("revenue"),
    },
    {
      id: 3,
      to: "Logout",
      icon: icon[6],
      // action: () => setCurrentView("revenue"),
    },
  ]);
  return {
    currentView,
    links,
  };
}
