import { useEffect, useState } from "react";
import NavBtn from "./NavBtn";

const InvoiceNav = ({ switchTab }: { switchTab(arg: string): void }) => {
  const [buttonData] = useState([
    { id: 1, text: "sent" },
    { id: 2, text: "draft" },
    { id: 3, text: "paid" },
    { id: 4, text: "overdue" },
  ]);
  const [active, setActive] = useState(buttonData[0].id);

  useEffect(() => {
    switchTab("sent");
  }, []);
  return (
    <>
      <div className="relative w-full max-sm:w-auto  border-b border-gray-300  h-auto max-sm:h-auto px-3   gap-5  max-sm:px-7 max-sm:gap-14 justify-start flex">
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
