import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";
import { useState } from "react";
import {
  addItem,
  deleteInvoiceItems,
  updateInvoiceItems,
} from "../../../../../../States/Slices/invoice";
import { Item } from "../../../../../../States/Slices/invoice.types";

export default function useProductsListController() {
  const { id } = useParams();
  let invoiceInformation: any;
  let _id_ = 0;
  if (id) {
    _id_ = Number(id);
  }

  const { draft } = useAppSelector((state) => state.invoice);
  if (id) {
    invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
  } else {
    invoiceInformation = draft?.find(
      (invoice) => invoice.id == localStorage.getItem("id")
    )!;
  }

  let [products, setProducts] = useState<Item[]>([
    ...invoiceInformation.itemList,
  ]);

  const dispatch = useAppDispatch();

  const remove = (index: number, itemID: number) => {
    const allProducts = [...products];
    allProducts.splice(index, 1);
    setProducts(allProducts);
    const invoiceId: any = id ? _id_ : localStorage.getItem("id");
    dispatch(deleteInvoiceItems({ invoiceId, itemID }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: "description" | "quantity" | "unitPrice" | "unitTotal"
  ) => {
    //
    if (!products && !setProducts) return;
    let allPoducts = [...products];
    allPoducts[index][key] = e.target.value;
    const total =
      Number(allPoducts[index]["unitPrice"]) *
      Number(allPoducts[index]["quantity"]);
    allPoducts[index]["unitTotal"] = String(total);
    setProducts(allPoducts);
    // //  //
    return !id
      ? dispatch(
          addItem({
            id: Number(localStorage.getItem("id")),
            index,
            key,
            value: e.target.value,
          })
        )
      : dispatch(
          addItem({
            id: _id_,
            index,
            key,
            value: e.target.value,
          })
        );
  };

  //
  const addNew = () => {
    if (!products && !setProducts) return;
    setProducts([
      ...products,
      {
        itemID: Date.now(),
        description: "",
        quantity: "",
        unitPrice: 0,
        unitTotal: "",
      },
    ]);

    return !id
      ? dispatch(
          updateInvoiceItems({
            id: Number(localStorage.getItem("id")),
            item: {
              itemID: Date.now(),
              description: "",
              quantity: "",
              unitPrice: 0,
              unitTotal: "",
            },
          })
        )
      : dispatch(
          updateInvoiceItems({
            id: _id_,
            item: {
              itemID: Date.now(),
              description: "",
              quantity: "",
              unitPrice: 0,
              unitTotal: "",
            },
          })
        );
  };

  return {
    draft,
    invoiceInformation,
    dispatch,
    id,
    _id_,
    remove,
    handleChange,
    products,
    addNew,
  };
}
