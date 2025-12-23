import withAuth from "../../../Tools/_helper/Auth/withAuth";
import InvoicePiece from "../../../Tools/_helper/Inbox/InvoicePiece";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Paginate from "../../../Tools/Layout/Paginate/Paginate";
import Empty from "../Dashboard/Invoices/Empty";

import useInvoiceReceivedController from "./controller";
const Inbox = () => {
  const { inbox, setCurrentPage, currentList, postPerPage } =
    useInvoiceReceivedController();

  return (
    <>
      <div className="w-full h-full min-h-screen px-4 md:px-12 py-6">
        <BreadCrumb title="Received Invoices" linkTitle="" useLink={false} />
        
        <div className="relative mt-6 max-w-5xl mx-auto">
          {inbox.length < 1 ? (
            <Empty message="Inbox is currently empty" />
          ) : (
            <div className="flex flex-col gap-4">
              {currentList.map((_, i) => (
                <InvoicePiece key={i} invoiceInformation={_} />
              ))}
              
              <div className="mt-8">
                 <Paginate
                    invoices={inbox}
                    paginateHandler={setCurrentPage}
                    postsPerPage={postPerPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(Inbox);
