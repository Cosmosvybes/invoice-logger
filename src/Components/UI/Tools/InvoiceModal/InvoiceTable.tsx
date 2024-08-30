import { Table } from "reactstrap";

const InvoiceTable = () => {
  return (
    <>
      <Table className="w-full mt-10 border-collapse text-center">
        <thead className=" w-full  gap-4 ">
          <tr>
            <th className="text-center w-20 max-sm:w-16 max-sm:text-sm ">
              S/N
            </th>
            <th className="text-center w-20 max-sm:w-16 max-sm:text-sm  ">
              Client
            </th>
            <th className="text-center w-20 max-sm:w-16  max-sm:text-sm ">
              Status
            </th>
            <th className="text-center w-20 max-sm:w-16  max-sm:text-sm  ">
              Amount
            </th>
            <th className="text-center w-20 max-sm:w-16 max-sm:text-sm ">
              Updated
            </th>
            <th className="text-center w-20 max-sm:w-16 max-sm:text-sm ">
              Action
            </th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default InvoiceTable;
