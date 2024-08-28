import React from "react";
import { Input } from "reactstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import {
  addItem,
  deleteInvoiceItems,
  updateInvoiceItems,
} from "../../../../../States/Slices/invoice";

import { TrashBent } from "react-huge-icons/bulk";
import { Item } from "../../../../../States/Slices/invoice.types";

const ProductsList = ({
  products,
  setProducts,
}: {
  products: Item[];
  setProducts: React.Dispatch<React.SetStateAction<Item[]>>;
}) => {
  // set url params to _id_
  const { id } = useParams();
  let _id_: number;
  if (id) {
    _id_ = Number(id);
  }

  const dispatch = useAppDispatch();

  const addNew = () => {
    const itemID = Date.now();
    setProducts([
      ...products,
      {
        itemID,
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
              itemID,
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
              itemID,
              description: "",
              quantity: "",
              unitPrice: 0,
              unitTotal: "",
            },
          })
        );
  };

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
  // //

  return (
    <>
      <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-full">
        <p className="text-white text-center  font-light px-2 text-xl max-sm:text-xs">
          Description
        </p>
        <p className="text-white text-center  font-light text-xl max-sm:text-xs">
          Quantity
        </p>
        <p className="text-white text-center  font-light text-xl max-sm:text-xs">
          Unit price
        </p>
        <p className="text-white text-center  font-light text-xl max-sm:text-xs">
          Unit total
        </p>

        <button onClick={addNew} color="primary" className="text-white">
          {" "}
          Add{" "}
        </button>
      </div>

      <div className="relative w-full flex flex-col gap-1 mt-2 mb-2">
        {products.map((_, i) => (
          <div className="relative grid grid-cols-5 gap-1" key={i}>
            <Input
              className="px-2 py-3 text-xl max-sm:text-xs text-center max-md:text-md   outline-none rounded-sm bg-inherit border-b border-black text-black  font-normal w-96 max-md:w-full max-sm:w-full"
              type={"text"}
              placeholder={_.description}
              value={_.description}
              onChange={(e) => handleChange(e, i, "description")}
            />
            <Input
              className="px-2 py-3 text-xl max-sm:text-xs  text-center max-md:text-md   outline-none rounded-sm bg-inherit border-b border-black text-black  font-normal w-96 max-md:w-full max-sm:w-full"
              type={"text"}
              placeholder={_.quantity}
              value={_.quantity}
              onChange={(e) => handleChange(e, i, "quantity")}
            />
            <Input
              className="px-2 py-3 text-xl max-sm:text-xs  text-center max-md:text-md   outline-none rounded-sm bg-inherit border-b border-black text-black  font-normal w-96 max-md:w-full max-sm:w-full"
              type={"text"}
              placeholder={String(_.unitPrice)}
              value={_.unitPrice}
              onChange={(e) => handleChange(e, i, "unitPrice")}
            />
            <Input
              className="px-2 py-3 text-xl max-sm:text-xs text-center  max-md:text-md   outline-none rounded-sm bg-inherit border-b border-black text-black  font-normal w-96 max-md:w-full max-sm:w-full"
              type={"text"}
              placeholder={_.unitTotal}
              value={_.unitTotal}
              onChange={(e) => handleChange(e, i, "unitTotal")}
            />

            <button
              onClick={() => remove(i, _.itemID)}
              color="primary"
              className="text-black flex justify-center items-center"
            >
              {" "}
              <TrashBent className="text-3xl text-black inline" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
