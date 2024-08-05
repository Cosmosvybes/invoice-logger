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
// import Link_ from "../../../Tools/Layout/Link";
// import {
//   Data,
//   Item,
// } from "../../../Tools/_helper/Formbuilder/invoiceTemplate.types";
import Account from "../../../Tools/InvoiceModal/Account";
//
const Dashboard = () => {
  const { currentView } = useDashboardController(icons);

  //set dashboard  views
  const [views] = useState([
    { id: 1, name: "invoice", element: <Account /> },
    {
      id: 2,
      name: "revenue",
      //   element: <InvoiceModal />,
    },
  ]);

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
      <div className="relative flex ">
        {/* <div className="relative w-1/3 bg-gray-300  max-sm:hidden h-screen  flex flex-col">
          <div className="relative h-28 gap-1 flex justify-start px-9 items-center text-center">
            <UserCircle className="text-black mt-1 text-5xl inline" />
            <p className="text-black font-light text-3xl">
              Welcome back, Ayomide
            </p>
          </div>
          {links.map((link) => (
            <span key={link.id}>
              <Link_ to={link.to} action={link.action} icon={link.icon} />
            </span>
          ))}
        </div> */}

        <div className="relative  w-full overflow-x-hidden h-screen px-44 max-sm:px-0 border">
          <div className="relative ">{VIEWS_}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
