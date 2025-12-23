import { useEffect, useState } from "react";
import NavBtn from "./NavBtn";

const InvoiceNav = ({ switchTab }: { switchTab(arg: string): void }) => {
  const [buttonData] = useState([
    { id: 2, text: "draft" },
    { id: 1, text: "sent" },
    { id: 3, text: "paid" },
    { id: 4, text: "overdue" },
  ]);
  const [active, setActive] = useState(buttonData[0].id);

  useEffect(() => {
    switchTab("draft");
  }, []);
  return (
    <>
      <div className="relative w-full flex items-center justify-start gap-4 p-4 mb-6 border-b border-white/10 overflow-x-auto">
        {buttonData.map((nav) => (
          <div className="relative" key={nav.id}>
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
