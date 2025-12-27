import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useState } from "react";

const Settings = () => {
  const {
    payoutSchema,
    businessDetails,
    personalizationSchema,
    settingsSchema,
    subscriptionSchema,
    settings,
    handleChange,
    handleSubmit,
    loading,
  } = useSettingsController();

  const [activeTab, setActiveTab] = useState("profile");

  const TABS = [
    { id: "profile", label: "Identity", icon: "👤" },
    { id: "preferences", label: "Prefs", icon: "⚙️" },
    { id: "subscription", label: "Pro", icon: "💎" },
    { id: "payout", label: "Payout", icon: "🏦" },
  ];

  const renderContent = () => {
    const isPayoutConnected = !!settings.accountNumber && !!settings.bankName;

    switch (activeTab) {
      case "profile":
        return <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={businessDetails} title="Business Profile" handleChange={handleChange} />;
      case "preferences":
        return (
          <div className="space-y-8">
            <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={personalizationSchema} title="Personalization" handleChange={handleChange} />
            <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={settingsSchema} title="Global" handleChange={handleChange} />
          </div>
        );
      case "subscription":
        return <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={subscriptionSchema} title="Pro Features" handleChange={handleChange} />;
      case "payout":
        return (
          <div className="space-y-6">
              {isPayoutConnected && (
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-5">
                           <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl">🏦</div>
                           <div>
                               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Active Settlement</p>
                               <h4 className="text-lg font-black text-slate-900">{settings.bankName} • {settings.accountNumber}</h4>
                               <p className="text-sm font-bold text-slate-500">{settings.accountName}</p>
                           </div>
                      </div>
                  </div>
              )}
              <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={payoutSchema} title="Settlement Account" handleChange={handleChange} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BreadCrumb title="Settings" useLink={false} linkTitle="" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-64">
             <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                            activeTab === tab.id ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </button>
                ))}
             </div>
          </aside>
          <main className="flex-1 space-y-6">
              {renderContent()}
              <div className="flex justify-end p-4">
                <button
                    className="px-10 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-violet-600 transition-all flex items-center gap-2 disabled:opacity-50"
                    onClick={() => handleSubmit(activeTab)}
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm"/> : "Synchronize Data"}
                </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Settings);
