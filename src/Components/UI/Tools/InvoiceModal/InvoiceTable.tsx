import { Table } from "reactstrap";

const InvoiceTable = () => {
  return (
    <>
      <Table className="w-full mt-5 border-collapse">
        <thead className=" w-full ">
          <tr>
            <th className="text-center w-20 max-sm:text-sm ">S/N</th>
            <th className="text-center w-20 max-sm:text-sm ">Client</th>
            <th className="text-center w-20  max-sm:text-sm">Status</th>
            <th className="text-center w-20  max-sm:text-sm ">Amount</th>
            <th className="text-center w-20 max-sm:text-sm ">Modified At</th>
            <th className="text-center w-20 max-sm:text-sm "></th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default InvoiceTable;
