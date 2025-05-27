import { useAppSelector } from "../../../../../States/hoooks/hook";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Empty from "../Dashboard/Invoices/Empty";
import EscrowCard from "./EscrowCard";

const Escrows = () => {
  const { escrows } = useAppSelector((store) => store.escrowSlice);
  const { isConnected } = useAppSelector((store) => store.walletSlice);

  if (!isConnected) {
    return (
      <div className="relative flex justify-center items-center h-screen w-full">
        <Empty message={"Connect wallet to proceed"} />
      </div>
    );
  }

  if (escrows.length == 0) {
    return (
      <div className="relative flex justify-center items-center h-screen w-full">
        <p className="text-purple-400 text-2xl">NO OPEN ESCROW YET.</p>
      </div>
    );
  }
  return (
    <div className="relative px-28  max-sm:px-1">
      <BreadCrumb title="Escrows" useLink={false} linkTitle="" />
      <div className="relative h-[24rem] max-sm:h-[90vh] max-sm:w-full  bg-gray-100 rounded-lg  flex max-sm:flex-col gap-2 justify-start  mt-4 items-start">
        {escrows.map(({ escrowID, isCompleted }) => (
          <EscrowCard
            key={escrowID}
            escrowID={escrowID}
            isCompleted={isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Escrows;
