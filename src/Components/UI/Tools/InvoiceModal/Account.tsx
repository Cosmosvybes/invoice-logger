import useModalController from "./controller";
import Template from "../_helper/Formbuilder/Template";
import { Button } from "reactstrap";
import { ArrowRight, PlusThin } from "react-huge-icons/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/InvoiceTemplate";

const Account = () => {
  const { invoices } = useAppSelector((state) => state.invoice);
  // const { forms, senderInfo } = useModalController();
  const [accountData] = useState([
    {
      id: 1,
      title: "All invoices",
      value: 2,
    },
    {
      id: 2,
      title: "Outstanding invoices",
      value: 0,
    },
    {
      id: 35,
      title: "Revenue ",
      value: "$0.00",
    },
  ]);

  const Item = {
    Description: "cement",
    Amount: 200,
    unit_price: "1000",
    id: 2,
  };
  let data = [
    {
      id: 1,
      AdditionalInfo: "no problem",
      Business: "Flicks",
      BusinessAddress: "No. 52 SetBack Block",
      BusinessState: "Ilorin",
      BusinessCountry: "Nigeria",
      City: "Ilorin",
      state: "string",
      Client: "string",
      ClientAddress: "string",
      ClientCity: "string",
      Country: "string",
      clientState: "string",
      DateDue: "string",
      DateIssued: "string",
      IssuedBy: "string",
      itemList: [Item],
    },
    {
      id: 3,
      AdditionalInfo: "no problem",
      Business: "Flicks",
      BusinessAddress: "No. 52 SetBack Block",
      BusinessState: "Ilorin",
      BusinessCountry: "Nigeria",
      City: "Ilorin",
      state: "string",
      Client: "string",
      ClientAddress: "string",
      ClientCity: "string",
      Country: "string",
      clientState: "string",
      DateDue: "string",
      DateIssued: "string",
      IssuedBy: "string",
      itemList: [Item],
    },
    {
      id: 2,
      AdditionalInfo: "no problem",
      Business: "Flicks",
      BusinessAddress: "No. 52 SetBack Block",
      BusinessState: "Ilorin",
      BusinessCountry: "Nigeria",
      City: "Ilorin",
      state: "string",
      Client: "string",
      ClientAddress: "string",
      ClientCity: "string",
      Country: "string",
      clientState: "string",
      DateDue: "string",
      DateIssued: "string",
      IssuedBy: "string",
      itemList: [Item],
    },
  ];
  return (
    <>
      <div className="relative h-screen  w-full   duration-1000 transition  max-sm:py-2 max-sm:h-screen   flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-screen boder-black w-full  py-10 max-sm:w-full rounded-3xl   flex flex-col  gap-3 px-5  font-bold">
          <div className="relative w-full flex justify-between items-center px-2">
            <h1 className="text-black text-6xl font-extrabold">Account</h1>

            <Button
              // onClick={() => setIsCreatingNewInvoice(!isCreatingNewInvoice)}
              className="bg-black h-16 max-sm:h-14 font-normal rounded-md text-gray-50 w-52"
            >
              <p className="flex items-center justify-center">
                {" "}
                <PlusThin className="inline text-3xl" /> new invoice{" "}
              </p>
            </Button>
          </div>
          <div className="w-full  mt-5 block relative">
            <p className="text-gray-500 px-10 text-3xl max-sm:text-xl font-light ">
              Overview
            </p>

            <div className="relative w-full grid gap-5 py-5 px-1 grid-cols-3 max-sm:grid-cols-1">
              {accountData.map((information) => (
                <div
                  className="relative flex flex-col justify-center max-sm:w-full items-center w-full h-44 gap-3 rounded-lg border"
                  key={information.id}
                >
                  <p className="text-gray-500 text-3xl font-light">
                    {information.title}
                  </p>
                  <h1 className="text-black text-6xl font-extrabold">
                    {information.value}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full flex items-center  gap-5 justify-between  max-sm:px-0  max-sm:grid max-sm:grid-cols-1 max-sm:w-full ">
            <div className="relative w-full flex justify-between items-center px-2">
              <p className="text-gray-600 text-xl font-light ">
                Latest Invoice
              </p>{" "}
              <Link
                to={"/drafts"}
                className="text-gray-600 text-xl  font-light"
              >
                View Invoice
              </Link>{" "}
            </div>
            <div className="relative w-full flex justify-between items-center px-2">
              <p className="text-gray-600 text-xl w-full font-light">Drafts</p>
              <ArrowRight className="text-black text-4xl" />
            </div>
          </div>
          {/* //invoice drfats */}
          <div className="relative w-full flex justify-end ">
            {data.length == 0 ? (
              <p className="text-gray-300 text-4xl px-2  ">No invoice yet!</p>
            ) : (
              <div className="relative w-1/2  h-auto py-2 grid grid-cols-1 px-2 gap-2  mt-3 max-sm:grid-cols-1  max-sm:w-full  ">
                {data.map((invoice) => (
                  <div className="relative" key={invoice.id}>
                    <InvoiceTemplate invoice={invoice} />
                  </div>
                ))}
              </div>
            )}{" "}
            {/* //invoice drfats */}
          </div>{" "}
          {/* //Latest invoiceF */}
          <div className="relative w-full  justify-between flex  items-center">
            <p className="text-gray-600 text-xl font-light ">
              {" "}
              Recent Invoices
            </p>{" "}
            <Link to={"/drafts"} className="text-gray-600 text-xl  font-light">
              View All <ArrowRight className="text-black text-4xl inline" />
            </Link>{" "}
          </div>
          <div className="relative w-full flex border  flex-col gap-0.5">
            <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-auto">
              <p className="text-white  font-light px-2 text-xl max-sm:text-xs">
                Number
              </p>
              <p className="text-white font-light text-xl max-sm:text-xs">
                Client
              </p>
              <p className="text-white font-light text-xl max-sm:text-xs">
                Status
              </p>
              <p className="text-white font-light text-xl max-sm:text-xs">
                Amount
              </p>
              <p className="text-white font-light text-xl max-sm:text-xs">
                Date
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
