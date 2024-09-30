import { ArrowRight } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useEffect, useState } from "react";
import Paginate from "../Layout/Paginate/Paginate";
import Body from "../../Interfaces/Pages/Dashboard/Invoices/List/Body";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import logo from "./../../../../assets/HatchfulExport-All(1) (2)/logo_transparent.png";
import {
  ArchiveDocument,
  Invoice,
  MoneyIncome,
  SendFast,
} from "react-huge-icons/bulk";
const AccountDetails = () => {
  const { draft, sent, revenue, paid } = useAppSelector(
    (state) => state.invoice
  );
  const [invoicesPerPage] = useState(1);

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
            <p className="text-green-900  px-2 text-xl max-sm:text-xl font-light">
              Overview
            </p>

            <div className="relative w-full grid gap-2 max-md:gap-5 mt-2  px-1 grid-cols-4 max-md:grid-cols-2 max-sm:gap-2   max-sm:grid-cols-2">
              <Card className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-fullitems-left w-full h-40 max-sm:h-auto gap-2 rounded-lg shadow-md  bg-gradient-to-br from-gray-50 to-white">
                <CardBody>
                  <CardTitle className="text-gray-400 flex justify-start items-center gap-2 text-xl font-bold">
                    <MoneyIncome className="text-4xl text-green-600 inline " />{" "}
                    <p> Revenue </p>
                  </CardTitle>
                  <CardText className=" text-green-600 text-4xl max-sm:text-xl font-light">
                    $ {revenue.toLocaleString()}
                  </CardText>
                </CardBody>
              </Card>
              <Card className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-40 max-sm:h-auto gap-2 rounded-lg shadow-md  bg-gradient-to-bl  from-gray-50 to-white">
                <CardBody>
                  <CardTitle className="text-gray-400 flex justify-start items-center gap-2 text-xl font-bold">
                    <Invoice className="text-4xl text-green-600 inline " />{" "}
                    <p className="max-sm:text-xl"> All invoices </p>
                  </CardTitle>
                  <CardText className=" text-green-600 text-4xl max-sm:text-xl font-light">
                    {" "}
                    {draft.length + sent.length + paid.length}
                  </CardText>
                </CardBody>
              </Card>
              <Card className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-40 max-sm:h-auto gap-2 rounded-lg shadow-md  bg-gradient-to-bl from-gray-50 to-white">
                <CardBody>
                  <CardTitle className="text-gray-400 flex justify-start items-center gap-2 text-xl font-bold">
                    <ArchiveDocument className="text-4xl text-green-600 inline " />{" "}
                    <p> Draft </p>
                  </CardTitle>
                  <CardText className=" text-green-600 text-4xl max-sm:text-xl font-light">  {" "}
                    {draft.length}
                  </CardText>
                </CardBody>
              </Card>

              <Card className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-40 max-sm:h-auto gap-2 rounded-lg shadow-md bg-gradient-to-bl from-gray-50 to-white">
                <CardBody>
                  <CardTitle className="text-gray-400 flex justify-start items-center gap-2 text-xl font-bold">
                    <SendFast className="text-4xl text-green-600 inline " />{" "}
                    <p> Outgoing</p>
                  </CardTitle>
                  <CardText className=" text-green-600 text-4xl max-sm:text-xl font-light">  {" "}
                    {sent.length}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="relative w-full flex items-center  gap-2 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-400 text-xl font-light ">
                Latest Invoice
              </p>{" "}
              <Link
                to={"/invoices"}
                className="text-gray-400 text-xl  font-light"
              >
                View Invoice
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-gray-400 text-xl w-full font-light">Drafts</p>
              <ArrowRight className="text-black text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full flex justify-end max-sm:justify-center  max-sm:flex-col-reverse  gap-4">
            <div className="relative max-sm:justify-center flex  w-full h-full">
              <img
                src={logo}
                alt="image-logo"
                className="w-52 h-52  max-sm:w-52 object-contain"
              />
            </div>
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
                </CardBody>
                <Paginate
                  invoices={draft}
                  postsPerPage={invoicesPerPage}
                  paginateHandler={handlePaginate}
                />
              </Card>
            )}

            {/* //invoice drfats */}
          </div>{" "}
          {/* //Latest invoiceF */}
          <div className="relative w-full max-sm:px-1 justify-between flex  items-center">
            <p className="text-gray-400 text-xl font-light ">
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
          <Body currentData={sent} />
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
