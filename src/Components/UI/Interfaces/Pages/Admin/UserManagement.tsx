import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase/app.config";
import withAdmin from "../../../Tools/_helper/Auth/withAdmin";
import useUsersController from "./useUsersController";
import SupportChat from "./SupportChat";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import { 
    UsersDouble, 
    MoneyBagDollar,
    CheckMarkCircle,
    RemoveCircle,
    Chat
} from "react-huge-icons/solid";

const UserManagement = () => {
    const [selectedChatUser, setSelectedChatUser] = useState<{id: number, name: string} | null>(null);
    const [unreadUsers, setUnreadUsers] = useState<Set<number>>(new Set());
    const { users, loading, pagination, fetchUsers, togglePro, adjustFreemium } = useUsersController();

    // Listen for unread messages
    useEffect(() => {
        const q = query(collection(db, "rooms"), where("hasUnread", "==", true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const unreadIds = new Set<number>();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.userId) unreadIds.add(data.userId);
            });
            setUnreadUsers(unreadIds);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-50/50 pb-20 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
                <BreadCrumb title="User Management" useLink={false} linkTitle="" />
                
                <div className="mt-8 bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <UsersDouble className="text-violet-600" />
                            All Users <span className="text-xs ml-2 bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{pagination.total}</span>
                        </h3>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Subscription</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Stats</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading users...</td>
                                    </tr>
                                ) : users.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-700">{user.firstname || "User"} {user.lastname}</span>
                                                <span className="text-xs text-slate-400 font-medium">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                                                user.isSubscribed 
                                                    ? "bg-violet-100 text-violet-700 border border-violet-200" 
                                                    : "bg-slate-100 text-slate-500 border border-slate-200"
                                            }`}>
                                                {user.isSubscribed ? "PRO Plan" : "Free"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isAdmin ? (
                                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                                    <CheckMarkCircle className="text-sm" /> Admin
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <RemoveCircle className="text-sm" /> User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-slate-600">Invoices: {user.invoiceCount}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">Free Credits: {user.freemiumCount}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Toggle Pro Button */}
                                                <button 
                                                    onClick={() => togglePro(user.id, user.isSubscribed)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                        user.isSubscribed 
                                                            ? "bg-red-50 text-red-600 hover:bg-red-100" 
                                                            : "bg-violet-50 text-violet-600 hover:bg-violet-100"
                                                    }`}
                                                >
                                                    {user.isSubscribed ? "Downgrade" : "Upgrade to Pro"}
                                                </button>

                                                {/* Edit Credits */}
                                                <button 
                                                    onClick={() => {
                                                        const amt = prompt("Enter new freemium credit amount:", user.freemiumCount.toString());
                                                        if (amt !== null && !isNaN(Number(amt))) {
                                                            adjustFreemium(user.id, Number(amt));
                                                        }
                                                    }}
                                                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                    title="Adjust Credits"
                                                >
                                                    <MoneyBagDollar />
                                                </button>

                                                {/* Chat Button */}
                                                <button
                                                    onClick={() => setSelectedChatUser({ id: user.id, name: `${user.firstname} ${user.lastname}` })}
                                                    className="relative p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                                                    title="Message User"
                                                >
                                                    <Chat />
                                                    {unreadUsers.has(user.id) && (
                                                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
                                                        </span>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50/30">
                       <button 
                         disabled={pagination.page <= 1}
                         onClick={() => fetchUsers(pagination.page - 1)}
                         className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50"
                       >
                         Previous
                       </button>
                       <span className="flex items-center px-4 text-xs font-black text-slate-400">
                         Please {pagination.page} of {pagination.pages}
                       </span>
                       <button 
                         disabled={pagination.page >= pagination.pages}
                         onClick={() => fetchUsers(pagination.page + 1)}
                         className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50"
                       >
                         Next
                       </button>
                    </div>
                </div>
            </div>

            {/* Support Chat Slide-over/Modal */}
            {selectedChatUser && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedChatUser(null)}
                    ></div>

                    {/* Chat Panel */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800">Chat with {selectedChatUser.name}</h3>
                            <button 
                                onClick={() => setSelectedChatUser(null)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <RemoveCircle className="text-xl text-slate-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden p-4 bg-slate-50/30">
                            <SupportChat userId={selectedChatUser.id} userName={selectedChatUser.name} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default withAdmin(UserManagement);
