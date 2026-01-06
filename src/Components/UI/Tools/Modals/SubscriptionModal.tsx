import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useFlutterwavePayment } from "../../../../States/hoooks/useFlutterwavePayment";
import { useAppSelector } from "../../../../States/hoooks/hook";
import { Diamond, CheckCircle } from "react-huge-icons/solid";

interface SubscriptionModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, toggle }) => {
  const { account } = useAppSelector((state) => state.userSlice);
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');

  const { handleFlutterPayment } = useFlutterwavePayment({
    amount: planType === 'monthly' ? 4.5 : 45,
    email: account?.email || "",
    name: account?.businessName || account?.name || "User",
    currency: "USD",
    planType: planType,
    title: "PRO UPGRADE",
    description: `Upgrade to PRO ${planType} plan`,
  });

  const triggerPayment = () => {
    console.log("SubscriptionModal: Triggering payment", { 
        planType, 
        amount: planType === 'monthly' ? 4.5 : 45,
        email: account?.email
    });
    handleFlutterPayment({});
  };

  const plans = [
    {
      type: 'monthly',
      price: '$4.5',
      duration: 'per month',
      features: [
        "Unlimited Client Relationships",
        "Integrated Payment Processing",
        "Recurring Invoices (Set & Forget)",
        "Auto-Pursuing (Smart Follow-ups)",
        "Smart Tax & Discounts",
        "Real-time Invoice Chat"
      ]
    },
    {
      type: 'yearly',
      price: '$45',
      duration: 'per year',
      savings: "Save 16%",
      features: [
        "Everything in Monthly",
        "2 Months Free",
        "Beta Access to New Features",
        "Custom Email Templates"
      ]
    }
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg" className="subscription-modal">
        <ModalHeader toggle={toggle} className="border-none pb-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                    <Diamond className="text-xl" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">Upgrade to Pro</h3>
                    <p className="text-sm font-medium text-slate-500">Scale your business with professional tools.</p>
                </div>
            </div>
        </ModalHeader>
      <ModalBody className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {plans.map((p) => (
            <div 
                key={p.type}
                onClick={() => setPlanType(p.type as 'monthly' | 'yearly')}
                className={`flex-1 p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                    planType === p.type 
                    ? "border-violet-600 bg-violet-50/30 shadow-xl shadow-violet-100" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
            >
              {p.savings && (
                  <span className="absolute top-4 right-[-32px] bg-emerald-500 text-white text-[10px] font-black px-10 py-1 rotate-45 shadow-sm uppercase tracking-widest">
                      {p.savings}
                  </span>
              )}

              <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${planType === p.type ? "text-violet-600" : "text-slate-400"}`}>
                      {p.type}
                  </span>
                  {planType === p.type && <CheckCircle className="text-violet-600 text-xl" />}
              </div>

              <div className="mb-6">
                <h4 className="text-4xl font-black text-slate-900">{p.price}</h4>
                <p className="text-slate-500 text-sm font-bold">{p.duration}</p>
              </div>

              <div className="space-y-3 mb-8">
                {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <CheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
                        <span>{f}</span>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4">
            <Button 
                onClick={triggerPayment}
                className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-2xl shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-1 border-none"
            >
                Upgrade Now with Flutterwave
            </Button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Secure payment powered by Flutterwave
            </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SubscriptionModal;
