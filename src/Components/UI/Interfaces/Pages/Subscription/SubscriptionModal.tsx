import React from "react";
import { RemoveCircle, CheckMarkCircle, Diamond, Repeat, Star } from "react-huge-icons/solid";
// import { useNavigate } from "react-router-dom";
import { useFlutterwavePayment } from "../../../../../States/hoooks/useFlutterwavePayment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../States/store";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [plan, setPlan] = React.useState<'monthly' | 'yearly'>('monthly');

  const { account } = useSelector((state: RootState) => state.userSlice);
  const email = account?.email || account?.Email;
  const name = account?.Firstname ? `${account.Firstname} ${account.Lastname || ''}` : "John Doe";

  const config = {
    amount: plan === 'monthly' ? 4.5 : 48.6,
    email: email || "user@example.com", 
    name: name,
    payment_plan: plan === 'monthly' 
        ? import.meta.env.VITE_FLUTTERWAVE_MONTHLY_PLAN_ID 
        : import.meta.env.VITE_FLUTTERWAVE_YEARLY_PLAN_ID,
    planType: plan
  };
  
  const { handleFlutterPayment } = useFlutterwavePayment(config);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in transition-all">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden animate-scale-up flex flex-col max-h-[85vh]">
        
        {/* Header - Ultra Compact */}
        <div className="relative bg-gradient-to-r from-violet-600 to-indigo-700 p-4 text-left flex items-center justify-between flex-shrink-0">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            
            <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 shadow-sm">
                    <Diamond className="text-xl text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-black text-white tracking-tight leading-none">
                        Upgrade to PRO
                    </h2>
                    <p className="text-violet-100/90 text-xs font-medium leading-tight mt-0.5">
                        Unlock automation tools.
                    </p>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="relative z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all"
            >
                <RemoveCircle className="text-lg" />
            </button>
        </div>

        {/* Plan Toggle */}
        <div className="px-4 pt-4 flex justify-center">
            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 shadow-inner">
                <button 
                    onClick={() => setPlan('monthly')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${plan === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Monthly ($4.50)
                </button>
                <button 
                    onClick={() => setPlan('yearly')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${plan === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Yearly ($48.60) <span className="text-[9px] text-green-600 ml-1 bg-green-100 px-1 rounded-full">-10%</span>
                </button>
            </div>
        </div>

        {/* Scrollable Content - Ultra Compact Grid */}
        <div className="p-4 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-violet-50/50 border border-violet-100/50">
              <div className="text-violet-600 mt-0.5"><Repeat className="text-lg" /></div>
              <div>
                <h3 className="text-slate-900 font-bold text-sm mb-0">Recurring Invoices</h3>
                <p className="text-slate-500 text-[11px] leading-snug">Automate weekly/monthly billing.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-pink-50/50 border border-pink-100/50">
              <div className="text-pink-600 mt-0.5"><Diamond className="text-lg" /></div>
              <div>
                <h3 className="text-slate-900 font-bold text-sm mb-0">Auto-Chasing</h3>
                <p className="text-slate-500 text-[11px] leading-snug">Auto-reminders for overdue revenue.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/50 border border-sky-100/50">
              <div className="text-sky-600 mt-0.5"><Star className="text-lg" /></div>
              <div>
                <h3 className="text-slate-900 font-bold text-sm mb-0">Smart Settings</h3>
                <p className="text-slate-500 text-[11px] leading-snug">Auto-applied Tax & Payment terms.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100/50">
              <div className="text-amber-600 mt-0.5"><Diamond className="text-lg" /></div>
              <div>
                <h3 className="text-slate-900 font-bold text-sm mb-0">Premium Templates</h3>
                 <p className="text-slate-500 text-[11px] leading-snug">Professional layouts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Ultra Compact */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
                 <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                        {plan === 'monthly' ? '$4.50' : '$48.60'}
                    </span>
                    <span className="text-slate-500 font-bold text-[10px] uppercase">
                        {plan === 'monthly' ? '/ month' : '/ year'}
                    </span>
                 </div>
                 <div className="bg-green-100 px-2.5 py-1 rounded-full border border-green-200">
                    <span className="text-green-700 text-[10px] font-bold flex items-center gap-1">
                        <CheckMarkCircle className="text-[10px]" /> Cancel anytime
                    </span>
                 </div>
            </div>
            
            <button
              onClick={() => {
                handleFlutterPayment({
                    callback: () => {
                       // Handled in Hook
                       onClose();
                    },
                    onClose: () => {
                       console.log("Payment Closed");
                    }
                });
              }}
              className="w-full py-3 bg-slate-900 hover:bg-violet-600 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              Get PRO Access Now
              <CheckMarkCircle className="text-base" />
            </button>
        </div>

      </div>
    </div>
  );
};


export default SubscriptionModal;
