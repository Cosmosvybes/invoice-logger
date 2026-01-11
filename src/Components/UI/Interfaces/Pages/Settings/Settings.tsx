import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useState } from "react";
import SubscriptionModal from "../../../Tools/Modals/SubscriptionModal";
import SmsTopupModal from "../../../Tools/Modals/SmsTopupModal";

import { User, SettingShort, Diamond, Bank, LoadingDashed } from "react-huge-icons/solid";
import Overlay from "../../../Tools/Layout/Overlay";
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
    isPro,
  } = useSettingsController();

  const [activeTab, setActiveTab] = useState("profile");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);

  const TABS = [
    { id: "profile", label: "Identity", icon:User},
    { id: "preferences", label: "Prefs", icon: SettingShort},
    { id: "subscription", label: "Pro", icon: Diamond},
    { id: "payout", label: "Payout", icon: Bank},
  ];

  const renderContent = () => {
    const isPayoutConnected = !!settings.accountNumber && !!settings.bankName;

    switch (activeTab) {
      case "profile":
        return <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={businessDetails} title="Business Profile" handleChange={handleChange} />;
      case "preferences":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                        <Diamond />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900">SMS Credit Balance</h4>
                        <p className="text-sm font-bold text-slate-500">Currently have {settings.smsBalance || 0} credits</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowTopupModal(true)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-100 transform hover:-translate-y-0.5"
                >
                    Top Up Credits
                </button>
            </div>
            <InputProvider 
                settings={settings} 
                handleSubmit={() => handleSubmit(activeTab)} 
                schema={personalizationSchema} 
                title="Personalization" 
                handleChange={handleChange} 
                isPro={isPro}
                onUpgrade={() => setShowUpgradeModal(true)}
            />
            <InputProvider 
                settings={settings} 
                handleSubmit={() => handleSubmit(activeTab)} 
                schema={settingsSchema} 
                title="Global" 
                handleChange={handleChange} 
                isPro={isPro}
                onUpgrade={() => setShowUpgradeModal(true)}
            />
          </div>
        );
      case "subscription":
        return (
             <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Pro Features</h3>
                        <div className="mt-2 w-12 h-1 bg-violet-600 rounded-full"></div>
                    </div>
                    {isPro ? (
                        <span className="bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-violet-200">Active Plan: PRO</span>
                    ) : (
                        <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-slate-200">Active Plan: Free</span>
                    )}
                </div>
                
                <div className="p-8">
                     {!isPro ? (
                         <div className="text-center py-8">
                             <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">💎</div>
                             <h4 className="text-2xl font-black text-slate-900 mb-2">Upgrade to Pro</h4>
                             <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">Unlock unlimited invoices, custom branding, and exclusive features to power up your business.</p>
                             
                             <button 
                                onClick={() => setShowUpgradeModal(true)}
                                className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-1"
                             >
                                 Get Pro Access
                             </button>
                         </div>
                     ) : (
                         <div className="space-y-6">
                            <div className="bg-violet-50 border border-violet-100 p-6 rounded-3xl flex items-start gap-4">
                                <div className="text-3xl">🎉</div>
                                <div>
                                    <h5 className="text-lg font-black text-violet-900">You are a Pro Member!</h5>
                                    <p className="text-violet-700/80 font-medium text-sm mt-1">Thank you for supporting us. You have access to all premium features.</p>
                                </div>
                            </div>
                            
                            {/* Render Schema for Auto-Renewal if needed */}
                            <InputProvider settings={settings} handleSubmit={() => handleSubmit(activeTab)} schema={subscriptionSchema} title="" handleChange={handleChange} />
                         </div>
                     )}
                </div>
             </div>
        );
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
      {loading && (
        <Overlay
          children={
            <div className="animate-spin z-10 ">
              <LoadingDashed className="text-3xl text-violet-600" />
            </div>
          }
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BreadCrumb title="Settings" useLink={false} linkTitle="" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-64">
             <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                                activeTab === tab.id ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : "text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                            <span><Icon /></span> {tab.label}
                        </button>
                    );
                })}
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

      <SubscriptionModal 
          isOpen={showUpgradeModal} 
          toggle={() => setShowUpgradeModal(!showUpgradeModal)} 
      />
      <SmsTopupModal 
          isOpen={showTopupModal} 
          toggle={() => setShowTopupModal(!showTopupModal)} 
      />
    </div>
  );
};

export default withAuth(Settings);
