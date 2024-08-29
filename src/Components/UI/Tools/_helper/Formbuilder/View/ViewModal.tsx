import { Like } from "react-huge-icons/bulk";
import { Invoice } from "../../../../../States/Slices/invoice.types";

const ViewModal = ({
  data,
  callback,
}: {
  data: Invoice;

  callback(): void;
}) => {
  return (
    <>
      <div className="absolute h-auto max-sm:h-auto w-full flex   max-sm:px-0 max-sm:py-0 justify-center items-center">
        <div className="relative  bg-white shadow-md  rounded-xl  z-30 flex flex-col py-5 px-5 ">
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
              <p className="text-black  font-normal">State- {data.State}</p>
              <p className="text-black  font-normal">
                Country - {data.Country}
              </p>
              <p className="text-black  font-normal">
                Date Issued - {data.DateIssued}
              </p>
              <p className="text-black  font-normal">
                Due Date - {data.DateDue}
              </p>
              <p className="text-black  font-normal">
                Payment information - {data.paymentInformation}
              </p>
              <p className="text-black  font-normal">Note - {data.Notes}</p>
              <p className="text-black  font-normal">
                Shipping Address - {data.shippingAddress}
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
              <div className="relative flex-col flex">
                {data.itemList?.map(
                  (
                    { description, unitPrice, unitTotal, quantity },
                    i
                  ) => (
                    <div className="relative grid grid-cols-4 gap-1" key={i}>
                      <p className="text-black text-center font-normal">{description}</p>
                      <p className="text-black text-center  font-normal">{quantity}</p>
                      <p className="text-black text-center  font-normal">{unitPrice}</p>
                      <p className="text-black text-center  font-normal">{unitTotal}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <hr className="w-full border border-black" />
          <div className="relative w-full h-auto grid grid-cols-1  gap-3 mt-5 text-black">
            <div className="relative flex  justify-start items-center">
              <p className="text-black  font-normal">Discount- </p>
              <p className="underline text-black  font-normal">
                {data.Discount}%
              </p>
            </div>
            <div className="relative  flex justify-start items-center">
              <p className="text-black  font-normal">Tax- </p>
              <p className="underline text-black  font-normal">{data.VAT}%</p>
            </div>
            <div className="relative flex justify-start gap-1 items-center">
              <p className="text-black  font-normal">Total - </p>
              <p className="underline text-black  font-normal">${data.TOTAL}</p>
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
