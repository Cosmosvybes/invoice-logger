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
    <div className="w-full flex items-center justify-start gap-1 p-1 mb-8 bg-slate-200/50 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar">
      {buttonData.map((nav) => (
        <NavBtn
          key={nav.id}
          node={nav.text}
          id={nav.id}
          active={active}
          func={() => {
            switchTab(nav.text);
            setActive(nav.id);
          }}
        />
      ))}
    </div>
  );
};

export default InvoiceNav;
