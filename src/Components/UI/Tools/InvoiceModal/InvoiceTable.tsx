import { Table } from "reactstrap";

const InvoiceTable = () => {
  return (
    <>
      <Table className="w-full mt-5 border-collapse">
        <thead className=" w-full ">
          <tr>
            <th className="text-center w-20 ">S/N</th>
            <th className="text-center w-20 ">Client</th>
            <th className="text-center w-20 ">Status</th>
            <th className="text-center w-20  ">Amount</th>
            <th className="text-center w-20 ">Created</th>
            <th className="text-center w-20  ">Modified</th>
            <th className="text-center w-20  "></th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default InvoiceTable;
