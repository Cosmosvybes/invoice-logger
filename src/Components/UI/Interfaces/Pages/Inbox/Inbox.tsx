import withAuth from "../../../Tools/_helper/Auth/withAuth";
import InvoicePiece from "../../../Tools/_helper/Inbox/InvoicePiece";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Paginate from "../../../Tools/Layout/Paginate/Paginate";
import Empty from "../Dashboard/Invoices/Empty";
import user from "./../../../../../assets/User.svg";
import useInvoiceReceivedController from "./controller";
const Inbox = () => {
  const { inbox, setCurrentPage, currentList, postPerPage } =
    useInvoiceReceivedController();

  return (
    <>
      <div className="relative px-28 max-sm:px-2">
        <BreadCrumb title="Invoice received" linkTitle="" useLink={false} />
        <div className="relative flex  max-sm:flex-col mt-5 justify-between h-auto">
          {inbox.length < 1 ? (
            <Empty message="Fold is currently empty!" />
          ) : (
            <div className="relative w-1/2  max-sm:w-full max-sm:px-0 flex gap-1 justify-start flex-col">
              {currentList.map((_, i) => (
                <InvoicePiece key={i} invoiceInformation={_} />
              ))}
              <Paginate
                invoices={inbox}
                paginateHandler={setCurrentPage}
                postsPerPage={postPerPage}
              />
            </div>
          )}

          <div className="relative w-1/3  max-sm:w-full h-auto flex px-3  py-2 max-sm:py-0 max-sm px-3:flex-col">
            {" "}
            <div className="relative w-full h-auto  px-10 py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full h-full object-contain max-md:w-full max-md:h-auto"
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Inbox);
