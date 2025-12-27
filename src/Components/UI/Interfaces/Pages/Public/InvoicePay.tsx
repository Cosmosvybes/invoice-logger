import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlutterwavePayment } from "../../../../../States/hoooks/useFlutterwavePayment";
import { Spinner } from "reactstrap";
import { CheckMarkCircle, Diamond } from "react-huge-icons/solid";
import { Invoice } from "../../../../../States/Slices/invoice.types";
import { API_URL } from "../../../../../Components/constants/Index";

interface MerchantInfo {
    businessName: string;
    email: string;
    payout: {
        subaccount_id: string;
        bank_name: string;
        account_name: string;
        verified: boolean;
    }
}

const InvoicePay = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [merchant, setMerchant] = useState<MerchantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/invoice/${id}`);
        if (!res.ok) throw new Error("Invoice not found");
        const data = await res.json();
        setInvoice(data.invoice);
        setMerchant(data.merchant);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInvoice();
  }, [id]);

  // Handle Payment
  const paymentProps = {
      amount: invoice ? Number(invoice.TOTAL) : 0,
      email: "guest@client.com", // Ideally we ask for client email or use invoice.clientEmail if available
      name: invoice?.Client || "Client",
      title: `Invoice #${invoice?.id}`,
      description: `Payment for ${merchant?.businessName}`,
      logo: "", // Merchant Logo if available
      subaccounts: merchant?.payout?.subaccount_id ? [
          {
              id: merchant.payout.subaccount_id,
              transaction_charge_type: "flat", // or percentage
              transaction_charge: 0 // Platform fee if we want
          }
      ] : undefined
  };

  const { handleFlutterPayment } = useFlutterwavePayment(paymentProps);


  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner color="primary" /></div>;
  if (error || !invoice) return (
      <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
          <Diamond className="text-4xl text-red-500 mb-2" />
          <h2 className="text-xl font-bold text-slate-800">Invoice Not Found</h2>
          <p className="text-slate-500">The invoice link might be invalid or expired.</p>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Left: Invoice Details */}
        <div className="w-full md:w-3/5 p-8 bg-white border-r border-slate-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pay to</p>
                     <h2 className="text-xl font-extrabold text-slate-900">{merchant?.businessName || "Merchant"}</h2>
                     {merchant?.payout?.verified && <span className="text-green-500 text-xs flex items-center gap-1"><CheckMarkCircle className="w-3 h-3"/> Verified Merchant</span>}
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice</p>
                    <h3 className="text-lg font-mono font-bold text-slate-700">#{invoice.id}</h3>
                    <p className="text-xs text-slate-500">{invoice.DateIssued}</p>
                </div>
            </div>

            <div className="mb-8">
                 <p className="text-sm text-slate-500 mb-2">Billed to</p>
                 <h4 className="font-bold text-slate-800">{invoice.Client || "Client"}</h4>
                 <p className="text-sm text-slate-500">{invoice.clientEmail || ""}</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-sm text-slate-500">Total Amount</span>
                     <span className="text-3xl font-extrabold text-slate-900">
                        {invoice.currency} {Number(invoice.TOTAL).toLocaleString()}
                     </span>
                 </div>
                 <p className="text-xs text-slate-400">Due Date: {invoice.DateDue}</p>
            </div>
        </div>

        {/* Right: Payment Action */}
        <div className="w-full md:w-2/5 p-8 bg-slate-50/50 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                 <Diamond className="text-3xl text-green-600" />
            </div>
            
            <h3 className="font-bold text-slate-800 mb-2">Secure Payment</h3>
            <p className="text-xs text-slate-500 mb-6 px-4">
                You are paying <strong>{merchant?.businessName || "the Merchant"}</strong> securely via Flutterwave.
            </p>

            <button
                onClick={() => handleFlutterPayment({
                    callback: async (response) => {
                       console.log(response);
                       if(response.status === "successful") {
                           // Call Backend to Verify and Mark as Paid
                           try {
                               const res = await fetch(`${API_URL}/api/public/invoice/verify`, {
                                   method: "POST",
                                   headers: { "Content-Type": "application/json" },
                                   body: JSON.stringify({
                                       invoiceId: invoice?.id,
                                       transactionId: response.transaction_id
                                   })
                               });
                               const data = await res.json();
                               if (res.ok) {
                                   alert("Payment Successful! Receipt sent to your email.");
                                   // Optional: Refresh page or show success state
                               } else {
                                   alert("Payment recorded, but verification failed: " + data.response);
                               }
                           } catch (err) {
                               console.error(err);
                               alert("Payment successful, but failed to reach server for verification.");
                           }
                       }
                    },
                    onClose: () => {}
                })}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all transform active:scale-[0.98]"
            >
                Pay Now
            </button>
            
            <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Secured by Flutterwave</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default InvoicePay;
