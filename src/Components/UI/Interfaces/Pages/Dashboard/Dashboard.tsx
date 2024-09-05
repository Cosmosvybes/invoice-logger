import { useState } from "react";
import {
  CardCheck,
  Invoice,
  Logout,
  MoneyBagDollar,
  Setting,
  UserCircle,
  UsersTriple,
} from "react-huge-icons/outline";

const icons = [
  <Invoice className="text-black text-4xl   inline" />,
  <MoneyBagDollar className="text-black text-4xl   inline" />,
  <UsersTriple className="text-black text-4xl   inline" />,
  <UserCircle className="text-black text-4xl   inline" />,
  <CardCheck className="text-black text-4xl   inline" />,
  <Setting className="text-black text-4xl   inline" />,
  <Logout className="text-black text-4xl   inline" />,
];

import useDashboardController from ".";
import Account from "../../../Tools/InvoiceModal/Account";
//
const Dashboard = () => {
  const { currentView } = useDashboardController(icons);

  //set dashboard  views
  const [views] = useState([{ id: 1, name: "invoice", element: <Account /> }]);

  const VIEWS_ = views.map((view: any) => {
    switch (currentView) {
      case "invoice":
        return (
          <div className="relative" key={view.id}>
            {view.element}
          </div>
        );
      default:
        break;
    }
  });
  return (
    <>
      <div className="relative  w-full  h-auto px-28 max-sm:px-0  max-sm:w-full max-md:w-full">
        <div className="relative ">{VIEWS_}</div>
      </div>
    </>
  );
};

export default Dashboard;
