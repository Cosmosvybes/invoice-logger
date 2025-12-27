import { Input } from "reactstrap";

import useTableController from "./table.controller";
import Empty from "../Dashboard/Invoices/Empty";
import useClientDataController from "./client.controller";
import Paginate from "../../../Tools/Layout/Paginate/Paginate";
import { Search, MapPin, Mail, User } from "react-huge-icons/outline";

const Table_ = () => {
  const { clients, search, handleSearch } = useTableController();

  const { currentList, postPerPage, setCurrentPage, currentPage } =
    useClientDataController(clients);

  const filteredClients = currentList.filter((user) =>
    search == ""
        ? currentList
        : user.name.toLowerCase().includes(search.toLowerCase().trim()) ||
        String(user.id).includes(search.trim()) ||
        user.address.toLowerCase().includes(search.toLowerCase().trim()) ||
        user.cityStatePostal.toLowerCase().includes(search.toLowerCase().trim()) ||
        user.country.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Relationships</h2>
            <p className="text-slate-500 font-medium text-sm">Managing {clients.length} business entities in your network.</p>
          </div>
          <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              </div>
              <Input
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-violet-50 focus:border-violet-200 transition-all font-medium shadow-sm"
                  placeholder="Search by name, address or location..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
              />
          </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-left">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest pl-8 whitespace-nowrap">Entity Name</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Contact Details</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Principal Address</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Location</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Geography</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredClients.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center opacity-40">
                                <User className="text-5xl mb-3" />
                                <p className="text-sm font-bold">No clients found matching your search</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    filteredClients.map((row, i) => (
                        <tr
                            key={i}
                            className="hover:bg-slate-50/50 transition-all group cursor-default"
                        >
                            <td className="p-6 pl-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-violet-200/50">
                                        {row.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-slate-900 font-black tracking-tight">{row.name}</span>
                                </div>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Mail className="text-lg text-slate-300" />
                                    <span className="text-sm font-medium">{row.email}</span>
                                </div>
                            </td>
                            <td className="p-6">
                                <div className="flex items-start gap-2 text-slate-500 max-w-[200px]">
                                    <MapPin className="text-lg text-slate-300 shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium leading-relaxed truncate">{row.address}</span>
                                </div>
                            </td>
                            <td className="p-6">
                                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                                    {row.cityStatePostal}
                                </span>
                            </td>
                            <td className="p-6 text-center">
                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                                    {row.country}
                                </span>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
            </table>
        </div>
        
        {clients.length > 0 && (
            <div className="p-6 border-t border-slate-50 flex justify-center bg-slate-50/30">
                <Paginate
                    list={clients}
                    listPerPage={postPerPage}
                    handleNext={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        )}

        {clients.length === 0 && (
          <div className="py-20">
            <Empty message="You haven't added a client yet" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table_;
