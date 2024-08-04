import { useState } from "react";
import Btn from "./Button";
import {
  Setting,
  Receipt,
  UserCircle,
  File,
  MoneyDollar,
  UsersTriple,
} from "react-huge-icons/outline";

const Menu = () => {
  const [menuList] = useState([
    {
      text: "New Invoice",
      icon: <Receipt className="text-5xl text-black" />,
      path: "/",
    },
    {
      text: "Revenue",
      icon: <MoneyDollar className="text-5xl text-black" />,
      path: "dashboard",
    },
    {
      text: "Clients",
      icon: <UsersTriple className="text-5xl text-black" />,
      path: "dashboard",
    },

    {
      text: "All Invoice",
      icon: <File className="text-5xl text-black" />,
      //path: () => setModalSwitch(!modal),
    },
    {
      text: "Profile",
      icon: (
        <UserCircle className="text-5xl  text-black transition duration-700" />
      ),
      path: () => "",
    },
    {
      text: "Settings",
      icon: (
        <Setting className="text-5xl  text-black transition duration-700" />
      ),
      path: () => "",
    },
  ]);

  return (
    <>
      <div className="relative px-5  grid grid-cols-3 max-sm:grid-cols-2 gap-4 max-sm:py-14  max-sm:px-0">
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
