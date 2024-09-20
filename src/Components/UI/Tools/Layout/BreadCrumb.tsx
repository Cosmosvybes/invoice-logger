import { PlusThin } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../States/hoooks/hook";
import { createInvoice } from "../../../../States/Slices/invoice";

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
  };

  return (
    <div className="relative w-full mt-2  h-auto py-1 flex justify-between items-center px-3">
      <h1 className="text-slate-950 text-2xl  max-sm:text-xl font-extrabold">
        {title}
      </h1>

      {useLink && (
        <Link
          to={`/${linkTitle}`}
          onClick={() => linkTitle == "new/invoice" && handleNewInvoice()}
          className="bg-black mt-1 h-16 max-sm:h-12 max-sm:text-sm font-normal flex justify-center items-center rounded-sm text-gray-50 w-52 max-sm:w-32"
        >
          <p className="flex items-center justify-center text-white font-normal">
            <PlusThin className="inline text-2xl" /> new{" "}
            {linkTitle == "client/new" ? "client" : "invoice"}
          </p>
        </Link>
      )}
    </div>
  );
};

export default BreadCrumb;
