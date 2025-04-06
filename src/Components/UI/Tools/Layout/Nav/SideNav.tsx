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
  mode: boolean;
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
      <div className="relative flex flex-col py-2   gap-2" key={title}>
        <h6 className="font-bold text-purple-800 ml-1 mb-2">{title}</h6>

        <div className="relative flex gap-7 flex-col">
          {children.map(({ title, path, icon }) => (
            <Link
              onClick={() => {
                setMode(!mode);
                title == "New invoice" && handleCreateDefaultInvoice();
              }}
              key={title}
              to={`/${path}`}
              className="text-purple-950 font-normal gap-2 flex justify-start items-center"
            >
              {icon} {title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
