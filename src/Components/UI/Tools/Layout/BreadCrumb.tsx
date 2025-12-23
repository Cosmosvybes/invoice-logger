import { PlusThin, ArrowLeft } from "react-huge-icons/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../States/hoooks/hook";
import { createInvoice } from "../../../../States/Slices/invoice";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/Index";

const BreadCrumb = ({
  useLink,
  title,
  linkTitle,
}: {
  title: string;
  useLink: boolean;
  linkTitle: string;
}) => {
  const { staticForm } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //new invoice
  const handleNewInvoice = async () => {
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
      })
    );
    // https://ether-bill-server-1.onrender.com

    fetch(`${API_URL}/api/new/invoice`, {
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
    <div className="relative w-full h-20 py-1 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all border border-slate-200 shadow-sm"
            title="Go Back"
        >
            <ArrowLeft className="text-xl" />
        </button>
        <h1 className="text-slate-800 text-3xl max-sm:text-xl font-extrabold tracking-tight">
            {title}
        </h1>
      </div>

      {useLink && (
        <Link
          to={`/${linkTitle}`}
          onClick={() => linkTitle == "new/invoice" && handleNewInvoice()}
          className="rounded-xl gap-2 flex justify-between items-center py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white h-auto transition-all shadow-md hover:shadow-lg transform active:scale-95"
        >
          <p className="flex items-center justify-center text-sm font-bold tracking-wide">
            <PlusThin className="inline text-xl mr-1" /> New{" "}
            {linkTitle == "client/new" ? "Client" : "Invoice"}
          </p>
        </Link>
      )}
    </div>
  );
};

export default BreadCrumb;
