import { useState } from "react";
import "react-toastify/ReactToastify.css";
import { ItemsType, VAT_DISCOUNT } from "../type";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import {
  updateInvoiceInformation,
  updateDiscount,
  updateVAT,
} from "../../../../../../States/Slices/invoice";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../../States/hoooks/hook";

export default function useTemplateController() {
  const { id } = useParams();
  const { draft, loading } = useAppSelector((state) => state.invoice);

  let invoiceInformation: any;
  // JSON.parse(localStorage.getItem("invoiceInformation")!);

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
    //invoice discounts form fields
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
  const dispatch = useAppDispatch(); //state dispatcher

  //
  const [inputs] = useState<ItemsType[]>([
    //invoice items formFields
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

  return {
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

    updateDiscount,
    token,
    loading,
    updateVAT,
  };
}
