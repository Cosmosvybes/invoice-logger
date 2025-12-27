import { AddRectangle } from "react-huge-icons/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../States/hoooks/hook";
import { createNewInvoice } from "../../../../States/Slices/invoice";

const BreadCrumb = ({
  useLink,
  title,
  linkTitle,
  onClick,
}: {
  title: string;
  useLink: boolean;
  linkTitle: string;
  onClick?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //new invoice
  const handleNewInvoice = async () => {
    dispatch(createNewInvoice());
  };

  return (
    <div className="relative w-full h-20 py-1 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate(-1)}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all border border-slate-200 shadow-sm font-bold text-sm"
            title="Go Back"
        >
            Back
        </button>
        <h1 className="text-slate-800 text-3xl max-sm:text-xl font-extrabold tracking-tight">
            {title}
        </h1>
      </div>

      {useLink && (
        <Link
          to={`/${linkTitle}`}
          onClick={() => {
            onClick && onClick();
            linkTitle == "new/invoice" && handleNewInvoice();
          }}
          className="rounded-xl gap-2 flex justify-between items-center py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white h-auto transition-all shadow-md hover:shadow-lg transform active:scale-95"
        >
          <p className="flex items-center justify-center text-sm font-bold tracking-wide">
            <AddRectangle className="inline text-xl mr-1" /> New{" "}
            {linkTitle == "client/new" ? "Client" : "Invoice"}
          </p>
        </Link>
      )}
    </div>
  );
};

export default BreadCrumb;
