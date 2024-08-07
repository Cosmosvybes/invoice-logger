import { Form, Input } from "reactstrap";
import { FORM } from "./type";
import { createInvoice } from "../../../../../States/Slices/invoice";

import useTemplateController from "./main";
import {
  EyeLightDouble,
  MailArrowDown,
  PlusThin,
  TrashBent,
} from "react-huge-icons/outline";

import Btn from "./Btn";
import ViewModal from "./ViewModal";
import { toast } from "react-toastify";

const Template = ({ reciepient, sender, item }: FORM) => {
  const {
    updatedValues,
    TOTAL,
    invoiceDetails,
    inputs,
    addNewItem,
    updateValues,
    items,
    itemList,
    handleDelete,
    viewMode,
    setViewMode,
    handleView,
    dispatch,
    id,
    invoiceItem,
    editingInvoiceTotal,
  } = useTemplateController({ reciepient, sender, item });

  let invoice = { ...invoiceDetails, itemList };

  const btns = [
    {
      text: "VIEW",
      icon: <EyeLightDouble className="text-3xl text-black inline" />,
      func: () => handleView(),
    },
  ];
  const addNew = [
    {
      text: "ADD ITEM",
      icon: <PlusThin className="text-3xl mt-1 text-black inline" />,
      func: () => addNewItem(),
    },
  ];
  const deleteBtn = [
    {
      text: "REMOVE",
      icon: <TrashBent className="text-3xl text-black inline" />,
    },
  ];

  //   //?? ///////////////////////////////////////////////
  // FORM BUILDER TEMPLATE
  //   //?? ///////////////////////////////////////////////

  const OWNER_ = sender.map(({ type, name, placeholder }, index) => {
    switch (type) {
      case "checkbox":
        return (
          <div
            className="relative items-center gap-1 py-3 flex justify-start"
            key={index}
          >
            <strong className="text-gray-500">{name}</strong>
            <Input
              title="check"
              type="checkbox"
              className="max-sm:w-auto"
              value={invoiceDetails[name]}
              onChange={(e) => updatedValues(e.currentTarget.checked, name)}
            />
          </div>
        );

      default:
        return (
          <div
            className="relative items-center gap-1 py-3 flex justify-start"
            key={index}
          >
            <Input
              title="check"
              type="text"
              className="px-2 py-3 text-xl font-normal outline-none rounded-md bg-inherit text-gray-600 w-96 max-sm:w-full"
              value={invoiceDetails[name]}
              placeholder={placeholder}
              onChange={(e) => updatedValues(e.target.value, name)}
            />
          </div>
        );
    }
  });

  const CUSTOMER_ = reciepient.map((input, index) => {
    switch (input.type_) {
      case "checkbox":
        return (
          <div
            className="relative items-center gap-2 px-3 py-3 flex justify-start"
            key={input.placeholder}
          >
            <p className="text-gray-500">{input.placeholder}</p>
            <Input
              title="check"
              type="checkbox"
              className="max-sm:w-auto"
              value={invoiceDetails[input.name]}
              onChange={(e) =>
                updatedValues(e.currentTarget.checked, input.name)
              }
            />
          </div>
        );
      case "date":
        return (
          <div
            className="relative ml-3 items-center gap-1 py-3 flex justify-start"
            key={index}
          >
            <p className="text-gray-400 font-light text-xl max-sm:text-sm">
              {input.placeholder}
            </p>
            <Input
              title="date"
              type="date"
              className="max-sm:w-auto bg-inherit px-3  text-gray-400 border-none py-1"
              value={invoiceDetails[input.name]}
              onChange={(e) => updatedValues(e.target.value, input.name)}
            />
          </div>
        );
      default:
        return (
          <div className="relative" key={index}>
            <Input
              className="px-2 py-3 text-xl font-normal outline-none rounded-md bg-inherit text-gray-600 w-96 max-sm:w-full"
              type="text"
              value={invoiceDetails[input.name]}
              placeholder={input.placeholder}
              onChange={(e) => updatedValues(e.target.value, input.name)}
            />
          </div>
        );
    }
  });

  //   //?? ///////////////////////////////////////////////
  // ITEM MODAL
  //   //?? ///////////////////////////////////////////////

  const ADDITEM = inputs.map((input: any) => (
    <div className="relative block">
      <Input
        className="px-2 py-3 text-xl font-normal outline-none rounded-md bg-inherit text-gray-600 w-96 max-sm:w-full"
        type={input.type}
        placeholder={input.name}
        value={items[input.name]}
        onChange={(e) => updateValues(e.target.value, input.name)}
      />
    </div>
  ));

  const ITEMLIST = itemList.map((item: any, i: any) => (
    <div
      className="relative  items-center grid grid-cols-5 px-2 bg-gray-100 py-1 w-full"
      key={i}
    >
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.description}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.quantity}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.unit_price}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.amount}
      </p>
      {deleteBtn.map((btn) => (
        <div className="relative h-12 w-auto " key={btn.text}>
          <Btn icon={btn.icon} callback={() => handleDelete(item.itemID)} />
        </div>
      ))}{" "}
    </div>
  ));

  const EDIT_ITEM_LIST = invoiceItem?.map((item: any, i: any) => (
    <div
      className="relative  items-center grid grid-cols-5 px-2 bg-gray-100 py-1 w-full"
      key={i}
    >
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.description}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.quantity}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.unit_price}
      </p>
      <p className="text-black font-light text-sm max-sm:text-xs">
        {item.amount}
      </p>
      {deleteBtn.map((btn) => (
        <div className="relative h-12 w-auto " key={btn.text}>
          <Btn
            icon={btn.icon}
            callback={() => handleDelete(item.itemID, Number(id))}
          />
        </div>
      ))}{" "}
    </div>
  ));

  return (
    <>
      <section className="flex relative transition duration-700 justify-start w-full h-full flex-col max-sm:py-5 px-1 max-sm:px-1">
        {viewMode && (
          <ViewModal
            TOTAL={invoiceItem?.length! > 0 ? editingInvoiceTotal : TOTAL}
            isEditList={item}
            data={{ ...invoiceDetails, itemList }}
            callback={() => setViewMode(!viewMode)}
          />
        )}

        <div className="relative flex justify-between border -mt-7">
          <Form className="relative flex flex-col justify-between w-full max-sm:w-full">
            {OWNER_}
          </Form>
          <div className="relative flex justify-start   h-14">
            <div className="relative w-full max-sm:w-full flex justify-start items-center">
              {btns.map((btn) => (
                <div className="relative h-12 w-auto " key={btn.text}>
                  <Btn text={btn.text} icon={btn.icon} callback={btn.func} />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                dispatch(createInvoice({ ...invoice, TOTAL }));

                toast.success("Invoice added", { theme: "dark" });
              }}
              className="relative flex justify-start  mr-3 items-center text-black gap-2 font-light text-2xl"
            >
              <MailArrowDown className="text-4xl  mt-0.5 inline text-black" />
              SAVE
            </button>
          </div>
        </div>

        <Form className="grid grid-cols-3 max-sm:grid-cols-2 w-full  gap-2 max-sm:gap-2">
          {CUSTOMER_}
        </Form>
        <div className="relative w-full flex border  flex-col gap-0.5">
          <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-auto">
            <p className="text-white  font-light px-2 text-xl max-sm:text-xs">
              Description
            </p>
            <p className="text-white font-light text-xl max-sm:text-xs">
              Quantity
            </p>
            <p className="text-white font-light text-xl max-sm:text-xs">
              Unit price
            </p>
            <p className="text-white font-light text-xl max-sm:text-xs">
              Sub-Total
            </p>
          </div>
          {item?.length! > 0 ? EDIT_ITEM_LIST : ITEMLIST}
        </div>

        <div className="relative w-full flex justify-between items-center mt-2 gap-0.5">
          {addNew.map((btn) => (
            <div className="relative h-12 w-auto " key={btn.text}>
              <Btn text={btn.text} icon={btn.icon} callback={btn.func} />
            </div>
          ))}{" "}
          {ADDITEM}
        </div>
        <hr className="w-full border-black" />
        <div className="relative w-full flex justify-end  items-center">
          <div className="relative flex-col flex items-center gap-3">
            <p className="text-3xl font-normal underline">Total</p>

            <p className="text-xl mt-3">
              {" "}
              $
              {invoiceItem?.length! > 0
                ? editingInvoiceTotal
                : TOTAL.toFixed(2)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Template;
