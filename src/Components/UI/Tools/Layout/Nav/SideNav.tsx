import { Link } from "react-router-dom";
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

  const handleCreateDefaultInvoice = () => {
    localStorage.setItem("id", String(Date.now()));
    const token = localStorage.getItem("token");
    localStorage.setItem("id", String(Date.now()));
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
          return location.replace("/");
        }
        return result.json();
      })
      .then((_) => {
        toast.success("New Invoice created", { theme: "light" });
      })
      .catch((err) => {
        if (err.response && err.status == 401) {
          return location.replace("/");
        }
      });
  };

  return (
    <>
      <div className="relative flex flex-col py-2 gap-1 px-4" key={title}>
        <h6 className="font-bold text-xs text-slate-500 ml-2 mb-2 uppercase tracking-widest">{title}</h6>

        <div className="relative flex gap-1 flex-col">
          {children.map(({ title, path, icon }) => (
            <Link
              onClick={() => {
                setMode!(!mode);
                title == "New invoice" && handleCreateDefaultInvoice();
              }}
              key={title}
              to={`/${path}`}
              className="text-slate-600 text-sm font-bold gap-3 flex justify-start items-center hover:text-violet-700 hover:bg-violet-50 px-3 py-2 rounded-lg transition-all duration-200 group"
            >
              <span className="text-lg text-slate-400 group-hover:text-violet-500 transition-colors">{icon}</span> 
              {title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
