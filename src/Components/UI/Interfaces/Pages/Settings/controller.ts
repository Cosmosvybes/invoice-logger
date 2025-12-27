import { useEffect, useState } from "react";
import { getUser, updateSettings, updatePayout } from "../../../../../States/Slices/invoice";
import { setIsAuthenticated } from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export interface SchemaField {
      id: number;
      type: string;
      name: string;
      value: string | boolean;
      label: string;
      options?: string[];
      disabled?: boolean;
}

export default function useSettingsController() {
  const { settings, payout } = useAppSelector((state) => state.invoice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsAuthenticated());
  }, []);

  // Sync settings with current payout data on load or when payout changes
  useEffect(() => {
    if (payout?.bank_name) dispatch(updateSettings({ key: "bankName", value: payout.bank_name }));
    if (payout?.account_number) dispatch(updateSettings({ key: "accountNumber", value: payout.account_number }));
    if (payout?.account_name) dispatch(updateSettings({ key: "accountName", value: payout.account_name }));
  }, [payout]);

  /* New State for Banks */
  const [banks, setBanks] = useState<{ id: number; code: string; name: string }[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
        setLoadingBanks(true);
        try {
            const res = await fetch("https://ether-bill-server-1.onrender.com/api/payout/banks?country=NG", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await res.json();
            if(res.ok && Array.isArray(data.data)) {
                setBanks(data.data.map((b: any) => ({ id: b.id, code: b.code, name: b.name })));
            } else {
                console.warn("Bank fetch error or invalid data format:", data.response || "No data");
            }
        } catch (e) {
            console.error("Failed to fetch banks", e);
        } finally {
            setLoadingBanks(false);
        }
    };
    fetchBanks();
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

  // Dynamic Payout Schema
  const [payoutSchema, setPayoutSchema] = useState<SchemaField[]>([
    {
      id: 201,
      type: "select",
      name: "bankName",
      value: "",
      label: "Bank Name",
      options: []
    },
    {
      id: 202,
      type: "text",
      name: "accountNumber",
      value: "",
      label: "Account Number",
    },
    {
      id: 203,
      type: "text",
      name: "accountName",
      value: "",
      label: "Account Name (Verified Automatically)",
      disabled: true
    },
  ]);



  // Auto-resolve account name when Bank and Number are present
  useEffect(() => {
     const resolveAccount = async () => {
         const bankName = settings['bankName'] as string; 
         const accountNumber = settings['accountNumber'] as string;
         
         // Only proceed if we have a bank, and account number is 10 digits
         if(bankName && accountNumber && typeof accountNumber === 'string' && accountNumber.length === 10) {
             const selectedBank = banks.find(b => b.name === bankName);
             if(!selectedBank) return;

             console.log("Attempting resolution for:", bankName, accountNumber, selectedBank);

             try {
                // Show verifiable feedback
                toast.info("Verifying...", { autoClose: 1000, toastId: "verifying" });
                
                const res = await fetch("https://ether-bill-server-1.onrender.com/api/payout/resolve", {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        account_number: accountNumber,
                        bank_code: selectedBank.code
                    })
                });
                const data = await res.json();
                console.log("Resolution Response:", data);

                if(res.ok) {
                    dispatch(updateSettings({ key: "accountName", value: data.data.account_name }));
                    toast.success("Verified: " + data.data.account_name);
                } else {
                    console.warn("Verification failed", data.response);
                    toast.error(data.response || "Verification failed");
                    dispatch(updateSettings({ key: "accountName", value: "" })); 
                }
             } catch (e: any) {
                 console.error("Resolve error", e);
                 toast.error("Network Error: " + e.message);
             }
         }
     }
     
     // Debounce could be good, but for now just run on change
     // If we had a useDebounce hook, we'd use it.
     // Check if we have useDebounce.ts in hooks? Yes we do! 
     // But let's keep it simple for now to avoid extensive rewrites.
     // useEffect dependency array handles changes. 
     
     const timer = setTimeout(() => {
        resolveAccount();
     }, 1000); // 1s debounce

     return () => clearTimeout(timer);
  }, [settings['bankName'], settings['accountNumber'], banks]);

  useEffect(() => {
     if(banks.length > 0) {
         setPayoutSchema(prev => prev.map(field => {
             if(field.name === 'bankName') {
                 return { ...field, options: banks.map(b => b.name) };
             }
             return field;
         }));
     }
  }, [banks]);

  const values = [
    ...settingsSchema,
    ...personalizationSchema,
    ...subscriptionSchema,
    ...businessDetails,
    ...payoutSchema,
  ].reduce(
    (acc, curr) => {
        let val = curr.value;
        // Override with saved payout data if available
        if (curr.name === "bankName" && payout?.bank_name) val = payout.bank_name;
        if (curr.name === "accountNumber" && payout?.account_number) val = payout.account_number;
        if (curr.name === "accountName" && payout?.account_name) val = payout.account_name;
        
        return {
            ...acc,
            [curr.name]: val,
        };
    },
    {}
  );

  const [fieldsValue] = useState(values);
  const handleChange = (fieldName: string, newValue: string | boolean) => {
    dispatch(updateSettings({ key: fieldName, value: newValue }));
  };

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const handleSubmit = async (activeTab?: string) => {
    setLoading(true);
    try {
      // Check if we are saving Payout Settings (simplistic check: if bankName is present in settings and valid)
      // Since `settings` contains ALL fields, we need to know what we are submitting.
      // Ideally we pass `activeTab` to this function. 
      // For now, let's assume if it is a payout update if 'bankName' and 'accountNumber' are changed?
      // Better: we can inspect the payload or just handle split logic.
      
      // But wait! `settings` is global state.
      // If we are strictly on Payout tab, we might want to trigger the Payout Setup endpoint.
      
      // Let's implement a specific check or dedicated function.
      // But adhering to the existing structure:
      
      let url = "https://ether-bill-server-1.onrender.com/api/account/settings";
      let body: any = { ...settings };

      const bankName = settings['bankName']; 
      if (bankName && activeTab === 'payout') {
          // Check if anything actually changed compared to current payout
          if (settings['bankName'] === payout?.bank_name && 
              settings['accountNumber'] === payout?.account_number) {
              toast.info("Account already verified and connected.");
              setLoading(false);
              return;
          }

          url = "https://ether-bill-server-1.onrender.com/api/payout/setup";
          const selectedBank = banks.find(b => b.name === bankName);
          body = {
              bank_code: selectedBank ? selectedBank.code : "",
              account_number: settings['accountNumber'],
              business_name: settings['businessName'], // Optional
              business_email: "", // User email from token will be used
              country: "NG"
          };
      }

      const response_ = await fetch(
        url,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response_.ok) {
        setLoading(false);
        const err = await response_.json();
        // Show specific error from backend if available (e.g. FW error)
        throw new Error(err.error || err.response || err.message || "Operation failed");
      }
      const resData = await response_.json();
      toast.success(resData.response, { theme: "light" });
      
      // Update the payout state immediately if it was a payout setup
      if (url.includes("payout/setup") && resData.data) {
          dispatch(updatePayout(resData.data));
      }
      
      // Reload logic or update state if needed
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
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
    payoutSchema,
    payout,
    loading,
    loadingBanks,
  };
}
