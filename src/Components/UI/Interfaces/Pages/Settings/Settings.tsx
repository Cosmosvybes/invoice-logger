import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useState } from "react";
import { User, Setting as SettingsIcon, MoneyBagDollar } from "react-huge-icons/outline";
const Settings = () => {
  const {
    settingsSchema,
    personalizationSchema,
    fieldsValue,
    subscriptionSchema,
    businessDetails,
    settings,
    handleChange,
    handleSubmit,
    loading,
  } = useSettingsController();

  const [activeTab, setActiveTab] = useState("profile");

  const TABS = [
    { id: "profile", label: "Profile & Account", icon: <User className="text-xl" /> },
    { id: "preferences", label: "Preferences", icon: <SettingsIcon className="text-xl" /> },
    { id: "subscription", label: "Subscription", icon: <MoneyBagDollar className="text-xl" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={[...settingsSchema, ...businessDetails]}
            data={fieldsValue}
            title="Profile & Account Info"
            handleChange={handleChange}
          />
        );
      case "preferences":
        return (
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={personalizationSchema}
            data={fieldsValue}
            title="User Preferences"
            handleChange={handleChange}
          />
        );
      case "subscription":
        return (
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={subscriptionSchema}
            data={fieldsValue}
            title="Subscription Management"
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative w-full h-full min-h-screen px-4 md:px-12 py-6">
        <BreadCrumb title="Settings" useLink={false} linkTitle="" />
        
        <div className="relative w-full mt-8 flex flex-col lg:flex-row gap-8 animate-fade-in-up max-w-6xl mx-auto">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menu</h3>
                </div>
                <nav className="flex flex-col p-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-violet-50 text-violet-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>
             </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
              {renderContent()}

             <div className="relative w-full flex justify-end items-center mt-6">
                <button
                    className="relative px-6 py-3 rounded-xl bg-violet-600 text-white font-bold shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm transform active:scale-95"
                    onClick={handleSubmit}
                >
                    {loading && (
                    <Spinner type="grow" color="light" size="sm" className="mr-2" />
                    )}
                    Save Changes
                </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default withAuth(Settings);
