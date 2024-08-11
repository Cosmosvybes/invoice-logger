import { Invoice } from "react-huge-icons/bulk";

const Empty = () => {
  return (
    <>
      <div className="relative text-center h-60 gap-5 w-full border-t flex-col flex justify-center items-center border-b">
        <div className="relative w-14 h-14 rounded-full flex justify-center items-center bg-gray-300">
          <Invoice className="text-2xl" />
        </div>
        <p className="text-2xl font-normal">
          You don't have an invoice yet!
        </p>{" "}
        <button
          //   to="/new/invoice"
          className="w-32 px-2 py-1 text-black font-normal border rounded-md"
        >
          Create one
        </button>
      </div>
    </>
  );
};

export default Empty;
