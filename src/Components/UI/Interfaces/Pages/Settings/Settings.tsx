import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useState } from "react";
import { User, Setting as SettingsIcon, Briefcase } from "react-huge-icons/outline";
import { MoneyBagDollar } from "react-huge-icons/solid";

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
    payout,
    loading,
  } = useSettingsController();

  const [activeTab, setActiveTab] = useState("profile");
  const [showPayoutForm, setShowPayoutForm] = useState(false);

  const TABS = [
    { id: "profile", label: "Identity & Business", icon: <User className="text-xl" /> },
    { id: "preferences", label: "User Preferences", icon: <SettingsIcon className="text-xl" /> },
    { id: "subscription", label: "Pro Subscription", icon: <MoneyBagDollar className="text-xl" /> },
    { id: "payout", label: "Payout Gateway", icon: <Briefcase className="text-xl text-emerald-600" /> },
  ];

  const renderContent = () => {
    const isPayoutConnected = !!payout?.account_number && !!payout?.bank_name;

    switch (activeTab) {
      case "profile":
        return (
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={businessDetails}
            title="Business Identity"
            handleChange={handleChange}
          />
        );
      case "preferences":
        return (
          <div className="space-y-8">
            <InputProvider
              settings={settings}
              handleSubmit={handleSubmit}
              schema={personalizationSchema}
              title="Personalization"
              handleChange={handleChange}
            />
            <InputProvider
              settings={settings}
              handleSubmit={handleSubmit}
              schema={settingsSchema}
              title="Global Preferences"
              handleChange={handleChange}
            />
          </div>
        );
      case "subscription":
        return (
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={subscriptionSchema}
            title="Pro Subscription Features"
            handleChange={handleChange}
          />
        );
      case "payout":
        return (
          <div className="space-y-6">
              {isPayoutConnected && (
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center justify-between animate-fade-in shadow-sm">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                               <Briefcase className="text-2xl" />
                          </div>
                          <div>
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Settlement Account</p>
                              <h4 className="text-lg font-black text-slate-900">{payout.bank_name} • {payout.account_number}</h4>
                              <p className="text-xs font-bold text-slate-500">{payout.account_name}</p>
                          </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            Verified & Connected
                        </div>
                        <button 
                            onClick={() => setShowPayoutForm(!showPayoutForm)}
                            className="text-xs font-black text-slate-400 hover:text-violet-600 transition-colors uppercase tracking-widest px-2"
                        >
                            {showPayoutForm ? "Cancel Change" : "Change Bank"}
                        </button>
                      </div>
                  </div>
              )}
              
              {(!isPayoutConnected || showPayoutForm) && (
                <div className="animate-fade-in-up">
                    <InputProvider
                        settings={settings}
                        handleSubmit={handleSubmit}
                        schema={payoutSchema}
                        title={isPayoutConnected ? "Update Settlement Gateway" : "Payout & Settlement Gateway"}
                        handleChange={handleChange}
                    />
                </div>
              )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <BreadCrumb title="Settings" useLink={false} linkTitle="" />
        
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-8">
             <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration</h3>
                </div>
                <nav className="flex flex-col p-3 gap-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-[1.02]"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            <span className={`${activeTab === tab.id ? "text-white" : "text-slate-400"}`}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
             </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0 flex flex-col gap-6">
              <div className="animate-fade-in-up">
                  {renderContent()}
              </div>

             <div className="flex justify-end items-center px-4">
                <button
                    className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-violet-600 transition-all active:scale-95 flex items-center gap-3 text-sm disabled:opacity-50"
                    onClick={() => handleSubmit(activeTab)}
                    disabled={loading}
                >
                    {loading ? (
                        <Spinner size="sm" color="light" className="mr-2" />
                    ) : (
                        <MoneyBagDollar className="text-xl" />
                    )}
                    Synchronize Changes
                </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Settings);
