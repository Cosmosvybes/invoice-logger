import { Input } from "reactstrap";

import useTableController from "./table.controller";
import Empty from "../Dashboard/Invoices/Empty";
import useClientDataController from "./client.controller";
import Paginate from "./Paginate";

const Table_ = () => {
  const { clients, search, handleSearch } = useTableController();

  const { currentList, postPerPage, setCurrentPage, notFound, tableColums } =
    useClientDataController(clients);

  const TABLE_BODY =
    currentList.filter((user) =>
      search == ""
        ? currentList
        : user.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          String(user.id).includes(search.trim()) ||
          user.address.toLowerCase().includes(search.toLowerCase().trim()) ||
          user.cityStatePostal
            .toLowerCase()
            .includes(search.toLowerCase().trim()) ||
          user.country.toLowerCase().includes(search.toLowerCase().trim())
    ).length == 0 ? (
      <tr className="text-center row-span-full max-sm:text-sm font-light text-black ">
        {notFound.map((_, i) => (
          <td className="text-gray-400" key={i}>
            {""}
          </td>
        ))}
      </tr>
    ) : (
      currentList
        .filter((user) =>
          search == ""
            ? currentList
            : user.name.toLowerCase().includes(search.toLowerCase().trim()) ||
              String(user.id).includes(search.trim()) ||
              user.address
                .toLowerCase()
                .includes(search.toLowerCase().trim()) ||
              user.cityStatePostal
                .toLowerCase()
                .includes(search.toLowerCase().trim()) ||
              user.country.toLowerCase().includes(search.toLowerCase().trim())
        )
        .map((row, i) => (
          <tr
            key={i}
            className={`${i % 2 == 0 ? "bg-gray-50" : "bg-gray-100"}`}
          >
            {/* <td className="text-center  py-2 max-sm:py-1">
              {String(row.id).slice(10, 15)}
            </td> */}
            <td className="text-center max-sm:text-sm font-normal text-black  py-2 max-sm:py-1">
              {String(row.name).slice(0, 6)}
            </td>
            <td className="text-center max-sm:text-sm font-normal text-black py-2 max-sm:py-1">
              {String(row.email).length > 10 &&
                String(row.email).slice(0, 9) + "..."}
            </td>
            <td className="text-center max-sm:text-sm font-normal text-black py-4 max-sm:py-1">
              {String(row.address).length > 10
                ? String(row.address).slice(0, 5) + "..."
                : row.address}
            </td>
            <td className="text-center max-sm:text-sm font-normal text-black py-4 max-sm:py-1">
              {row.cityStatePostal}
            </td>
            <td className="text-center max-sm:text-sm font-normal text-black py-4 max-sm:py-1">
              {row.country.slice(0,8)}
            </td>
          </tr>
        ))
    );

  return (
    <>
      <div className="relative max-sm:w-full">
        <div className="relative flex justify-start items-center gap-3 max-sm:w-full h-auto w-full mt-5 max-sm:px-1 max-sm:mt-3">
          <Input
            className="w-1/4 max-sm:w-full border px-3 py-3 outline-none rounded-md"
            placeholder="Search client name, ID, city or country"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />{" "}
        </div>

        <table className="w-full border-collapse border-b px-3  mt-5 max-sm:w-full">
          <thead className="mb-2 ">
            <tr className="py-3">
              {tableColums.map((_, i) => (
                <th
                  className="text-slate-800 text-center py-3 lg:py-2 max-sm:py-2"
                  key={i}
                >
                  {_.text}
                </th>
              ))}
            </tr>
          </thead>
          <br />
          <tbody>{TABLE_BODY}</tbody>
        </table>
        <div className="relative justify-center flex">
          <Paginate
            list={clients}
            listPerPage={postPerPage}
            handleNext={setCurrentPage}
          />
        </div>

        {currentList.length == 0 && (
          <Empty message="You haven't added a client yet" />
        )}
      </div>
    </>
  );
};

export default Table_;
