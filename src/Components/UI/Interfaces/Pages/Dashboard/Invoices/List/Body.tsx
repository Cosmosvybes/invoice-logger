import { useAppSelector } from "../../../../../../../States/hoooks/hook";
import { Invoice } from "../../../../../../../States/Slices/invoice.types";
import Empty from "../Empty";
import List from "./List";

const Body = ({}: { currentData: Invoice[] }) => {
  const { currentData } = useAppSelector((store) => store.invoice);

  return (
    <>
      <div className="relative h-auto ">
        {currentData.length == 0 ? (
          <Empty message="Nothing yet !" />
        ) : (
          <List currentData={currentData} />
        )}
      </div>
    </>
  );
};

export default Body;
