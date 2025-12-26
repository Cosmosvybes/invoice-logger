import { useFlutterwave } from "flutterwave-react-v3";

interface FlutterwavePaymentProps {
  amount: number;
  email: string;
  name: string;
  phone_number?: string;
  title?: string;
  description?: string;
  logo?: string;
  payment_plan?: string;
  planType?: 'monthly' | 'yearly';
}

export const useFlutterwavePayment = (paymentProps: FlutterwavePaymentProps) => {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: Date.now().toString(),
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    amount: paymentProps.amount,
    payment_plan: paymentProps.payment_plan, // Add Plan ID
    customer: {
      email: paymentProps.email,
      phone_number: paymentProps.phone_number || "",
      name: paymentProps.name,
    },
    customizations: {
      title: paymentProps.title || "Etherbill PRO",
      description: paymentProps.description || "Subscription for Invoice Logger PRO",
      logo: paymentProps.logo || "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
    callback: async (response: any) => {
      console.log("Payment Success:", response);
      
      // Call Backend to Upgrade User
      if (response.status === "successful") {
          try {
              const token = localStorage.getItem("token");
              const res = await fetch("https://ether-bill-server-1.onrender.com/api/subscription/upgrade", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({
                      planType: paymentProps.planType || 'monthly'
                  })
              });
              
              if (res.ok) {
                  console.log("User Upgraded to PRO");
                  window.location.reload(); 
              } else {
                  console.error("Upgrade Failed", await res.text());
              }
          } catch (err) {
              console.error("Error calling upgrade endpoint", err);
          }
      }
    },
    onClose: () => {
      console.log("Payment Closed");
    },
  };

  const handlePayment = useFlutterwave(config);

  return { handleFlutterPayment: handlePayment };
};
