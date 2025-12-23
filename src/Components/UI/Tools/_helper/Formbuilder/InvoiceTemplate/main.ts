import { useEffect, useState } from "react";
import "react-toastify/ReactToastify.css";
import { ItemsType, VAT_DISCOUNT } from "../type";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";

import {
  updateInvoiceInformation,
  updateDiscount,
  updateVAT,
  removeDraft,
} from "../../../../../../States/Slices/invoice";

import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../../../../../../States/Slices/ClientSlice/useAuth/user";
// import useSmartContractController from "../../../../../Web3/Credentials/Index";
// import { ethers } from "ethers";
// const ethereum = (window as any).ethereum;
// import { tokenCredientials } from "../../../../../Web3/Credentials/Token/constants";
// import { shopCredientials } from "../../../../../Web3/Credentials/Shop/constants";

import {
  setLoading,
  setLoading as walletLoader,
} from "../../../../../../States/Slices/wallet";
export default function useTemplateController() {
  // const { tokenAbi, tokenAddress } = tokenCredientials;
  // const { contractAddress, abi } = shopCredientials;
  // const getSmartContractAction = async (address_: string, abi: any) => {
  //   try {
  //     const provider = new ethers.BrowserProvider(ethereum);
  //     const signer = await provider.getSigner();
  //     const smartContraction = new ethers.Contract(address_, abi, signer);
  //     return smartContraction;
  //   } catch (error) {
  //     toast.error("Error connecting to smart contract", {
  //       theme: "dark",
  //     });
  //   }
  // };

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setIsAuthenticated());
  }, []);

  const { draft, clients } = useAppSelector((state) => state.invoice);
  const { loading, isConnected } = useAppSelector(
    //also import from the wallet slice address
    (store) => store.walletSlice
  );

  let invoiceInformation: any;
  function setInvoiceInformation() {
    if (id) {
      invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
    } else {
      invoiceInformation = draft?.find(
        (invoice) => invoice.id == localStorage.getItem("id")
      )!;
    }
  }
  setInvoiceInformation();
  const token = String(localStorage.getItem("token"));
  
  // [NEW] Logic for Default Payment Terms & Apply Tax
  const { settings } = useAppSelector((state) => state.invoice);
  useEffect(() => {
    if (invoiceInformation && !id) { // Only on new invoice creation (not editing existing)
        
        // 1. Default Payment Terms (30 Days)
        if (settings?.defaultPaymentTerms) {
             const issueDate = invoiceInformation.DateIssued ? new Date(invoiceInformation.DateIssued) : new Date();
             const dueDate = new Date(issueDate);
             dueDate.setDate(dueDate.getDate() + 30);
             
             // Check if DateDue is empty before overwriting? Or force overwrite?
             // Since it's a preference, we likely want to set the default starting state.
             if(!invoiceInformation.DateDue) {
                 dispatch(updateInvoiceInformation({
                    value: dueDate.toISOString().split('T')[0],
                    key: "DateDue",
                    invoiceID: Number(localStorage.getItem("id")),
                    token
                 }));
             }
        }

        // 2. Apply Tax Defaults
        if (settings?.applyTax) {
             // If VAT is not set, set a default value (e.g., 5 or just ensure input is ready)
             // The structure uses `tax_discount_input` state, but values live in invoiceInformation.
             if (!invoiceInformation.VAT) {
                 dispatch(updateVAT({
                     invoiceId: invoiceInformation.id,
                     value: 5, // Default 5% tax if enabled
                     token,
                 }));
             }
        }
    }
  }, [settings, invoiceInformation?.id]); // Run when settings load or invoice ID changes

  const [tax_discount_input] = useState<VAT_DISCOUNT[]>([
    {
      type: "number",
      value: "",
      name: "Discount",
      placeholder: "Discount",
      id: 2,
    },
    {
      type: "number",
      value: "",
      name: "VAT",
      placeholder: "VAT",
      id: 3,
    },
  ]);

  //form vfied values
  //state dispatcher

  const [inputs] = useState<ItemsType[]>([
    {
      type: "text",
      value: "",
      name: "description",
      id: 4,
    },
    {
      type: "text",
      value: "",
      name: "quantity",
      id: 5,
    },
    {
      type: "text",
      value: "",
      name: "unit_price",
      id: 6,
    },
    {
      type: "text",
      value: 0,
      name: "amount",
      status: true,
      id: 7,
    },
  ]);

  //?? ///// update total supply

  const updateInvoiceDetails = (
    newValue: string | boolean | number,
    inputName: any
  ) => {
    return !id
      ? dispatch(
          updateInvoiceInformation({
            value: newValue,
            key: inputName,
            token,
            invoiceID: Number(localStorage.getItem("id")),
          })
        )
      : dispatch(
          updateInvoiceInformation({
            value: newValue,
            key: inputName,
            invoiceID: id,
            token,
          })
        );
  };

  const handleView = () => {
    return setViewMode(true);
  };

  const [viewMode, setViewMode] = useState(false);
  const [isCreatingNewInvoice, setIsCreatingNewInvoice] = useState(false);
  const [isLoading] = useState(false);
  const [recipient, setReceipient] = useState("");
  const [sendAsMessage, setSetAsMessage] = useState(true);
  //
  const navigate = useNavigate();
  const handleSendInvoice = async (emailHtml: any) => {
    let hasEmptyStr = Object.values(invoiceInformation).find(
      (val) => val == ""
    );

    if (hasEmptyStr != undefined && typeof hasEmptyStr != "number") {
      toast.warn("Missing invoice details", { theme: "colored" });
      return;
    }
    
    if (!recipient || recipient.trim() === "") {
        toast.warn("Please enter a recipient email address", { theme: "colored" });
        return;
    }
    const emailData = await emailHtml;

    // Transform "Recurring" field (from FormBuilder) to backend structure
    let finalInvoice = { ...invoiceInformation };
    if (finalInvoice.Recurring && finalInvoice.Recurring !== "None") {
        finalInvoice.recurring = {
            frequency: finalInvoice.Recurring.toLowerCase(),
            // Default to starting today if not specified
            nextRun: new Date().toISOString() 
        };
    }
    // Clean up the flat field
    delete finalInvoice.Recurring;

    const emailObject = {
      receipient: recipient,
      htmlContent: emailData,
      invoice: finalInvoice,
    };
    // if (!isConnected) return toast.warn("Account not conneected");

    try {
      dispatch(setLoading());
      const responseInfo = await fetch(
        `https://ether-bill-server-1.onrender.com/api/send/invoice?sendAsMessage=${sendAsMessage}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ ...emailObject }),
        }
      );
      if (!responseInfo.ok) {
          throw new Error("Failed to send invoice. Please try again.");
      }
      const response = await responseInfo.json();
      toast.success(response.response, { theme: "light" });
      navigate("/dashboard");
      const invoiceID = invoiceInformation.id;
      dispatch(removeDraft({ invoiceID }));
      dispatch(walletLoader());
    } catch (error: any) {
      toast.error(error.message, { theme: "colored" });
      dispatch(setLoading());
    }
  };

  const [useCustomChecked, setUseCustom] = useState(false);
  const [customEmail, setCustomEmail] = useState("");

  const handleSetCustomEmail = (e: any) => {
    setCustomEmail(e.target.value);
    setReceipient(e.target.value);
  };
  const handleSendAsMessage = (e: any) => {
    setSetAsMessage(e.target.value);
  };
  const handleSelectClient = () => {
    const selectDoc = document.querySelector(
      "#client-list"
    ) as HTMLSelectElement;
    setReceipient(selectDoc.value);
  };

  const [editToggle, setEditToggle] = useState(false);
  const handleEditFormToggle = () => {
    setEditToggle(!editToggle);
  };

  return {
    handleSendAsMessage,
    setSetAsMessage,
    sendAsMessage,
    handleSetCustomEmail,
    customEmail,
    setUseCustom,
    handleSelectClient,
    useCustomChecked,
    clients,
    loading,
    handleSendInvoice,
    handleView,
    updateInvoiceDetails,
    setViewMode,
    setIsCreatingNewInvoice,
    dispatch,
    inputs,
    tax_discount_input,
    viewMode,
    isCreatingNewInvoice,
    invoiceInformation,
    isLoading,
    updateDiscount,
    token,
    updateVAT,
    isConnected,
    editToggle,
    handleEditFormToggle,
  };
}
