import { ArrowRight } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
const AccountDetails = () => {
  const { draft, sent, revenue, paid } = useAppSelector(
    (state) => state.invoice
  );
  // const { balance, isConnected } = useAppSelector((store) => store.walletSlice);
  const [invoicesPerPage] = useState(2);

  const [currrentPage] = useState(1);
  let indexOfLastInvoice = currrentPage * invoicesPerPage;
  let indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = draft?.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // const handlePaginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };
  // useEffect(() => {
  //   if (typeof draft == undefined) {
  //     location.replace("/");
  //   }
  // }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Paid",
        data: [29, 59, 80, 96, 207, 100, 400, 500, 300, 900, 1000, 1200],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3, // smooth curves
      },
      {
        label: "Draft",
        data: [10, 30, 40, 90, 204, 100, 400, 500, 300, 400, 1000, 2300],
        borderColor: "rgba(89, 6, 232, 1)",
        backgroundColor: "rgba(13, 17, 42, 0.2)",
        tension: 0.3, // smooth curves
      },
    ],
  };

  const LineChart = () => {
    return (
      <>
        <Line
          height={180}
          data={data}
          options={{
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Invoicing Metrics" },
            },
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="relative overflow-y-scroll  w-full   flex-col  transition  max-sm:py-2 max-sm:h-auto  flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-auto  w-full  max-sm:w-full rounded-3xl   flex flex-col  gap-1 px-1  font-bold">
          <div className="w-full  block relative">
            <p className="text-slate-900 px-2 text-xl max-sm:text-sm font-light ">
              Overview
            </p>

            <div className="relative w-full grid gap-2 max-md:gap-5 mt-2 px-1 grid-cols-4 max-md:grid-cols-2 max-sm:gap-2   max-sm:grid-cols-2">
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full lg:h-auto max-sm:h-auto   gap-2   text-purple-900">
                  <CardTitle className="text-purple-800 text-xl font-bold">
                    Revenue
                  </CardTitle>
                  <CardText className="text-purple-800 text-4xl max-sm:text-sm font-semibold flex justify-start items-start gap-2">
                    $ {revenue.toLocaleString()}
                  </CardText>
                  {/* <p className="text-purple-800 mt-2 text-xl font-semibold max-sm:text-sm">
                    $ EBT {isConnected ? Number(balance) / 100 : 0}
                  </p> */}
                  {/* <CardText className="text-green-800 text-xl max-sm:text-sm font-light"></CardText> */}
                </CardBody>
              </Card>
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full lg:h-auto max-sm:h-auto gap-2   text-purple-900">
                  <CardTitle className="text-purple-900 text-xl font-bold">
                    Total invoices
                  </CardTitle>
                  <CardText className="text-purple-900 text-4xl max-sm:text-sm  font-light">
                    {draft.length + sent.length + paid.length}
                  </CardText>
                </CardBody>
              </Card>
              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full lg:h-auto max-sm:h-auto  gap-2   text-purple-900">
                  <CardTitle className="text-purple-900 text-xl font-bold">
                    Draft
                  </CardTitle>
                  <CardText className="text-purple-900 text-4xl max-sm:text-sm font-light">
                    {draft.length}
                  </CardText>
                </CardBody>
              </Card>

              <Card className="bg-gray-100">
                <CardBody className="relative flex text-xl flex-col max-sm:gap-2 justify-center px-2 max-sm:w-full items-left w-full lg:h-auto max-sm:h-auto  gap-2   text-purple-900">
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
          <div className="relative w-full flex items-center  mt-1 gap-2 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-purple-900 text-sm font-normal">
                latest invoice
              </p>{" "}
              <Link
                to={"/invoices"}
                className="text-purple-900 text-sm   font-normal"
              >
                <p className="text-purple-900 text-sm  font-normal">
                  view invoice
                </p>
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-purple-900 text-sm w-full  font-normal">
                draft
              </p>
              <ArrowRight className="text-purple-900 text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full max-sm:h-auto h-[16rem] max-sm:h-auto gap-1 border-none flex  justify-between   max-sm:flex-col max-md:flex-col">
            <div className="w-1/2 max-sm:w-full flex-col gap-2">
              <div className="flex flex-col w-full">
                {draft?.length == 0 ? (
                  <p className="text-gray-700 text-xl px-2  ">
                    No invoice yet!
                  </p>
                ) : (
                  <div className="border w-full h-[10rem]  max-sm:h-auto flex-col gap-2">
                    {currentInvoices.reverse().map((invoice: any) => (
                      <div
                        className="relative border-b border-gray-700 gap-2 border max-sm:p-0 bg-gray-200"
                        key={invoice.id}
                      >
                        <InvoiceTemplate invoice={invoice} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <div className="w-full  h-auto mt-1">
                <Paginate
                  invoices={draft}
                  postsPerPage={invoicesPerPage}
                  paginateHandler={handlePaginate}
                />
              </div> */}
            </div>

            {/*  */}
            <div className="w-1/2 h-[100%] max-sm:w-full">
              <div className="w-full max-sm:w-full max-sm:h-auto border">
                <LineChart />
              </div>
            </div>
            {/* //invoice drfats */}
          </div>{" "}
          {/* <div className="relative  px-0 ">
                  <Paginate
                    invoices={draft}
                    postsPerPage={invoicesPerPage}
                    paginateHandler={handlePaginate}
                  />
                </div> */}
          {/* //Latest invoiceF */}
          {/* <div className="relative w-full max-sm:px-1 justify-between flex  items-center">
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
          </div> */}
          {/* <Body currentData={currentInvoices} /> */}
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
