import { Input } from "reactstrap";

import useTableController from "./table.controller";
import Empty from "../Dashboard/Invoices/Empty";
import useClientDataController from "./client.controller";
import Paginate from "./Paginate";

const Table_ = () => {
  const { clients, search, handleSearch } = useTableController();

  const { currentList, postPerPage, setCurrentPage, tableColums } =
    useClientDataController(clients);



  return (
    <>
      <div className="relative w-full clean-card p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Client List</h2>
            <div className="relative w-full max-w-md">
                <Input
                    className="clean-input w-full px-4 py-2 rounded-lg text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-200"
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                {tableColums.map((_, i) => (
                    <th
                    className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
                    key={i}
                    >
                    {_.text}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
                {currentList.filter((user) =>
                    search == ""
                        ? currentList
                        : user.name.toLowerCase().includes(search.toLowerCase().trim()) ||
                        String(user.id).includes(search.trim()) ||
                        user.address.toLowerCase().includes(search.toLowerCase().trim()) ||
                        user.cityStatePostal.toLowerCase().includes(search.toLowerCase().trim()) ||
                        user.country.toLowerCase().includes(search.toLowerCase().trim())
                ).length == 0 ? (
                    <tr>
                        <td colSpan={tableColums.length} className="py-8 text-center text-slate-500">
                            No clients found matching your search.
                        </td>
                    </tr>
                ) : (
                    currentList
                        .filter((user) =>
                            search == ""
                                ? currentList
                                : user.name.toLowerCase().includes(search.toLowerCase().trim()) ||
                                String(user.id).includes(search.trim()) ||
                                user.address.toLowerCase().includes(search.toLowerCase().trim()) ||
                                user.cityStatePostal.toLowerCase().includes(search.toLowerCase().trim()) ||
                                user.country.toLowerCase().includes(search.toLowerCase().trim())
                        )
                        .map((row, i) => (
                        <tr
                            key={i}
                            className="hover:bg-slate-50 transition-colors group"
                        >
                            <td className="py-4 px-4 text-sm text-slate-900 font-semibold">
                            {String(row.name).slice(0, 15)}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600">
                            {String(row.email).length > 20
                                ? String(row.email).slice(0, 20) + "..."
                                : row.email}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-500">
                            {String(row.address).length > 20
                                ? String(row.address).slice(0, 20) + "..."
                                : row.address}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-500">
                            {row.cityStatePostal}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-500">
                            {row.country.slice(0, 15)}
                            </td>
                        </tr>
                        ))
                )}
            </tbody>
            </table>
        </div>
        
        <div className="relative flex justify-center mt-6">
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
