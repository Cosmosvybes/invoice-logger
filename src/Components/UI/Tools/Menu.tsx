import { useState } from "react";
import Btn from "./Button";
import { ArchiveDocument } from "react-huge-icons/outline";

const Menu = () => {
  const [menuList] = useState([
    {
      text: "All Invoices",
      icon: "2",
      path: "/",
    },
    {
      text: "Account",
      icon: <ArchiveDocument className="text-3xl mt-1 text-black" />,
      path: "dashboard",
    },
    {
      text: "Revenue",
      icon: "$0.00",
      path: "dashboard",
    },
  ]);

  return (
    <>
      <div className="relative  max-sm:w-full px-5  grid grid-cols-3 max-sm:grid-cols-1 gap-4 max-sm:py-14  max-sm:px-2">
        {menuList.map(({ text, icon, path }, i) => (
          <div className="relative" key={i}>
            <Btn path={path} text={text} icon={icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
