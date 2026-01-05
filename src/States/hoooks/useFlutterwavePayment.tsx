import React from "react";
import { useFlutterwave } from "flutterwave-react-v3";
import { API_URL } from "../../Components/constants/Index";

export interface FlutterwaveResponse {
  status: string;
  transaction_id: number;
  tx_ref: string;
  flw_ref: string;
  charge_response_code: string;
  charge_response_message: string;
  amount: number;
  currency: string;
  charged_amount: number;
  card?: {
    first_6digits: string;
    last_4digits: string;
    issuer: string;
    country: string;
    type: string;
    expiry: string;
  };
  customer?: {
    name: string;
    email: string;
    phone_number: string;
  };
}

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
  currency?: string;
  subaccounts?: { id: string; transaction_charge?: number; transaction_charge_type?: string }[];
}

export const useFlutterwavePayment = (paymentProps: FlutterwavePaymentProps) => {
  const tx_ref = React.useMemo(() => `SUB_${paymentProps.email.split('@')[0]}_${Date.now()}`, [paymentProps.email]);
  
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: tx_ref,
    currency: paymentProps.currency || "USD",
    payment_options: "card,mobilemoney,ussd",
    amount: paymentProps.amount,
    payment_plan: paymentProps.payment_plan, 
    subaccounts: paymentProps.subaccounts,
    customer: {
      email: paymentProps.email,
      phone_number: paymentProps.phone_number || "",
      name: paymentProps.name,
    },
    customizations: {
      title: paymentProps.title || "STEADYBILL PRO",
      description: paymentProps.description || "Subscription for Invoice Logger PRO",
      logo: paymentProps.logo || "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },

    callback: async (response: FlutterwaveResponse) => {
      console.log("Payment Success callback triggered:", response);
      
      // Call Backend to Upgrade User
      if (response.status === "successful") {
          try {
              const token = localStorage.getItem("token");
              const res = await fetch(`${API_URL}/api/subscription/upgrade`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({
                      planType: paymentProps.planType || 'monthly',
                      tx_ref: response.tx_ref
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

  const wrappedHandlePayment = (params: any) => {
    console.log("Triggering Flutterwave with config:", config);
    if (!config.public_key) {
      console.error("CRITICAL: Flutterwave Public Key is MISSING in environment variables!");
    }
    handlePayment(params);
  };

  return { handleFlutterPayment: wrappedHandlePayment };
};
