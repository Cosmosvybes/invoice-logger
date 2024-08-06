import { PlusThin } from "react-huge-icons/outline";
import { Link } from "react-router-dom";

const BreadCrumb = ({
  useLink,
  title,
}: {
  title: string;
  useLink: boolean;
}) => {
  return (
    <div className="relative w-full mt-5 h-28 flex justify-between items-center px-3">
      <h1 className="text-black text-2xl  max-sm:text-xl font-extrabold">
        {title}
      </h1>

      {useLink && (
        <Link
          to={"/invoice"}
          // onClick={() => setIsCreatingNewInvoice(!isCreatingNewInvoice)}
          className="bg-black h-16 max-sm:h-12 max-sm:text-sm font-normal flex justify-center items-center rounded-md text-gray-50 w-52 max-sm:w-32"
        >
          <p className="flex items-center justify-center">
            {" "}
            <PlusThin className="inline text-2xl" /> new invoice{" "}
          </p>
        </Link>
      )}
    </div>
  );
};

export default BreadCrumb;
