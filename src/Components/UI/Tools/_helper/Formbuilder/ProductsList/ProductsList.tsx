import { Input } from "reactstrap";
import useProductsListController from "./products.controller";
import { PlusRectangle, TrashBent } from "react-huge-icons/bulk";
import { Item } from "../../../../../../States/Slices/invoice.types";
import React from "react";

const ProductsList = React.memo(({}) => {
  const { addNew, remove, handleChange, invoiceInformation } =
    useProductsListController();

  //

  return (
    <>
      <h1 className="text-2xl mt-3 px-2 mb-2 ">Products List</h1>
      <div className="relative bg-gray-50 items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-full">
        <p className="text-black text-center  font-light px-2 text-xl max-sm:text-xs">
          Description
        </p>
        <p className="text-black text-center  font-light text-xl max-sm:text-xs">
          Quantity
        </p>
        <p className="text-black text-center  font-light text-xl max-sm:text-xs">
          Unit price
        </p>
        <p className="text-black text-center  font-light text-xl max-sm:text-xs">
          Unit total
        </p>
        <p className="text-black text-center  font-light text-xl max-sm:text-xs">
          Actions
        </p>
      </div>

      <div className="relative w-full flex flex-col gap-1 mt-2 mb-3">
        {invoiceInformation.itemList.map((_: Item, i: number) => (
          <div className="relative grid grid-cols-5 gap-4 max-sm:gap-0" key={i}>
            <Input
              className={`px-2  text-xl max-sm:text-xs text-center max-md:text-md  outline-none rounded-md bg-inherit border-b bg-gray-300 py-2  text-black  font-normal w-96 max-md:w-full max-sm:w-full`}
              type={"text"}
              placeholder={"Description"}
              value={_.description}
              onChange={(e) => handleChange(e, i, "description")}
            />
            <Input
              className={`px-2 py-2  text-xl max-sm:text-xs text-center max-md:text-md   outline-none rounded-md bg-inherit   bg-gray-200   text-black  font-normal w-96 max-md:w-full max-sm:w-full`}
              type={"text"}
              placeholder={"Quantity"}
              value={_.quantity}
              onChange={(e) => handleChange(e, i, "quantity")}
            />
            <Input
              className={`px-2 py-2  text-xl max-sm:text-xs text-center max-md:text-md   outline-none rounded-md bg-inherit   ${
                i % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
              }  text-black  font-normal w-96 max-md:w-full max-sm:w-full`}
              type={"text"}
              placeholder={"Unit price"}
              value={_.unitPrice}
              onChange={(e) => handleChange(e, i, "unitPrice")}
            />
            <Input
              disabled
              className={`px-2 py-2  text-xl max-sm:text-xs text-center max-md:text-md   outline-none rounded-md bg-inherit border-b text-black bg-gray-400   font-normal w-96 max-md:w-full max-sm:w-full`}
              type={"text"}
              placeholder={"Sub Total"}
              value={Number(_.unitTotal).toFixed(2)}
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
      <div className="relative grid grid-cols-5  gap-4">
        {" "}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button onClick={addNew} color="primary" className="">
          {" "}
          <PlusRectangle className="inline text-5xl text-green-600" />
        </button>
      </div>
    </>
  );
});

export default ProductsList;
