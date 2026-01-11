import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useFlutterwavePayment, FlutterwaveResponse } from "../../../../States/hoooks/useFlutterwavePayment";
import { useAppSelector, useAppDispatch } from "../../../../States/hoooks/hook";
import { Diamond, CheckCircle } from "react-huge-icons/solid";
import { API_URL } from "../../../constants/Index";
import { toast } from "react-toastify";
import { setUser } from "../../../../States/Slices/ClientSlice/useAuth/user";

interface SmsTopupModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const SmsTopupModal: React.FC<SmsTopupModalProps> = ({ isOpen, toggle }) => {
  const { account } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [selectedBundle, setSelectedBundle] = useState<number>(100);

  const bundles = [
    { credits: 50, price: 2.5, label: "Starter" },
    { credits: 100, price: 4.5, label: "Pro", popular: true },
    { credits: 500, price: 20, label: "Enterprise", savings: "10% OFF" }
  ];

  const currentBundle = bundles.find(b => b.credits === selectedBundle) || bundles[1];

  const handleTopupSuccess = async (response: FlutterwaveResponse) => {
    try {
      const res = await fetch(`${API_URL}/api/account/sms/topup`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          credits: selectedBundle,
          tx_ref: response.tx_ref,
          amount: currentBundle.price
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.response);
        if (account) {
            dispatch(setUser({ ...account, smsBalance: (account.smsBalance || 0) + selectedBundle }));
        }
        toggle();
      } else {
        toast.error(data.response || "Top-up failed to sync");
      }
    } catch (e) {
      console.error("Topup Sync Error:", e);
      toast.error("Failed to sync top-up with server");
    }
  };

  const { handleFlutterPayment } = useFlutterwavePayment({
    amount: currentBundle.price,
    email: account?.email || "",
    name: account?.businessName || account?.name || "User",
    currency: "USD",
    type: 'topup',
    title: "SMS Top-Up",
    description: `Purchase ${currentBundle.credits} SMS credits`,
    onSuccess: handleTopupSuccess
  });

  const triggerPayment = () => {
    handleFlutterPayment({});
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg" className="subscription-modal" zIndex={99999}>
        <ModalHeader toggle={toggle} className="border-none pb-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Diamond className="text-xl" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">SMS Credits Top-Up</h3>
                    <p className="text-sm font-medium text-slate-500">Keep your notifications running smoothly.</p>
                </div>
            </div>
        </ModalHeader>
      <ModalBody className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bundles.map((b) => (
            <div 
                key={b.credits}
                onClick={() => setSelectedBundle(b.credits)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center ${
                    selectedBundle === b.credits 
                    ? "border-emerald-600 bg-emerald-50/30 shadow-xl shadow-emerald-100" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
            >
              {b.savings && (
                  <span className="absolute top-2 right-[-25px] bg-amber-500 text-white text-[8px] font-black px-8 py-0.5 rotate-45 shadow-sm uppercase tracking-widest">
                      {b.savings}
                  </span>
              )}

              <div className="mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedBundle === b.credits ? "text-emerald-600" : "text-slate-400"}`}>
                      {b.label} Bundle
                  </span>
              </div>

              <div className="mb-4">
                <h4 className="text-3xl font-black text-slate-900">{b.credits}</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">Credits</p>
              </div>

              <div className="mt-auto">
                  <span className="text-lg font-black text-slate-900">${b.price}</span>
              </div>

              {selectedBundle === b.credits && (
                  <div className="absolute top-3 right-3">
                      <CheckCircle className="text-emerald-600 text-lg" />
                  </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4">
            <Button 
                onClick={triggerPayment}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 border-none"
            >
                Purchase {selectedBundle} Credits
            </Button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Credits are added instantly after payment
            </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SmsTopupModal;
