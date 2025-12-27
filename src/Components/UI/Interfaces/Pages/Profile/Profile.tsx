import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import userPlaceholder from "./../../../../../assets/User.svg";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { Edit, User, RemoveCircle, Tick, Briefcase, Mail, Calendar } from "react-huge-icons/outline";
import { useState } from "react";
import useSettingsController from "../Settings/controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";

const Profile = () => {
  const { account } = useAppSelector((state) => state.userSlice);
  const [isEditing, setIsEditing] = useState(false);

  // Destructure controller props
  const {
    businessDetails,
    settings,
    handleChange,
    handleSubmit,
    loading,
  } = useSettingsController();

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSave = async () => {
     await handleSubmit();
     setIsEditing(false);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <BreadCrumb title="My Profile" useLink={false} linkTitle="" />
        
        <div className="mt-8 flex flex-col gap-8">
          {/* Main Profile Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden relative">
            {/* Premium Header/Cover Area */}
            <div className="h-48 md:h-64 bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4"></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative px-6 md:px-12 pb-12">
                {/* Avatar Positioning */}
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-1.5 shadow-2xl shadow-slate-400/20 border border-slate-100 transform transition-transform group-hover:scale-[1.02]">
                            <img
                                src={userPlaceholder}
                                alt="profile"
                                className="w-full h-full object-cover rounded-2xl bg-slate-50"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-2 w-full">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
                                {account?.Firstname} {account?.Lastname}
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 font-bold text-sm">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="text-lg text-slate-400" />
                                    {account?.email}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden md:block"></span>
                                <span className="flex items-center gap-1.5 py-1 px-2.5 bg-violet-50 text-violet-600 rounded-lg">
                                    <Tick className="text-lg" />
                                    Verified Account
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end shrink-0">
                            {!isEditing ? (
                                <button 
                                    onClick={handleToggleEdit} 
                                    className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 transform active:scale-95 flex items-center gap-2.5"
                                >
                                    <Edit className="text-xl" /> Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button 
                                        onClick={handleToggleEdit} 
                                        className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all flex items-center gap-2.5"
                                    >
                                        <RemoveCircle className="text-xl" /> Cancel
                                    </button>
                                    <button 
                                        onClick={onSave} 
                                        className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-black text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center gap-2.5 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner size="sm"/> : <Tick className="text-xl" />} Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {!isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Briefcase className="text-lg" /> Business Identity
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-violet-100 hover:shadow-lg hover:shadow-violet-200/20 transition-all">
                                            <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 block">Legal Entity Name</label>
                                            <p className="text-slate-900 font-black text-lg">{account?.settings?.businessName || "No business name set"}</p>
                                        </div>
                                        <div className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-violet-100 hover:shadow-lg hover:shadow-violet-200/20 transition-all">
                                            <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 block">Primary HQ Address</label>
                                            <p className="text-slate-900 font-bold leading-relaxed">{account?.settings?.businessAddress || "No address provided"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <User className="text-lg" /> Personal Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 block">First Name</label>
                                                <p className="text-slate-900 font-bold">{account?.Firstname}</p>
                                            </div>
                                            <div className="flex-1 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 block">Last Name</label>
                                                <p className="text-slate-900 font-bold">{account?.Lastname}</p>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                            <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 block">Linked Email</label>
                                            <p className="text-slate-900 font-bold">{account?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fade-in-up">
                                <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                                    <div className="mb-8">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Business Details</h3>
                                        <p className="text-slate-500 font-medium text-sm">Update your public profile and business information.</p>
                                    </div>
                                    <InputProvider
                                        settings={settings}
                                        handleSubmit={handleSubmit}
                                        schema={[...businessDetails]}
                                        title=""
                                        handleChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            Overview Stats
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl translate-x-8 -translate-y-8"></div>
                                <div className="relative">
                                    <span className="text-xs font-black text-emerald-600/60 uppercase tracking-widest mb-1 block">Current Status</span>
                                    <span className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Active User
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl translate-x-8 -translate-y-8"></div>
                                <div className="relative">
                                    <span className="text-xs font-black text-blue-600/60 uppercase tracking-widest mb-1 block">Account Plan</span>
                                    <span className="text-2xl font-black text-slate-900">Professional</span>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent"></div>
                                <div className="relative flex flex-col gap-4">
                                    <Calendar className="text-3xl text-violet-400" />
                                    <div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block text-left">Member Since</span>
                                        <span className="text-xl font-bold text-white block text-left">
                                            {account?.createdAt ? new Date(account.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Joining..."}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
