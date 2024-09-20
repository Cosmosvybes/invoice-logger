import { ArrowRight } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useEffect, useState } from "react";
import Paginate from "../Layout/Paginate/Paginate";
import InvoiceTable from "./InvoiceTable";
import Body from "../../Interfaces/Pages/Dashboard/Invoices/List/Body";
import { Card, CardBody } from "reactstrap";

const AccountDetails = () => {
  const { draft, sent, revenue } = useAppSelector((state) => state.invoice);
  const [invoicesPerPage] = useState(2);

  const [currrentPage, setCurrentPage] = useState(1);
  let indexOfLastInvoice = currrentPage * invoicesPerPage;
  let indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = draft?.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (typeof draft == undefined) {
      location.replace("/");
    }
  }, []);

  return (
    <>
      <div className="relative h-auto  w-full   flex-col  transition  max-sm:py-2 max-sm:h-auto  flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-auto  w-full  max-sm:w-full rounded-3xl   flex flex-col  gap-1 px-1  font-bold">
          <div className="w-full  block relative">
            <p className="text-slate-900 px-2 text-xl max-sm:text-xl font-light ">
              Overview
            </p>

            <div className="relative w-full grid gap-2 max-md:gap-5 mt-2  px-1 grid-cols-4 max-md:grid-cols-2 max-sm:gap-2   max-sm:grid-cols-2">
              <Card>
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-32 gap-2 rounded-lg shadow-md border-gray-400">
                  <p className="text-slate-950 text-xl font-bold">
                    Total invoices
                  </p>
                  <h1 className="text-black text-4xl max-sm:text-3xl font-extrabold">
                    {draft.length + sent.length}
                  </h1>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-32 gap-2 rounded-lg shadow-md border-gray-400">
                  <p className="text-slate-950 text-xl font-bold">Draft</p>
                  <h1 className="text-black text-4xl max-sm:text-3xl font-extrabold">
                    {draft.length}
                  </h1>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-32 gap-2 rounded-lg shadow-md border-gray-400">
                  <p className="text-slate-950 text-xl font-bold">
                    Sent invoices
                  </p>
                  <h1 className="text-black text-4xl max-sm:text-3xl font-extrabold">
                    {sent.length}
                  </h1>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-32 gap-2 rounded-lg shadow-md border-gray-400">
                  <p className="text-slate-950 text-xl font-bold">Revenue</p>
                  <h1 className="text-black text-4xl max-sm:text-3xl font-extrabold">
                    ${revenue}
                  </h1>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="relative w-full flex items-center  gap-2 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-600 text-xl font-light ">
                Latest Invoice
              </p>{" "}
              <Link
                to={"/invoices"}
                className="text-gray-600 text-xl  font-light"
              >
                View Invoice
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-600 text-xl w-full font-light">Drafts</p>
              <ArrowRight className="text-black text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full flex justify-end ">
            {draft?.length == 0 ? (
              <p className="text-gray-300 text-4xl px-2  ">No invoice yet!</p>
            ) : (
              <Card className="relative shadow-md flex flex-col  border border-gray-400 py-2 rounded-lg w-1/3 max-md:w-full max-sm:w-full">
                <CardBody>
                  <div className="relative w-full gap-1 h-auto py-2 flex flex-col-reverse ">
                    {currentInvoices.reverse().map((invoice: any) => (
                      <div className="relative" key={invoice.id}>
                        <InvoiceTemplate invoice={invoice} />
                      </div>
                    ))}
                  </div>
                  <Paginate
                    invoices={draft}
                    postsPerPage={invoicesPerPage}
                    paginateHandler={handlePaginate}
                  />
                </CardBody>
              </Card>
            )}

            {/* //invoice drfats */}
          </div>{" "}
          {/* //Latest invoiceF */}
          <div className="relative w-full max-sm:px-1 justify-between flex  items-center">
            <p className="text-gray-600 text-xl font-light ">
              {" "}
              Recent Invoices
            </p>{" "}
            <Link
              to={"/invoices"}
              className="text-gray-600 text-xl  font-light"
            >
              View All <ArrowRight className="text-black text-4xl inline" />
            </Link>{" "}
          </div>
          <InvoiceTable />
          <Body currentData={sent} />
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
