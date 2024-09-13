import { useState } from "react";
import NavBtn from "./NavBtn";

const InvoiceNav = ({ switchTab }: { switchTab(arg: string): void }) => {
  const [buttonData] = useState([
    { id: 1, text: "Sent" },
    { id: 2, text: "Draft" },
    { id: 3, text: "Paid" },
    { id: 4, text: "Overdue" },
  ]);
  const [active, setActive] = useState(buttonData[0].id);
  return (
    <>
      <div className="relative w-full border-b border-black  h-auto max-sm:h-auto flex  gap-10 max-sm:gap-14 justify-evenly items-center ">
        {buttonData.map((nav) => (
          <div className="relative mt-10" key={nav.id}>
            <NavBtn
              node={nav.text}
              id={nav.id}
              active={active}
              func={() => {
                switchTab(nav.text);
                setActive(nav.id);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceNav;
