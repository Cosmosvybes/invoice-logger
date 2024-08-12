import { Table } from "reactstrap";
import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { MoreVertical } from "react-huge-icons/bulk";

const List = ({ currentData }: { currentData: Invoice[] }) => {
  return (
    <>
      <Table className="w-full border-collapse overflow-x-auto">
        <tbody>
          {currentData.map((invoice, index) => (
            <tr
              className={` ${
                index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
              } py-4 px-3  `}
              key={invoice.id}
            >
              <td className="text-black text-center font-normal py-4 w-20">
                {String(invoice.id).slice(6, 11)}
              </td>
              <td className="text-black text-center font-normal py-4  w-20">
                {invoice.Client}
              </td>

              <td className="text-black text-center  font-normal py-4 w-20">
                {invoice.status == "Awaiting" ? "Draft" : "Sent"}
              </td>
              <td className="text-black text-center font-normal py-4  w-20">
                ${invoice.TOTAL}
              </td>

              <td className="text-black text-center  font-normal py-4 w-20">
                {invoice.createdAt}
              </td>
              <td className="text-black text-center  font-normal py-4 w-20">
                {invoice.updatedAt}
              </td>
              <td className="text-black text-center  font-normal py-4 w-20">
                <MoreVertical className="text-5xl" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default List;
