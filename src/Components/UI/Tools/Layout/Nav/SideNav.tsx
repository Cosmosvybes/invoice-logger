import { Link, useLocation } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../States/hoooks/hook";
import { createInvoice } from "../../../../../States/Slices/invoice";
import { toast } from "react-toastify";

interface Main {
  title: string;
  children: {
    title: string;
    id: number;
    path: string;
    icon: any;
    onclick?: any;
  }[];
  setMode: (e: boolean) => void;
  mode?: boolean;
}

const SideNav = ({ title, children, setMode, mode }: Main) => {
  const { staticForm } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleCreateDefaultInvoice = () => {
    localStorage.setItem("id", String(Date.now()));
    const token = localStorage.getItem("token");
    dispatch(
      createInvoice({
        ...staticForm,
        itemList: [],
        id: localStorage.getItem("id"),
        TOTAL: 0,
        VAT: "",
        Discount: "",
        currency: "USD",
        status: "Draft",
        token,
        createdAt: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          dayPeriod: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    );

    fetch("https://ether-bill-server-1.onrender.com/api/new/invoice", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...staticForm,
        itemList: [],
        id: localStorage.getItem("id"),
        TOTAL: 0,
        VAT: "",
        Discount: "",
        currency: "",
        status: "Draft",
        token,
        createdAt: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          dayPeriod: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }),
    })
      .then((result) => {
        if (result.status == 403) {
          return window.location.replace("/");
        }
        return result.json();
      })
      .then((_) => {
        toast.success("New Invoice created", { theme: "light" });
      })
      .catch((err) => {
        if (err.response && err.status == 401) {
          return window.location.replace("/");
        }
      });
  };

  return (
    <div className="flex flex-col gap-1 py-4" key={title}>
      <h6 className="px-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h6>

      <div className="flex flex-col gap-1 px-3">
        {children.map(({ title: linkTitle, path, icon }) => {
          const isActive = location.pathname === `/${path}`;
          return (
            <Link
              onClick={() => {
                setMode!(!mode);
                linkTitle == "New invoice" && handleCreateDefaultInvoice();
              }}
              key={linkTitle}
              to={`/${path}`}
              className={`group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-200" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                isActive ? "text-white" : "text-slate-400 group-hover:text-violet-600"
              }`}>
                {icon}
              </span>
              <span className={`text-sm font-black tracking-tight ${isActive ? "text-white" : "text-slate-600"}`}>
                {linkTitle}
              </span>
              
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full animate-full-height"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
