import { Invoice } from "../../../../../../../States/Slices/invoice.types";
import Empty from "../Empty";
import List from "./List";

const Body = ({ currentData }: { currentData: Invoice[] }) => {
  return (
    <>
      <div className="relative h-auto ">
        {currentData.length == 0 ? (
          <Empty />
        ) : (
          <List currentData={currentData} />
        )}
      </div>
    </>
  );
};

export default Body;
