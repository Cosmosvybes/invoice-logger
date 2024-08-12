const InvoiceTable = () => {
  return (
    <>
      <div className="relative w-full max-sm:w-auto flex  mt-5  flex-col gap-0.5">
        <div className="relative  bg-gray-300 items-center grid grid-cols-7  gap-1 py-1 w-full max-sm:w-auto">
          <p className="text-black  font-normal px-2 text-xl max-sm:text-xs">
            Number
          </p>
          <p className="text-black font-normal text-center text-xl max-sm:text-xs">
            Client
          </p>
          <p className="text-black font-normal text-center text-xl max-sm:text-xs">
            Status
          </p>
          <p className="text-black font-normal text-center text-xl max-sm:text-xs">
            Amount
          </p>
          <p className="text-black font-normal text-center text-xl max-sm:text-xs">
            Created
          </p>
          <p className="text-black font-normal text-center text-xl max-sm:text-xs">
            Modified
          </p>
        
        </div>
      </div>
    </>
  );
};

export default InvoiceTable;
