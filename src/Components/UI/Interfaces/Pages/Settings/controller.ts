import { useEffect, useState, useCallback, useMemo } from "react";
import { updateSettings, updatePayout } from "../../../../../States/Slices/invoice";
import { useAppDispatch, useAppSelector } from "../../../../../States/hoooks/hook";
import { toast } from "react-toastify";
import { API_URL } from "../../../../../Components/constants/Index";

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
  const dispatch = useAppDispatch();
  
  // Use specialized selectors to avoid whole-state-listener issues
  const settings = useAppSelector((state) => state.invoice?.settings || {});
  const payout = useAppSelector((state) => state.invoice?.payout || {});
  const { account } = useAppSelector((state) => state.userSlice);
  const isPro = account?.plan === 'pro' || account?.plan === 'Enterprise';

  const [banks, setBanks] = useState<{ id: number; code: string; name: string }[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Data loading is handled globally by LayoutWrapper/layout.controller

  // Bank Fetching
  useEffect(() => {
    let mounted = true;
    const fetchBanks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setLoadingBanks(true);
        try {
            const res = await fetch(`${API_URL}/api/payout/banks?country=NG`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if(mounted && res.ok && Array.isArray(data.data)) {
                const mappedBanks = data.data.map((b: any) => ({ id: b.id, code: b.code, name: b.name }));
                console.log("Banks Fetched Successfully:", mappedBanks.length);
                setBanks(mappedBanks);
            }
        } catch (e) {
            console.error("Bank fetch error:", e);
        } finally {
            if (mounted) setLoadingBanks(false);
        }
    };
    fetchBanks();
    return () => { mounted = false; };
  }, []);

  const settingsSchema = useMemo(() => [
    { id: 13, type: "switch", name: "tokenBalanceNotification", value: false, label: "Balance notification" },
    { id: 17, type: "switch", name: "invoiceSentNotication", value: true, label: "Invoice notification" },
  ], []);

  const personalizationSchema = useMemo(() => [
    { id: 10, type: "select", name: "defaultCurrency", value: "USD", label: "Account Default Currency", options: ["USD", "NGN", "EUR", "GBP"] },
    { id: 11, type: "switch", name: "applyTax", value: true, label: "Apply tax to invoices", gated: true },
    { id: 15, type: "switch", name: "defaultPaymentTerms", value: false, label: "30 days default payment" },
    { id: 64, type: "switch", name: "revenueNotification", value: false, label: "Enable revenue notification" },
  ], []);

  const subscriptionSchema = useMemo(() => [
    { id: 186, type: "switch", name: "sharingToken", value: false, label: "Enable/disable token sharing" },
    { id: 19, type: "switch", name: "autoRenewal", value: false, label: "Subscription auto-renewal" },
  ], []);

  const businessDetails = useMemo(() => [
    { id: 71, type: "text", name: "businessName", value: "", label: "business name" },
    { id: 971, type: "text", name: "businessAddress", value: "", label: "Business address" },
  ], []);

  const payoutSchema = useMemo(() => [
    { id: 201, type: "select", name: "bankName", value: "", label: "Bank Name", options: banks.map(b => b.name) },
    { id: 202, type: "text", name: "accountNumber", value: "", label: "Account Number" },
    { id: 203, type: "text", name: "accountName", value: "", label: "Account Name", disabled: true },
  ], [banks]);

  // Account Resolution
  useEffect(() => {
    const accountNumber = settings['accountNumber'] ?? payout?.account_number ?? "";
    const bankName = settings['bankName'] ?? payout?.bank_name ?? "";

    const resolveAccount = async () => {
        // Trigger resolution if we have a bank and at least 5 digits of account number (for some testing accounts)
        if (typeof accountNumber === 'string' && accountNumber.length >= 5 && bankName) {
            const selectedBank = banks.find(b => b.name === bankName);
            if (!selectedBank) return;

            try {
                const response = await fetch(`${API_URL}/api/payout/resolve`, {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ account_number: accountNumber, bank_code: selectedBank.code })
                });
                const data = await response.json();
                
                // Flutterwave returns account_name in data.data
                const resolvedName = data.data?.account_name || data.data?.accountName;
                
                if (response.ok && resolvedName) {
                    const currentName = settings['accountName'] || payout?.account_name;
                    
                    // Only update and toast if the name is different or missing
                    if (resolvedName !== currentName) {
                        dispatch(updateSettings({ key: 'accountName', value: resolvedName }));
                        
                        if (isDirty) {
                            toast.success("Account name resolved: " + resolvedName, { toastId: "resolve-success" });
                        }
                    }
                }
            } catch (e) {
                console.error("Account resolution error:", e);
            }
        }
    };

    const timeoutId = setTimeout(resolveAccount, 600); 
    return () => clearTimeout(timeoutId);
  }, [settings['accountNumber'], settings['bankName'], payout?.account_number, payout?.bank_name, banks, dispatch]);


  const handleChange = useCallback((fieldName: string, newValue: string | boolean) => {
    dispatch(updateSettings({ key: fieldName, value: newValue }));
    setIsDirty(true);
    
    // Clear resolved name if sensitive fields change
    if (fieldName === 'accountNumber' || fieldName === 'bankName') {
        dispatch(updateSettings({ key: 'accountName', value: "" }));
    }
  }, [dispatch]);

  const fullSettings = {
    ...settings,
    bankName: settings.bankName ?? payout?.bank_name ?? "",
    accountNumber: settings.accountNumber ?? payout?.account_number ?? "",
    accountName: settings.accountName ?? payout?.account_name ?? "",
  };

  const handleSubmit = async (activeTab?: string) => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/account/settings`;
      let body: any = { ...fullSettings }; // Use full settings for generic settings update

      if (activeTab === 'payout') {
          url = `${API_URL}/api/payout/setup`;
          const selectedBank = banks.find(b => b.name === fullSettings.bankName);
          const bankCode = selectedBank ? selectedBank.code : (payout?.bank_code || "");
          
          if (!bankCode || !fullSettings.accountNumber) {
              toast.error("Please select a bank and enter a valid account number");
              setLoading(false);
              return;
          }

          body = {
              bank_code: bankCode,
              account_number: fullSettings.accountNumber,
              business_name: fullSettings.businessName || "User",
              country: "NG"
          };
          console.log("Saving Payout Details:", body);
      }

      const response = await fetch(url, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
            "Content-Type": "Application/json" 
          },
          body: JSON.stringify(body),
      });

      let resData: any;
      const responseText = await response.text();
      console.log("Raw Server Response:", responseText);

      try {
          resData = JSON.parse(responseText);
      } catch (e) {
          console.error("Failed to parse response as JSON:", responseText);
          toast.error("Server returned non-JSON response. Check console.");
          setLoading(false);
          return;
      }

      console.log("Save Response Data:", resData);

      if (response.ok) {
          toast.success(resData.response || "Success!");
          if (url.includes("payout/setup")) {
              dispatch(updatePayout(resData.data));
          }
      } else {
          toast.error(resData.response || `Error ${response.status}: ${JSON.stringify(resData)}`);
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    settingsSchema, personalizationSchema, settings: fullSettings, handleChange, handleSubmit,
    subscriptionSchema, businessDetails, payoutSchema, payout, loading, loadingBanks, isPro,
  };
}
