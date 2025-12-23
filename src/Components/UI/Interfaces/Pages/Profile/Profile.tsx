import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { Edit, User, RemoveCircle, Tick } from "react-huge-icons/outline"; // Added icons
import { useState } from "react"; // Added useState
import useSettingsController from "../Settings/controller"; // Import controller
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider"; // Import form builder
import { Spinner } from "reactstrap"; // Import Spinner

const Profile = () => {
  const { account } = useAppSelector((state) => state.userSlice);
  const [isEditing, setIsEditing] = useState(false); // Edit state

  // Destructure controller props
  const {
    fieldsValue,
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
    <>
      <div className="w-full h-full min-h-screen px-4 md:px-12 py-6">
        <BreadCrumb title="Profile" useLink={false} linkTitle="" />
        
        <div className="relative w-full mt-6 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden min-h-[500px]">
            {/* Header/Cover Area */}
            <div className="h-32 bg-slate-50 border-b border-slate-100 relative">
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
                    <div className="w-24 h-24 rounded-full bg-white p-1 border border-slate-200 shadow-sm">
                        <img
                            src={user}
                            alt="profile"
                            className="w-full h-full object-contain rounded-full bg-slate-50"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="pt-16 pb-8 px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-slate-900">{account.firstname} {account.lastname}</h2>
                        <p className="text-slate-500 font-medium">{account.email}</p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        {!isEditing ? (
                            <button 
                                onClick={handleToggleEdit} 
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                <Edit className="text-lg" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleToggleEdit} 
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-bold text-red-600 hover:bg-red-100 transition-colors shadow-sm"
                                >
                                    <RemoveCircle className="text-lg" /> Cancel
                                </button>
                                <button 
                                    onClick={onSave} 
                                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 border border-violet-600 rounded-lg text-sm font-bold text-white hover:bg-violet-700 transition-colors shadow-sm"
                                >
                                    {loading ? <Spinner size="sm"/> : <Tick className="text-lg" />} Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-8"></div>

                {!isEditing ? (
                    /* View Mode */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
                        <div>
                            <h3 className="text-center md:text-left text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Business Details</h3>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Business Name</label>
                                    <p className="text-slate-900 font-medium">{account?.settings?.businessName || "Not set"}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Business Address</label>
                                    <p className="text-slate-900 font-medium">{account?.settings?.businessAddress || "Not set"}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-center md:text-left text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Account Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm text-center">
                                    <span className="text-3xl font-bold text-slate-900 block mb-1">Active</span>
                                    <span className="text-xs text-slate-500 font-bold uppercase">Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Edit Mode - Reusing InputProvider */
                    <div className="animate-fade-in-up max-w-2xl mx-auto md:mx-0">
                         <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 justify-center md:justify-start">
                            <User className="text-violet-600" /> Update Business Information
                         </h3>
                         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <InputProvider
                                settings={settings}
                                handleSubmit={handleSubmit} // We override the button in parent
                                schema={[...businessDetails]} // Only business details for now
                                data={fieldsValue}
                                title="" // Hide default title
                                handleChange={handleChange}
                            />
                         </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
