import { useFlutterwave } from "flutterwave-react-v3";

interface FlutterwavePaymentProps {
  amount: number;
  email: string;
  name: string;
  phone_number?: string;
  title?: string;
  description?: string;
  logo?: string;
}

export const useFlutterwavePayment = (paymentProps: FlutterwavePaymentProps) => {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: Date.now().toString(),
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    amount: paymentProps.amount,
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
  };

  const handlePayment = useFlutterwave(config);

  return { handleFlutterPayment: handlePayment };
};
