import { useFlutterwavePayment } from "../../../../../../States/hoooks/useFlutterwavePayment";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";
import { CheckMarkCircle, Diamond, Star } from "react-huge-icons/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../States/store";
import { toast } from "react-toastify";
import { useState } from "react";



type CurrencyCode = 'NGN' | 'USD';

const PRICING = {
    NGN: { amount: 2999, symbol: '₦', label: 'NGN' },
    USD: { amount: 11.99, symbol: '$', label: 'USD' }
};

function Payment() {
  // Get email from Redux state
  const { email } = useSelector((state: RootState) => state.invoice);
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  
  const currentPrice = PRICING[currency];
  /* Flutterwave Hook */
  const { handleFlutterPayment } = useFlutterwavePayment({
      amount: currentPrice.amount,
      email: email || "user@example.com", // Fallback if email missing
      name: email || "Valued User",
      currency: currency,
      title: "Etherbill PRO Subscription",
      description: `Monthly subscription for ${currency} ${currentPrice.amount}`,
      planType: 'monthly',
      logo: "https://ether-bill.onrender.com/logo.png" // Update with real logo url if available
  });

  const handlePayment = () => {
    if (!email) {
      toast.error("User email not found. Please reload or contact support.");
      return;
    }
    handleFlutterPayment({
        callback: (response: any) => {
           console.log(response);
           // ... rest of code
        },
        onClose: () => {
            console.log("Payment closed");
        }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Left Side: Summary */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-slate-50 border-r border-slate-100 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Order Summary</h2>
                <p className="text-slate-500 mb-8">Upgrade your workspace to Pro.</p>

                {/* Currency Selector */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1">
                        <Diamond className="text-sm" /> Select Currency
                    </label>
                    <div className="flex bg-white rounded-lg border border-slate-200 p-1 w-fit shadow-sm">
                        <button 
                            onClick={() => setCurrency('NGN')}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'NGN' ? 'bg-violet-100 text-violet-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            NGN (₦)
                        </button>
                        <button 
                            onClick={() => setCurrency('USD')}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'USD' ? 'bg-violet-100 text-violet-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            USD ($)
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="p-2 bg-violet-100 rounded-lg">
                            <Star className="text-violet-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Pro Subscription</h3>
                            <p className="text-xs text-slate-500">Monthly Plan</p>
                        </div>
                        <div className="ml-auto font-mono font-bold text-slate-900">
                             {currentPrice.symbol}{currentPrice.amount.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-mono">{currentPrice.symbol}{currentPrice.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Tax</span>
                        <span className="font-mono">{currentPrice.symbol}0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-2">
                        <span>Total</span>
                        <span className="font-mono text-violet-600">{currentPrice.symbol}{currentPrice.amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                <CheckMarkCircle className="text-lg" />
                <span>Secure 256-bit SSL encrypted payment.</span>
            </div>
        </div>

        {/* Right Side: Payment Action */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto bg-violet-100 rounded-full flex items-center justify-center mb-6">
                    <Diamond className="text-3xl text-violet-600" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Payment</h3>
                <p className="text-slate-500 text-sm mb-4 px-4">
                    You all be redirected to Flutterwave's secure gateway.
                </p>

                <button
                    onClick={handlePayment}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
                >
                    <CheckMarkCircle className="text-lg text-green-400" />
                    <span>Pay {currentPrice.symbol}{currentPrice.amount.toLocaleString()} Securely</span>
                </button>
                
                <div className="mt-6 flex flex-col items-center gap-2">
                    <p className="text-xs text-slate-400">Powered by</p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/cf/cf/Flutterwave_Logo.png" alt="Flutterwave" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Payment);
