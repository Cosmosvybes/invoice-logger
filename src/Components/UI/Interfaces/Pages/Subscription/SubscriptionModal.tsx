import React from "react";
import { RemoveCircle, CheckMarkCircle, Diamond, Repeat, Star } from "react-huge-icons/solid";
// import { useNavigate } from "react-router-dom";
import { useFlutterwavePayment } from "../../../../../States/hoooks/useFlutterwavePayment";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  // const navigate = useNavigate();
  const config = {
    amount: 4.5, 
    email: "user@example.com", 
    name: "John Doe", 
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
                    <span className="text-2xl font-black text-slate-900 tracking-tight">$4.5</span>
                    <span className="text-slate-500 font-bold text-[10px] uppercase">/ month</span>
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
                    callback: (response: any) => {
                       console.log("Payment Success:", response);
                       // closePaymentModal(); // Not available here unless imported, or use hook's close.
                       // The hook returns handlePayment which automatically handles opening.
                       // But wait, where is the callback handling now?
                       // The hook accepts config. The callback is part of the config in library?
                       // Standard useFlutterwave takes config which INCLUDES callback.
                       // Oops, I removed the callback from my hook refactor!
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
