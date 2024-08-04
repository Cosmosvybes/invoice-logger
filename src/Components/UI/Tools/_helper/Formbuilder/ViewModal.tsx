import { Like } from "react-huge-icons/outline";

interface Data {
  AdditionalInfo: string;
  Business: string;
  BusinessAddress: string;
  BusinessState: string;
  BusinessCountry: string;
  City: string;
  state: string;
  Client: string;
  ClientAddress: string;
  ClientCity: string;
  Country: string;
  clientState: string;
  DateDue: string;
  DateIssued: string;
  IssuedBy: string;
  itemList: [];
}

const ViewModal = ({ data, callback }: { data: Data; callback(): void }) => {
  return (
    <>
      <div className="absolute h-auto overflow-scroll max-sm:h-auto w-full flex  max-sm:px-0 max-sm:py-10 justify-center items-center">
        <div className="relative   rounded-xl z-10 bg-gray-50  overflow-y-scroll overflow-x-clip border flex flex-col py-5 px-5 ">
          <div className="relative flex flex-col gap-2">
            <h1 className="text-3xl font-light">Invoice Preview</h1>

            <div className="relative block mt-2">
              <h1 className="text-2xl font-light underline">
                Business Details
              </h1>
              <p>Business name- {data.Business}</p>
              <p>Business address- {data.BusinessAddress}</p>
              <p>City/Postal- {data.ClientCity}</p>
              <p>State- {data.BusinessState}</p>
              <p>Country - {data.BusinessCountry}</p>
            </div>
          </div>
          <div className="relative block mt-2">
            <h1 className="text-2xl font-light underline">Client Details</h1>
            <div className="relative w-full grid grid-cols-1">
              <p>Client name- {data.Client}</p>
              <p>Client Address- {data.ClientAddress}</p>
              <p>City/Postal- {data.City}</p>
              <p>State- {data.state}</p>
              <p>Country - {data.Country}</p>
              <p>Date Issued - {data.DateIssued}</p>
              <p>Due Date - {data.DateDue}</p>
            </div>
          </div>
          <div className="relative block mt-2">
            <h1 className="text-2xl font-light underline">Items List</h1>
            <div className="relative grid grid-cols-4">
              <p>Description</p>
              <p>Quantity</p>
              <p>Unit Price</p>
              <p>Amount</p>
            </div>
            <div className="relative flex-col flex">
              {data.itemList.map(
                ({ description, amount, unit_price, quantity }) => (
                  <div className="relative grid grid-cols-4 gap-1">
                    <p>{description}</p>
                    <p>{quantity}</p>
                    <p>{unit_price}</p>
                    <p>{amount}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <hr className="w-full border border-black" />
          <div className="relative w-full h-auto flex justify-end items-center">
            <div className="relative block">
              <p>Total </p>
              <p className="underline">$ {200000000}</p>
            </div>
          </div>
          <Like
            className="text-5xl hover:text-gray-600 text-gray-400 absolute right-2 top-2"
            onClick={() => callback()}
          />
        </div>
      </div>
    </>
  );
};

export default ViewModal;
