import { Like } from "react-huge-icons/bulk";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
const ViewModal = ({
  data,
  callback,
}: {
  data: Invoice;

  callback(): void;
}) => {
  return (
    <>
      <div className="relative z-30 border border-red-500  h-[100vh] overflow-y-scroll w-full flex   max-sm:px-0 max-sm:py-0 justify-center items-center">
        <div className="relative bg-white shadow-md  rounded-md py-10  z-30 flex flex-col px-2 ">
          <div className="relative flex flex-col gap-2">
            <h1 className="text-xl text-xs text-black">Invoice Preview</h1>

            <div className="relative block">
              <p className="text-black  text-xs">Invoice ID- {data.id}</p>
              <h1 className="text-xl text-xs text-black underline">
                Business Details
              </h1>
              <p className="text-black  text-xs">
                Business name- {data.Business}
              </p>
              <p className="text-black  text-xs">
                Business address- {data.BusinessAddress}
              </p>
            </div>
          </div>


          <div className="relative block ">
            <h1 className="text-xl text-xs text-black underline">
              Client Details
            </h1>
            <div className="relative w-full grid grid-cols-1 text-black">
              <p className="text-black  text-xs">
                Client name- {data.Client}
              </p>
              <p className="text-black  text-xs">
                Client Address- {data.ClientAddress}
              </p>
              <p className="text-black  text-xs">
                Date Issued - {data.DateIssued}
              </p>
              <p className="text-black  text-xs">
                Due Date - {data.DateDue}
              </p>
              <p className="text-black  text-xs">Note - {data.Notes}</p>
            </div>
          </div>
          <div className="relative block ">
            <h1 className="text-2xl text-xs text-black underline">
              Items List
            </h1>
            <div className="relative gap-1 grid grid-cols-4">
              <p className="text-black  text-xs">Description</p>
              <p className="text-black  text-xs">Quantity</p>
              <p className="text-black  text-xs">Unit Price</p>
              <p className="text-black  text-xs">Sub-total</p>
            </div>
            <div className="relative ">
              <div className="relative flex-col flex h-16  overflow-y-scroll">
                {data.itemList?.map(
                  ({ description, unitPrice, unitTotal, quantity }, i) => (
                    <div className="relative grid grid-cols-4 gap-1" key={i}>
                      <p className="text-black text-center text-xs">
                        {description}
                      </p>
                      <p className="text-black text-center  text-xs">
                        {quantity}
                      </p>
                      <p className="text-black text-center  text-xs">
                        {unitPrice}
                      </p>
                      <p className="text-black text-center  text-xs">
                        {Number(unitTotal).toFixed(2)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <hr className="w-full border border-black" />
          <div className="relative w-full h-auto grid grid-cols-1  gap-3 mt-2 text-black">
            <div className="relative flex  justify-start items-center">
              <p className="text-black  text-xs">Discount- </p>
              <p className="underline text-black  text-xs">
                {data.Discount}%
              </p>
            </div>
            <div className="relative  flex justify-start items-center">
              <p className="text-black  text-xs">Tax- </p>
              <p className="underline text-black  text-xs">{data.VAT}%</p>
            </div>
            <div className="relative flex justify-start gap-1 items-center">
              <p className="text-black  text-xs">Total - </p>
              <p className="underline text-black  text-xs">
                {Number(data.TOTAL).toLocaleString() + " "}{" "}
                {data.currency != "--select--" && data.currency}
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
