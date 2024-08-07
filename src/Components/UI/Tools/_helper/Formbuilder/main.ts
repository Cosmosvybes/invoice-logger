import { useLayoutEffect, useState } from "react";
import "react-toastify/ReactToastify.css";
import { FORM, ItemsType } from "./type";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import invoice, {
  updateInvoiceItems,
  deleteInvoiceItems,
} from "../../../../../States/Slices/invoice";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useTemplateController({
  reciepient,
  sender,
  item,
}: FORM) {
  // invoice id from req.params

  const { id } = useParams();
  let invoiceItem = item;
  let editingInvoiceTotal;
  //invoice state

  const { invoices } = useAppSelector((state) => state.invoice);
  if (invoiceItem) {
    editingInvoiceTotal = invoices!.find((invoice) => invoice.id == id)!.TOTAL;
  }

  //form vfied values
  const FORMVALUES: any = reciepient.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: curr.value,
    }),
    {}
  );

  const dispatch = useAppDispatch(); //state dispatcher

  const ownerInfo = sender.reduce(
    //invoice owner form fied values
    (allDetails, currentDetails) => ({
      ...allDetails,
      [currentDetails.name]: currentDetails.value,
    }),
    {}
  );

  const [inputs] = useState<ItemsType[]>([
    //invoice items formFields
    {
      type: "text",
      value: "",
      name: "description",
      id: Math.random() ** Date.now(),
    },
    {
      type: "text",
      value: "",
      name: "quantity",
      id: Math.random() ** Date.now(),
    },
    {
      type: "text",
      value: "",
      name: "unit_price",
      id: Math.random() ** Date.now(),
    },
    {
      type: "text",
      value: 0,
      name: "amount",
      status: true,
      id: Math.random() ** Date.now(),
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
    Object.keys(items).map((item: string) => updateValues("", item));
    toast.success("New item listed", { theme: "dark" });
  };

  const [invoiceDetails, setDetails] = useState({
    ...FORMVALUES,
    ...ownerInfo,
    id: Date.now(),
  });

  //   //?? ///////////////////////////////////////////////
  // HANDLE SUBMIT
  //   //?? ///////////////////////////////////////////////

  //   //?? ///////////////////////////////////////////////
  // VALUE UPDATE FUNC
  //   //?? ///////////////////////////////////////////////

  const updatedValues = (
    newValue: string | boolean | number,
    inputName: any
  ) => {
    setDetails((PREV_VALUES: any) => ({
      ...PREV_VALUES,
      [inputName]: newValue,
    }));
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
    updatedValues,
    invoiceDetails,
    addNewItem,
    inputs,
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
  };
}
