import { Like } from "react-huge-icons/bulk";

interface Data {
  TOTAL: string | number;
  AdditionalInfo: string;
  id: string;
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

const ViewModal = ({
  data,
  callback,
  TOTAL,
  isEditList,
}: {
  data: Data;
  TOTAL: number | any;
  callback(): void;
  isEditList?: any[];
}) => {
  return (
    <>
      <div className="absolute h-auto mt-2  z-20  max-sm:h-auto w-full flex  max-sm:px-0 max-sm:py-10 justify-center items-center">
        <div className="relative  bg-gray-50  rounded-xl z-10   border flex flex-col py-5 px-5 ">
          <div className="relative flex flex-col gap-2">
            <h1 className="text-3xl font-normal text-black">Invoice Preview</h1>

            <div className="relative block mt-2">
              <p className="text-black  font-normal">Invoice ID- {data.id}</p>
              <h1 className="text-2xl font-normal text-black underline">
                Business Details
              </h1>
              <p className="text-black  font-normal">
                Business name- {data.Business}
              </p>
              <p className="text-black  font-normal">
                Business address- {data.BusinessAddress}
              </p>
              <p className="text-black  font-normal">
                City/Postal- {data.ClientCity}
              </p>
              <p className="text-black  font-normal">
                State- {data.BusinessState}
              </p>
              <p className="text-black  font-normal">
                Country - {data.BusinessCountry}
              </p>
            </div>
          </div>
          <div className="relative block mt-2">
            <h1 className="text-2xl font-normal text-black underline">
              Client Details
            </h1>
            <div className="relative w-full grid grid-cols-1 text-black">
              <p className="text-black  font-normal">
                Client name- {data.Client}
              </p>
              <p className="text-black  font-normal">
                Client Address- {data.ClientAddress}
              </p>
              <p className="text-black  font-normal">
                City/Postal- {data.City}
              </p>
              <p className="text-black  font-normal">State- {data.state}</p>
              <p className="text-black  font-normal">
                Country - {data.Country}
              </p>
              <p className="text-black  font-normal">
                Date Issued - {data.DateIssued}
              </p>
              <p className="text-black  font-normal">
                Due Date - {data.DateDue}
              </p>
            </div>
          </div>
          <div className="relative block mt-2">
            <h1 className="text-2xl font-normal text-black underline">
              Items List
            </h1>
            <div className="relative gap-1 grid grid-cols-4">
              <p className="text-black  font-normal">Description</p>
              <p className="text-black  font-normal">Quantity</p>
              <p className="text-black  font-normal">Unit Price</p>
              <p className="text-black  font-normal">Sub-total</p>
            </div>
            <div className="relative">
              {isEditList?.length! > 0 ? (
                <div className="relative flex-col flex">
                  {isEditList?.map(
                    ({ description, amount, unit_price, quantity }) => (
                      <div className="relative grid grid-cols-4 gap-1">
                        <p className="text-black  font-normal">{description}</p>
                        <p className="text-black  font-normal">{quantity}</p>
                        <p className="text-black  font-normal">{unit_price}</p>
                        <p className="text-black  font-normal">{amount}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="relative flex-col flex text-black">
                  {data.itemList.map(
                    ({ description, amount, unit_price, quantity }) => (
                      <div className="relative grid grid-cols-4 gap-1">
                        <p className="text-black font-normal">{description}</p>
                        <p className="text-black  font-normal">{quantity}</p>
                        <p className="text-black  font-normal">{unit_price}</p>
                        <p className="text-black  font-normal">{amount}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <hr className="w-full border border-black" />
          <div className="relative w-full h-auto flex text-black justify-end items-center">
            <div className="relative block">
              <p className="text-black  font-normal">Total </p>
              <p className="underline text-black  font-normal">
                ${data.TOTAL ? data.TOTAL : TOTAL}
              </p>
            </div>
          </div>
          <Like
            className="text-5xl hover:text-black text-gray-400 absolute  transition duration-700 right-2 top-2"
            onClick={() => callback()}
          />
        </div>
      </div>
    </>
  );
};

export default ViewModal;
