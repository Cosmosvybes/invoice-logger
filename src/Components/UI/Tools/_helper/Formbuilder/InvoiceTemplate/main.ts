import { useEffect, useLayoutEffect, useMemo, useState } from "react";
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

  let invoiceInformation: any;
  //invoice state
  const { draft, staticForm } = useAppSelector((state) => state.invoice);

  if (id) {
    invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
  } else {
    // console.log(draft);
    invoiceInformation = draft?.find(
      (invoice) => invoice.id == localStorage.getItem("id")
    )!;
  }

  const token = String(localStorage.getItem("token"));
 
  //
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

  //
  let reducerVal: object = inputs.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr.value }), // invoice formFields value
    {}
  );

  const [items, setItems]: any = useState<object>(reducerVal); //a single item object with amount, description and its unit price
  const [itemList, setItem] = useState<(typeof items)[]>([]); //list of products/ or items of the invoice

  useLayoutEffect(() => {
    function updateAmount() {
      let unit_p = Number(items["quantity"]);
      let quantity_v = Number(items["unit_price"]);
      let amount_v = unit_p * quantity_v;
      return updateValues(amount_v, "amount");
    }

    updateAmount(); //update the product total unit cost
  }, [items["quantity"], items["unit_price"]]);

  //?? ///// update total supply

  const updateValues = (newValue: string | number, name: string) => {
    setItems((prev: any) => ({ ...prev, [name]: newValue }));
  };

  const [invoiceDetails, setInvoiceDetails] = useState({
    ...staticForm,
  });

  //   //?? ///////////////////////////////////////////////
  // VALUE UPDATE FUNC
  //   //?? ///////////////////////////////////////////////

  const updateInvoiceDetails = (
    newValue: string | boolean | number,
    inputName: any
  ) => {
    setInvoiceDetails((prev: {}) => ({ ...prev, [inputName]: newValue }));

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

  let updatedBalance = useMemo(() => {
    let values = (
      invoiceInformation.TOTAL -
      (Number(invoiceInformation.Discount) / 100) * invoiceInformation.TOTAL +
      (Number(invoiceInformation.VAT) / 100) * invoiceInformation.TOTAL
    ).toFixed(2);
    return values;
  }, [
    invoiceInformation.VAT,
    invoiceInformation.Discount,
    invoiceInformation.itemList,
  ]);

  const handleView = () => {
    return setViewMode(true);
  };

  const [viewMode, setViewMode] = useState(false);
  const [isCreatingNewInvoice, setIsCreatingNewInvoice] = useState(false);

  return {
    setItem,
    itemList,
    handleView,
    updateInvoiceDetails,
    invoiceDetails,
    inputs,
    tax_discount_input,
    updateValues,
    items,
    viewMode,
    setViewMode,
    setIsCreatingNewInvoice,
    isCreatingNewInvoice,
    dispatch,
    invoiceInformation,
    staticForm,
    updateDiscount,
    updateVAT,
    updatedBalance,
    token,
  };
}
