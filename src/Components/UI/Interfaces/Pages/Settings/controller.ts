import { useEffect, useState } from "react";
import { getUser, updateSettings } from "../../../../../States/Slices/invoice";
import { setIsLoggedIn } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useSettingsController() {
  const { settings } = useAppSelector((state) => state.invoice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);

  const [settingsSchema] = useState([
    {
      id: 13,
      type: "switch",
      name: "tokenBalanceNotification",
      value: false,
      label: "enable/disbale token balance notification",
    },

    {
      id: 17,
      type: "switch",
      name: "invoiceSentNotication",
      value: true,
      label: "enable/disbale invoice sent notification",
    },
  ]);

  const [personalizationSchema] = useState([
    {
      id: 10,
      type: "switch",
      name: "defaultCurrency",
      value: true,
      label: "default currency usd",
    },
    {
      id: 11,
      type: "switch",
      name: "applyTax",
      value: true,
      label: "apply tax to invoices",
    },
    {
      id: 15,
      type: "switch",
      name: "defaultPaymentTerms",
      value: false,
      label: "30 days default payment term",
    },

    {
      id: 64,
      type: "switch",
      name: "revenueNotification",
      value: false,
      label: "enable/disbale revenue notifications",
    },
  ]);
  const [subscriptionSchema] = useState([
    {
      id: 186,
      type: "switch",
      name: "sharingToken",
      value: false,
      label: "enable/disable token sharing",
    },
    {
      id: 19,
      type: "switch",
      name: "autoRenewal",
      value: false,
      label: "subscription auto-renewal",
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
      label: "business address",
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

  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
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
        throw new Error("Operation failed");
      }
      const { response } = await response_.json();
      toast.success(response, { theme: "light" });
    } catch (error: any) {
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
  };
}
