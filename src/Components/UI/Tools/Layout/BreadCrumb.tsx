import { PlusThin } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
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
    <div className="relative w-full mt-2  h-20 py-1 flex justify-between items-center px-2">
      <h1 className="text-purple-800 text-xl  max-sm:text-xl font-extrabold">
        {title}
      </h1>

      {useLink && (
        <Link
          to={`/${linkTitle}`}
          onClick={() => linkTitle == "new/invoice" && handleNewInvoice()}
          className=" rounded-lg gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[10px]"
        >
          <p className="flex items-center justify-center text-xl max-sm:sm text-white font-light">
            <PlusThin className="inline text-2xl" /> new{" "}
            {linkTitle == "client/new" ? "client" : "invoice"}
          </p>
        </Link>
      )}
    </div>
  );
};

export default BreadCrumb;
