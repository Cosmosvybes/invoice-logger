import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface FlutterwavePaymentProps {
  amount: number;
  email: string;
  name: string;
  phone_number?: string;
  title?: string;
  description?: string;
  logo?: string;
}

export const useFlutterwavePayment = () => {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: Date.now().toString(),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
  };

  const handleFlutterPayment = ({
    amount,
    email,
    name,
    phone_number = "",
    title = "Invoice Logger PRO",
    description = "Subscription for Invoice Logger PRO",
    logo = "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  }: FlutterwavePaymentProps) => {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handlePayment = useFlutterwave({
      ...config,
      amount,
      customer: {
        email,
        phone_number,
        name,
      },
      customizations: {
        title,
        description,
        logo,
      },
    });

    handlePayment({
      callback: (response: any) => {
        console.log("Payment Success:", response);
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {
        console.log("Payment Closed");
      },
    });
  };

  return { handleFlutterPayment };
};
