import { useState } from "react";
import Btn from "./Button";
import {
  Setting,
  Receipt,
  LockDash,
  UserCircle,
} from "react-huge-icons/outline";

interface MenuInterface {
  modal: boolean;
  setModalSwitch(e: boolean): void;
}

const Menu = ({ modal, setModalSwitch }: MenuInterface) => {
  const [menuList] = useState([
    {
      text: "Make Invoice",
      icon: <Receipt className="text-5xl text-sky-600" />,
      func: () => setModalSwitch(!modal),
    },
    {
      text: "Verify Invoice",
      icon: (
        <LockDash className="text-5xl  text-sky-600 transition duration-700" />
      ),
      func: () => "",
    },
    {
      text: "Profile",
      icon: (
        <UserCircle className="text-5xl  text-sky-600 transition duration-700" />
      ),
      func: () => "",
    },
    {
      text: "Settings",
      icon: (
        <Setting className="text-5xl  text-sky-600 transition duration-700" />
      ),
      func: () => "",
    },
  ]);

  return (
    <>
      <div className="relative px-5  grid grid-cols-2 max-sm:grid-cols-2 gap-2 max-sm:py-14  max-sm:px-0">
        {menuList.map((menu) => (
          <Btn text={menu.text} icon={menu.icon} callback={menu.func} />
        ))}
      </div>
    </>
  );
};

export default Menu;
