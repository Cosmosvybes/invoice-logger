import { Input, Table } from "reactstrap";

import useTableController from "./table.controller";
import Empty from "../Dashboard/Invoices/Empty";
const Table_ = () => {
  const { clients, search, handleSearch } = useTableController();



  

  const TABLE_BODY = clients
    .filter((user) =>
      search == ""
        ? clients
        : user.name.toLowerCase().includes(search.toLowerCase()) ||
          String(user.id).includes(search) ||
          user.address.toLowerCase().includes(search.toLowerCase()) ||
          user.cityStatePostal.toLowerCase().includes(search.toLowerCase()) ||
          user.country.toLowerCase().includes(search.toLowerCase())
    )
    .map((row, i) => (
      <tr key={i} className={`${i % 2 == 0 ? "bg-gray-100" : "bg-gray-200"}`}>
        <td className="text-center max-sm:text-sm gap-2   py-4">
          {String(row.id).slice(10, 15)}
        </td>
        <td className="text-center max-sm:text-xs  py-4">{row.name}</td>
        <td className="text-center max-sm:text-xs  py-4">
          {String(row.email).length > 10 &&
            String(row.email).slice(0, 9) + "..."}
        </td>
        <td className="text-center max-sm:text-xs  py-4">
          {String(row.address).length > 10
            ? String(row.address).slice(0, 9) + "..."
            : row.address}
        </td>
        <td className="text-center max-sm:text-xs  py-4">
          {row.cityStatePostal}
        </td>
        <td className="text-center max-sm:text-xs  py-4">{row.country}</td>
      </tr>
    ));

  return (
    <>
      <div className="relative max-sm:w-full">
        <div className="relative flex justify-start max-sm:w-full h-auto w-full mt-5 max-sm:px-1 max-sm:mt-3">
          <Input
            className="w-1/4 max-sm:w-full border px-3 py-3 outline-none rounded-md"
            placeholder="Search client name, ID, city or country"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Table className="w-full border-collapse border-b px-3  mt-5 max-sm:w-full">
          <thead>
            <tr>
              <th className="text-slate-800">ID</th>
              <th className="text-slate-800">Name</th>
              <th className="text-slate-800">Email</th>
              <th className="text-slate-800">Address</th>
              <th className="text-slate-800">City</th>
              <th className="text-slate-800">Country</th>
            </tr>
          </thead>
          <tbody>{TABLE_BODY}</tbody>
        </Table>
        {clients.length == 0 && (
          <Empty message="You haven't added a client yet" />
        )}
      </div>
    </>
  );
};

export default Table_;
