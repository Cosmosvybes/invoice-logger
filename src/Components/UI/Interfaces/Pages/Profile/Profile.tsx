import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import { getUser } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import useSettingsController from "../Settings/controller";

const Profile = () => {
  const { account } = useAppSelector((state) => state.userSlice || { account: {} });
  const { settings } = useSettingsController();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-10">
        <BreadCrumb title="My Profile" useLink={false} linkTitle="" />
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/30">
            <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 bg-violet-100 rounded-3xl flex items-center justify-center text-5xl">
                    👤
                </div>
                <div>
                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        {account?.Firstname || "User"} {account?.Lastname || ""}
                   </h1>
                   <p className="text-slate-500 font-bold tracking-wide">📧 {account?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Legal Business Name</p>
                    <p className="text-xl font-bold text-slate-900">🏢 {settings?.businessName || account?.settings?.businessName || "Not set"}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account Status</p>
                    <p className="text-xl font-bold text-emerald-600">✅ Active Professional</p>
                </div>
            </div>
            
            <p className="mt-10 text-xs text-slate-400 font-medium italic text-center">Safety Mode Enabled: High-res icons temporarily hidden.</p>
        </div>
    </div>
  );
};

export default withAuth(Profile);
