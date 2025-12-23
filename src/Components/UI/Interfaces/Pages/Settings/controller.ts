import { useEffect, useState } from "react";
import { getUser, updateSettings } from "../../../../../States/Slices/invoice";
import { setIsAuthenticated } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useSettingsController() {
  const { settings } = useAppSelector((state) => state.invoice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsAuthenticated());
  }, []);

  const [settingsSchema] = useState([
    {
      id: 13,
      type: "switch",
      name: "tokenBalanceNotification",
      value: false,
      label: "Balance notification",
    },

    {
      id: 17,
      type: "switch",
      name: "invoiceSentNotication",
      value: true,
      label: "Invoice notification",
    },
  ]);

  const [personalizationSchema] = useState([
    {
      id: 10,
      type: "select",
      name: "defaultCurrency",
      value: "USD",
      label: "Account Default Currency",
      options: ["USD", "NGN", "EUR", "GBP", "KWT", "CAD", "AUD"],
    },
    {
      id: 11,
      type: "switch",
      name: "applyTax",
      value: true,
      label: "Apply tax to invoices",
    },
    {
      id: 15,
      type: "switch",
      name: "defaultPaymentTerms",
      value: false,
      label: "30 days default payment",
    },

    {
      id: 64,
      type: "switch",
      name: "revenueNotification",
      value: false,
      label: "Enable revenue notification",
    },
    {
      id: 99,
      type: "switch",
      name: "autoChase",
      value: false,
      label: "Enable Auto-Chasing (Daily Reminders)",
    },
  ]);
  const [subscriptionSchema] = useState([
    {
      id: 186,
      type: "switch",
      name: "sharingToken",
      value: false,
      label: "Enable/disable token sharing",
    },
    {
      id: 19,
      type: "switch",
      name: "autoRenewal",
      value: false,
      label: "Subscription auto-renewal",
    },
  ]);

  const [businessDetails] = useState([
    {
      id: 71,
      type: "text",
      name: "businessName",
      value: "",
      label: "business name",
    },
    {
      id: 971,
      type: "text",
      name: "businessAddress",
      value: "",
      label: "Business address",
    },
  ]);

  const values = [
    ...settingsSchema,
    ...personalizationSchema,
    ...subscriptionSchema,
    ...businessDetails,
  ].reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: curr.value,
    }),
    {}
  );

  const [fieldsValue] = useState(values);
  const handleChange = (fieldName: string, newValue: string | boolean) => {
    dispatch(updateSettings({ key: fieldName, value: newValue }));
  };

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response_ = await fetch(
        "https://ether-bill-server-1.onrender.com/api/account/settings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ ...settings }),
        }
      );
      if (!response_.ok) {
        setLoading(false);
        throw new Error("Operation failed");
      }
      const { response } = await response_.json();
      toast.success(response, { theme: "light" });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return {
    settingsSchema,
    personalizationSchema,
    fieldsValue,
    settings,
    handleChange,
    handleSubmit,
    subscriptionSchema,
    businessDetails,
    loading,
  };
}
