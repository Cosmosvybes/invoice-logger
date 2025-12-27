import withAdmin from "../../../Tools/_helper/Auth/withAdmin";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import { 
  MoneyBagDollar, 
  UsersDouble,
  ChartHistogram,
  BriefcaseTriangularTwoLocks,
} from "react-huge-icons/solid";

import useAdminController from "./useAdminController";

const AdminDashboard = () => {
  const { stats: data } = useAdminController();

  // Real Data Integration
  const stats = [
        { label: "Total Revenue", value: data ? `₦${data.totalRevenue.toLocaleString()}` : "...", target: "Goal: ₦1M", icon: <MoneyBagDollar />, color: "bg-emerald-500" },
    { label: "Active Subs", value: data ? data.activeSubscriptions.toString() : "...", trend: "Recurring", icon: <ChartHistogram />, color: "bg-violet-500" },
    { label: "Total Users", value: data ? data.totalUsers.toString() : "...", trend: `Pro: ${data?.proUsers}`, icon: <UsersDouble />, color: "bg-blue-500" },
    { label: "Monthly MRR", value: data ? `₦${(data.activeMRR || 0).toLocaleString()}` : "...", trend: "Recurring", icon: <MoneyBagDollar />, color: "bg-pink-500" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <BreadCrumb title="Admin Control Center" useLink={false} linkTitle="" />
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 shadow-sm">
                <BriefcaseTriangularTwoLocks className="text-lg" />
                <span className="text-xs font-black uppercase tracking-widest">Secure Admin Access</span>
            </div>
        </div>

        {/* Tactical Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/10 flex flex-col gap-4 group hover:scale-[1.02] transition-all">
               <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                     {stat.icon}
                  </div>
                  {stat.trend && (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <ChartHistogram className="text-xs" /> {stat.trend}
                    </span>
                  )}
               </div>
               <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                    {stat.target && <span className="text-xs font-bold text-slate-500">/ {stat.target}</span>}
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Marketing Action Tracker (30-Day Plan) */}
          {/* Recent Invoices (Replaces Marketing Tracker) */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/10 overflow-hidden">
             <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                <div>
                   <h3 className="text-lg font-black text-slate-900 leading-none">Recent Financial Activity</h3>
                   <p className="text-slate-500 text-xs font-medium mt-1">Latest processed invoices globally</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black">LIVE FEED</span>
                </div>
             </div>
             
             <div className="p-6">
                <div className="space-y-4">
                    {(data?.recentInvoices?.length ? data.recentInvoices : []).map((inv, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <MoneyBagDollar />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-900">{inv.user}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium">ID: {inv.id.substring(0, 8)}...</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-slate-900">₦{inv.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Paid</span>
                            </div>
                        </div>
                    ))}
                    {!data?.recentInvoices?.length && (
                        <div className="text-center py-8 text-slate-400 text-xs">No recent invoices found.</div>
                    )}
                </div>
             </div>

             {/* Moved Growth Cards to Bottom for layout balance */}
             <div className="p-6 pt-0 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Weekly Growth</span>
                    <div className="text-xl font-black text-emerald-600">{data?.weeklyGrowth ? `+${data.weeklyGrowth}` : "..."}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Customer LTV</span>
                    <div className="text-xl font-black text-blue-600">{data ? `₦${(data.ltv || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "..."}</div>
                </div>
             </div>
          </div>

          {/* Quick Insights */}
          <div className="space-y-6">
             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <h3 className="text-lg font-black mb-4 leading-tight">Projected MRR<br/>at Month End</h3>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-indigo-300 mb-6">{data ? `₦${(data.activeMRR || 0).toLocaleString()}` : "..."}</div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] text-violet-200 font-black uppercase tracking-widest mb-1">Success Metric</p>
                    <p className="text-xs font-medium">Calculated based on active recurring subscriptions.</p>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-xl shadow-slate-200/10">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Signups</h4>
                    <UsersDouble className="text-slate-300" />
                </div>
                <div className="space-y-4">
                    {(data?.recentUsers?.length ? data.recentUsers : []).map((user, i) => (
                        <div key={i} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${user.plan === 'PRO' ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
                                {user.name.charAt(0)}
                             </div>
                             <div className="flex-1">
                                 <div className="flex justify-between items-center">
                                     <span className="text-xs font-bold text-slate-700">{user.name}</span>
                                     <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${user.plan === 'PRO' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{user.plan}</span>
                                 </div>
                                 <p className="text-[10px] text-slate-400 truncate w-32 font-medium">{user.email}</p>
                             </div>
                        </div>
                    ))}
                    {!data?.recentUsers?.length && (
                        <div className="text-center py-4 text-slate-400 text-xs">No new users yet.</div>
                    )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdmin(AdminDashboard);
