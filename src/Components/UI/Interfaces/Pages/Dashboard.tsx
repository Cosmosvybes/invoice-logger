import { useState } from "react";
import InvoiceModal from "../../Tools/InvoiceModal/InvoiceModal";
import Link from "../../Tools/Layout/Link";
import { User } from "react-huge-icons/outline";

const Dashboard = () => {
  const [links] = useState([
    {
      id: 1,
      to: "New Invoice",
      action: () => setCurrentView("invoice"),
    },
    {
      id: 3,
      to: "My Revenue",
      action: () => setCurrentView("revenue"),
    },
  ]);
  const [views] = useState([
    { id: 1, name: "invoice", element: <InvoiceModal /> },
    {
      id: 2,
      name: "revenue",
      //   element: <InvoiceModal />,
    },
  ]);
  const [currentView, setCurrentView] = useState("invoice");
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
      <div className="relative flex">
        <div className="relative w-1/3  max-sm:hidden h-screen  flex flex-col">
          <div className="relative h-20 gap-1 flex justify-start px-4 items-center text-center">
            <User className="text-black mt-1 text-5xl inline" />
            <p className="text-black font-light text-3xl">
              Welcome back, Ayomide
            </p>
          </div>
          {links.map((link) => (
            <span key={link.id}>
              <Link to={link.to} action={link.action} />
            </span>
          ))}
        </div>

        <div className="relative overflow-y-scroll w-full overflow-x-hidden h-screen border">
          <div className="relative ">{VIEWS_}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
