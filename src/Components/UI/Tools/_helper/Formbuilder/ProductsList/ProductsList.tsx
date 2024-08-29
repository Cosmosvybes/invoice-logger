import { Input } from "reactstrap";
import useProductsListController from "./products.controller";
import { PlusThin, TrashBent } from "react-huge-icons/bulk";
import { Item } from "../../../../../../States/Slices/invoice.types";

const ProductsList = () => {
  const { addNew, remove, handleChange, products } =
    useProductsListController();

  //

  return (
    <>
      <h1 className="text-2xl mt-3 max-sm:text-center mb-2 ">Products List</h1>
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

      <div className="relative w-full flex flex-col gap-1 mt-2 mb-2">
        {products.map((_: Item, i: number) => (
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
      <div className="relative grid grid-cols-5 ">
        {" "}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button onClick={addNew} color="primary" className="text-black">
          {" "}
          <PlusThin className="inline text-4xl text-black" />
        </button>
      </div>
    </>
  );
};

export default ProductsList;
