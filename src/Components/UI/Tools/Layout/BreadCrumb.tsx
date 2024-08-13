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
  const handleNewInvoice = () => {
    localStorage.setItem("id", String(Date.now()));

    dispatch(
      createInvoice({
        ...staticForm,
        itemList: [],
        TOTAL: 0,
        VAT: "",
        Discount: "",
      })
    );
  };

  return (
    <div className="relative w-full mt-3 h-20 flex justify-between items-center px-3">
      <h1 className="text-slate-950 text-2xl  max-sm:text-xl font-extrabold">
        {title}
      </h1>

      {useLink && (
        <Link
          to={`/${linkTitle}`}
          onClick={() => handleNewInvoice()}
          className="bg-black h-16 max-sm:h-12 max-sm:text-sm font-normal flex justify-center items-center rounded-md text-gray-50 w-52 max-sm:w-32"
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
