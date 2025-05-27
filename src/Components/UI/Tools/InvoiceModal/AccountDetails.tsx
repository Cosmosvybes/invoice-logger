import { ArrowRight } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useEffect, useState } from "react";
import Paginate from "../Layout/Paginate/Paginate";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const AccountDetails = () => {
  const { draft, sent, revenue, paid } = useAppSelector(
    (state) => state.invoice
  );
  const { balance, isConnected } = useAppSelector((store) => store.walletSlice);
  const [invoicesPerPage] = useState(4);

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
            <p className="text-slate-900 px-2 text-xl max-sm:text-sm font-light ">
              Overview
            </p>

            <div className="relative w-full grid gap-2 max-md:gap-5 mt-2  px-1 grid-cols-4 max-md:grid-cols-2 max-sm:gap-2   max-sm:grid-cols-2">
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-auto   gap-2   text-purple-900">
                  <CardTitle className="text-purple-800 text-xl font-bold">
                    Revenue
                  </CardTitle>
                  <CardText className="text-purple-800 text-4xl max-sm:text-sm font-semibold">
                    $ {revenue.toLocaleString()}
                  </CardText>
                  <p className="text-purple-800 mt-2 text-xl font-semibold max-sm:text-sm">
                    $ EBT {isConnected ? Number(balance) / 100 : 0}
                  </p>
                  {/* <CardText className="text-green-800 text-xl max-sm:text-sm font-light"></CardText> */}
                </CardBody>
              </Card>
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-auto gap-2   text-purple-900">
                  <CardTitle className="text-purple-900 text-xl font-bold">
                    Total invoices
                  </CardTitle>
                  <CardText className="text-purple-900 text-4xl max-sm:text-sm  font-light">
                    {draft.length + sent.length + paid.length}
                  </CardText>
                </CardBody>
              </Card>
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-auto  gap-2   text-purple-900">
                  <CardTitle className="text-purple-900 text-xl font-bold">
                    Draft
                  </CardTitle>
                  <CardText className="text-purple-900 text-4xl max-sm:text-sm font-light">
                    {draft.length}
                  </CardText>
                </CardBody>
              </Card>

              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full h-44 max-sm:h-auto  gap-2   text-purple-900">
                  <CardTitle className="text-purple-900 text-xl font-bold">
                    Outgoing invoices
                  </CardTitle>
                  <CardText className="text-purple-900 text-4xl max-sm:text-sm font-light">
                    {sent.length}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="relative w-full flex items-center  mt-4 gap-2 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-purple-900 text-xl font-normal">
                latest invoice
              </p>{" "}
              <Link
                to={"/invoices"}
                className="text-purple-900 text-xl   font-normal"
              >
                <p className="text-purple-900 text-xl  font-normal">
                  view invoice
                </p>
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-purple-900 text-xl w-full  font-normal">
                draft
              </p>
              <ArrowRight className="text-purple-900 text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full mt-4 p-1 h-[24rem] border-none flex  justify-end ">
            {draft?.length == 0 ? (
              <p className="text-gray-300 text-4xl px-2  ">No invoice yet!</p>
            ) : (
              <Card className="relative  rounded-lg  flex h-[20rem] p-2 overflow-y-scroll bg-gradient-to-br bg-gray-100  items-center py-2   w-1/2 max-md:w-full max-sm:w-full">
                <div className="relative w-full gap-1 rounded-lg  flex flex-col-reverse ">
                  {currentInvoices.reverse().map((invoice: any) => (
                    <div
                      className="relative border-b border-gray-500 gap-2  max-sm:p-0 bg-gray-200"
                      key={invoice.id}
                    >
                      <InvoiceTemplate invoice={invoice} />
                    </div>
                  ))}
                </div>

                <div className="relative  px-0 ">
                  <Paginate
                    invoices={draft}
                    postsPerPage={invoicesPerPage}
                    paginateHandler={handlePaginate}
                  />
                </div>
              </Card>
            )}

            {/* //invoice drfats */}
          </div>{" "}
          {/* //Latest invoiceF */}
          <div className="relative w-full max-sm:px-1 justify-between flex  items-center">
            <p className="text-gray-600 text-sm font-light ">
              {" "}
              recent invoices
            </p>{" "}
            <Link
              to={"/invoices"}
              className="text-gray-600 text-sm  font-normal"
            >
              view all <ArrowRight className="text-black text-4xl inline" />
            </Link>{" "}
          </div>
          {/* <Body currentData={currentInvoices} /> */}
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
