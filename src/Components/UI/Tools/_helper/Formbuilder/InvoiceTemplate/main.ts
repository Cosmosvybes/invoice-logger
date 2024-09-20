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
import { setIsLoggedIn } from "../../../../../../States/Slices/ClientSlice/useAuth/user";

export default function useTemplateController() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);

  const { loading, draft } = useAppSelector((state) => state.invoice);

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
  const [isLoading, setLoading] = useState(false);

  //
  const handleSendInvoice = async (emailHtml: any) => {
    const emailData = await emailHtml;
    const emailObject = {
      receipient: "alfredchrisayo@gmail.com",
      htmlContent: emailData,
      invoice: invoiceInformation,
    };

    try {
      setLoading(true);
      const responseInfo = await fetch(
        "https://ether-bill-server-1.onrender.com/api/send/invoice",
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
        throw new Error("Operation failed");
      }
      const response = await responseInfo.json();
      toast.success(response.response, { theme: "light" });
      navigate("/dashboard");
      const invoiceID = invoiceInformation.id;
      dispatch(removeDraft({ invoiceID }));
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message, { theme: "dark" });
      setLoading(false);
    }
  };
  // console.log(draft)
  return {
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
  };
}
