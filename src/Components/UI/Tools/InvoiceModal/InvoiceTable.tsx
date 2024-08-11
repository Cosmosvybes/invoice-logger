const InvoiceTable = () => {
  return (
    <>
      <div className="relative w-full max-sm:w-auto flex  mt-5  flex-col gap-0.5">
        <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-auto">
          <p className="text-gray-100  font-light px-2 text-xl max-sm:text-xs">
            Number
          </p>
          <p className="text-gray-100 font-light text-xl max-sm:text-xs">
            Client
          </p>
          <p className="text-gray-100 font-light text-xl max-sm:text-xs">
            Status
          </p>
          <p className="text-gray-100 font-light text-xl max-sm:text-xs">
            Amount
          </p>

          <p className="text-gray-100 font-light text-xl max-sm:text-xs">
            Modified At
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceTable;
