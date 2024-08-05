import { useLayoutEffect, useState } from "react";
import "react-toastify/ReactToastify.css";
import { FORM, ItemsType } from "./type";
import { toast } from "react-toastify";

export default function useTemplateController({ reciepient, sender }: FORM) {
  const FORMVALUES: any = reciepient.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: curr.value,
    }),
    {}
  );

  const ownerInfo = sender.reduce(
    (allDetails, currentDetails) => ({
      ...allDetails,
      [currentDetails.name]: currentDetails.value,
    }),
    {}
  );

  const [inputs] = useState<ItemsType[]>([
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
      value: "",
      name: "amount",
      id: Math.random() ** Date.now(),
    },
  ]);

  let reducerVal: object = inputs.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
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
    const newInput = { ...items, id: Date.now() };
    setItem([...itemList, newInput]);
    Object.keys(items).map((item: string) => updateValues("", item));
    toast.success("New item listed", { theme: "colored" });
  };

  const [invoiceDetails, setDetails] = useState({
    ...FORMVALUES,
    ...ownerInfo,
    id: Date.now(),
  });

  //   //?? ///////////////////////////////////////////////
  // HANDLE SUBMIT
  //   //?? ///////////////////////////////////////////////

  const handleSubmit = () => {
    // const {
    //   Business,
    //   BusinessAddress,
    //   BusinessCountry,
    //   City,
    //   Client,
    //   ClientAddress,
    //   DateDue,
    //   DateIssued,
    //   Description,
    //   AdditionalInfo,
    //   Country,
    //   Amount,
    // }: Reciept = invoiceDetails;
    // let reciept = `
    // Ref ID-${"#12345"}
    // Date - ${new Date().toLocaleTimeString()}
    // Invoice To - ${Client}
    // Client Address - ${ClientAddress}
    // City - ${City}
    // Country - ${Country}
    // Date Issued - ${DateIssued}
    // Date Due - ${DateDue}
    // Description- ${Description}
    // Amount - ${Amount}
    // Additional Info- ${AdditionalInfo}
    // IssuedBy - ${Business}
    // Business Address - ${BusinessAddress}
    // Country - ${BusinessCountry}
    //                      Total - ${Amount}
    // `;
    // const blob = new Blob([reciept], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // let anchorLink = document.createElement("a");
    // anchorLink.href = url;
    // anchorLink.download = "receipt.txt";
    // anchorLink.click();
    // URL.revokeObjectURL(url);
  };

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
  const handleDelete = (id: any) => {
    setItem(itemList.filter((item: any) => item.id !== id));
  };

  const handleView = () => {
    return setViewMode(true);
  };

  const [viewMode, setViewMode] = useState(false);
  const [isCreatingNewInvoice, setIsCreatingNewInvoice] = useState(false);
  return {
    handleView,
    updatedValues,
    handleSubmit,
    invoiceDetails,
    addNewItem,
    inputs,
    updateValues,
    items,
    itemList,
    handleDelete,
    viewMode,
    setViewMode,
    TOTAL,
    setIsCreatingNewInvoice,
    isCreatingNewInvoice,
  };
}
