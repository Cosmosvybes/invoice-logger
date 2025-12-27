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
  const token = String(localStorage.getItem("token"));
  const { draft } = useAppSelector((state) => state.invoice);
  if (id) {
    invoiceInformation = draft?.find((invoice) => invoice.id == id)!;
  } else {
    invoiceInformation = draft?.find(
      (invoice) => invoice.id == localStorage.getItem("id")
    )!;
  }

  const [products, setProducts] = useState<Item[]>([
    ...invoiceInformation.itemList,
  ]);

  const dispatch = useAppDispatch();

  const remove = (index: number, itemID: number) => {
    const allProducts = [...products];
    allProducts.splice(index, 1);
    setProducts(allProducts);
    const invoiceId: any = id ? _id_ : Number(localStorage.getItem("id"));
    dispatch(deleteInvoiceItems({ invoiceId, itemID, token }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: "description" | "quantity" | "unitPrice" | "unitTotal"
  ) => {
    // //  //
    return !id
      ? dispatch(
          addItem({
            token,
            id: Number(localStorage.getItem("id")),
            index,
            key,
            value: e.target.value,
          })
        )
      : dispatch(
          addItem({
            token,
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
        quantity: 0,
        unitPrice: 0,
        unitTotal: 0,
      },
    ]);

    return !id
      ? dispatch(
          updateInvoiceItems({
            token,
            id: Number(localStorage.getItem("id")),
            item: {
              itemID: Date.now(),
              description: "",
              quantity: 0,
              unitPrice: 0,
              unitTotal: 0,
            },
          })
        )
      : dispatch(
          updateInvoiceItems({
            token,
            id: _id_,
            item: {
              itemID: Date.now(),
              description: "",
              quantity: 0,
              unitPrice: 0,
              unitTotal: 0,
            },
          })
        );
  };

  return {
    draft,
    invoiceInformation,
    id,
    _id_,
    products,
    dispatch,
    remove,
    handleChange,
    addNew,
  };
}
