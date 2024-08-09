import { useLayoutEffect, useState } from "react";
import "react-toastify/ReactToastify.css";
import { FORM, ItemsType, VAT_DISCOUNT } from "./type";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import {
  updateInvoiceItems,
  deleteInvoiceItems,
  updateInvoiceInformation,
  updateDiscountAndTaxRate,
} from "../../../../../States/Slices/invoice";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useTemplateController({ item }: FORM) {
  // invoice id from req.params

  const { id } = useParams();
  let invoiceItem = item;
  let editingInvoiceTotal;
  let invoiceInformation: any;
  //invoice state

  const { invoices, staticForm } = useAppSelector((state) => state.invoice);
  if (id) {
    invoiceInformation = invoices?.find((invoice) => invoice.id == id)!;
    editingInvoiceTotal = invoices?.find((invoice) => invoice.id == id)!.TOTAL;
  }

  const [tax_discount_input] = useState<VAT_DISCOUNT[]>([
    //invoice discounts form fields
    {
      type: "text",
      value: "",
      name: "Discount",
      id: 2,
    },
    {
      type: "text",
      value: "",
      name: "VAT",
      id: 3,
    },
  ]);

  let tax_discount_values: any = tax_discount_input.reduce(
    (allValues, currValue) => ({
      ...allValues,
      [currValue.name]: currValue.value,
    }),
    {}
  );

  const [discount_tax_states, setDiscountTaxValues] =
    useState<any>(tax_discount_values);

  const handleTaxDiscountUpdate = (newValue: string, name: string) => {
    setDiscountTaxValues((prev_values: any) => ({
      ...prev_values,
      [name]: newValue,
    }));

    return !id
      ? dispatch(
          updateDiscountAndTaxRate({
            invoiceId: Number(localStorage.getItem("id")),
            key: name,
            value: newValue,
          })
        )
      : dispatch(
          updateDiscountAndTaxRate({
            invoiceId: Number(id),
            key: name,
            value: newValue,
          })
        );
  };

  //form vfied values
  const dispatch = useAppDispatch(); //state dispatcher
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
  const [TOTAL, setTotal] = useState(0);

  const [discountAndTaxRate, setDiscountAndTaxRate] = useState({
    vat: 0,
    discount: 0,
  });

  useLayoutEffect(() => {
    let taxVal = (Number(discount_tax_states["VAT"]) / 100) * TOTAL!;
    let discountVal = (Number(discount_tax_states["Discount"]) / 100) * TOTAL!;
    let newDiscountTaxRate_ = { vat: taxVal, discount: discountVal };
    setDiscountAndTaxRate(newDiscountTaxRate_);

    if (invoiceItem || id) {
      let taxVal =
        (Number(discount_tax_states["VAT"]) / 100) * editingInvoiceTotal!;
      let discountVal =
        (Number(discount_tax_states["Discount"]) / 100) * editingInvoiceTotal!;
      let newDiscountTaxRate = { vat: taxVal, discount: discountVal };
      setDiscountAndTaxRate(newDiscountTaxRate);
    }
  }, [TOTAL, discount_tax_states, editingInvoiceTotal]);

  useLayoutEffect(() => {
    function updateTotalSupply() {
      let total_ = itemList.reduce((acc, curr) => acc + curr.amount, 0);
      setTotal(total_);
    }
    updateTotalSupply();
  }, [itemList]);

  const updateValues = (newValue: string | number, name: string) => {
    setItems((prev: any) => ({ ...prev, [name]: newValue }));
  };

  //   //?? ///////////////////////////////////////////////
  // ADD NEW ITEM AND CLEAR INPUT
  //   //?? ///////////////////////////////////////////////

  const addNewItem = () => {
    let hasEmptyInput =
      Object.values(items).filter((inputValue) => inputValue === "").length > 0;
    if (hasEmptyInput) {
      toast.warning("Missing item details");
      return;
    }
    const item = { ...items, itemID: Date.now() };

    if (invoiceItem) {
      dispatch(updateInvoiceItems({ id: Number(id), item }));
      Object.keys(items).map((item: string) => updateValues("", item));
      toast.success("Invoice updated", { theme: "dark" });
      return;
    }

    setItem([...itemList, item]);
    dispatch(
      updateInvoiceItems({ id: Number(localStorage.getItem("id")), item })
    );
    Object.keys(items).map((item: string) => updateValues("", item));
    toast.success("New item listed", { theme: "dark" });
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
            invoiceID: Number(localStorage.getItem("id")),
          })
        )
      : dispatch(
          updateInvoiceInformation({
            value: newValue,
            key: inputName,
            invoiceID: id,
          })
        );
  };

  //   //?? ///////////////////////////////////////////////
  //DELETE ITEM
  //   //?? ///////////////////////////////////////////////

  const handleDelete = (id: number, invoiceId?: number) => {
    if (!invoiceItem) {
      setItem(itemList.filter((item) => item.itemID != id));
      return;
    }
    // if its an editing invoice
    dispatch(deleteInvoiceItems({ invoiceId: Number(invoiceId), itemID: id }));
    toast.success("invoice item removed", { theme: "dark" });
  };

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
    addNewItem,
    inputs,
    tax_discount_input,
    updateValues,
    items,
    handleDelete,
    viewMode,
    setViewMode,
    TOTAL,
    setIsCreatingNewInvoice,
    isCreatingNewInvoice,
    dispatch,
    id,
    invoiceItem,
    editingInvoiceTotal,
    invoiceInformation,
    staticForm,
    discount_tax_states,
    handleTaxDiscountUpdate,
    discountAndTaxRate,
  };
}
