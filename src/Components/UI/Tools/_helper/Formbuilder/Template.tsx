import { Form, Input } from "reactstrap";
import { FORM } from "./type";

import useTemplateController from "./main";
import { EyeLightDouble, PlusThin, TrashBent } from "react-huge-icons/outline";

import Btn from "./Btn";
import ViewModal from "./ViewModal";
import { SendFast } from "react-huge-icons/bulk";

const Template = ({ reciepient, sender, item }: FORM) => {
  const {
    updateInvoiceDetails,
    inputs,
    addNewItem,
    updateValues,
    items,
    handleDelete,
    viewMode,
    setViewMode,
    handleView,
    invoiceInformation,
    tax_discount_input,
    updateDiscount,
    updateVAT,
    dispatch,
  } = useTemplateController({ reciepient, sender, item });

  const btns = [
    {
      text: "VIEW",
      icon: <EyeLightDouble className="text-3xl text-gray-50 inline" />,
      func: () => handleView(),
    },
  ];
  const addNew = [
    {
      text: "ADD ITEM",
      icon: <PlusThin className="text-3xl  text-gray-50  inline" />,
      func: () => addNewItem(),
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
              value={invoiceInformation[name]}
              onChange={(e) =>
                updateInvoiceDetails(e.currentTarget.checked, name)
              }
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
              className="px-2 py-3 text-xl font-normal outline-none rounded-md bg-inherit text-black w-96 max-sm:w-full"
              value={invoiceInformation[name]}
              placeholder={placeholder}
              onChange={(e) => updateInvoiceDetails(e.target.value, name)}
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
            className="relative items-center  px-3 py-3 gap-1 flex justify-between"
            key={input.placeholder}
          >
            <p className="text-gray-500 inline">{input.placeholder}</p>
            <Input
              title="check"
              type="checkbox"
              className="max-sm:w-auto"
              value={invoiceInformation[input.name]}
              onChange={(e) =>
                updateInvoiceDetails(e.currentTarget.checked, input.name)
              }
            />
          </div>
        );
      case "date":
        return (
          <div
            className="relative ml-2 items-center gap-1 py-3 flex justify-start"
            key={index}
          >
            <p className="text-gray-400 font-normal text-xl inline max-sm:text-sm">
              {input.placeholder}
            </p>
            <Input
              title="date"
              type="date"
              className="max-sm:w-auto bg-inherit px-3 font-bold  text-black border-none py-1"
              value={invoiceInformation[input.name]}
              onChange={(e) => updateInvoiceDetails(e.target.value, input.name)}
            />
          </div>
        );
      default:
        return (
          <div className="relative" key={index}>
            <Input
              className="px-2 py-3 text-xl font-normal outline-none rounded-md bg-inherit text-black w-96 max-sm:w-full"
              type="text"
              value={invoiceInformation[input.name]}
              placeholder={input.placeholder}
              onChange={(e) => updateInvoiceDetails(e.target.value, input.name)}
            />
          </div>
        );
    }
  });

  //   //?? ///////////////////////////////////////////////
  // ITEM MODAL
  //   //?? ///////////////////////////////////////////////

  const ADDITEM = inputs.map((input: any) => (
    <div className="relative block py-2" key={input.id}>
      <Input
        className="px-2 py-3 text-xl max-sm:text-sm max-md:text-md  outline-none rounded-sm bg-gray-200 text-black  font-normal w-96 max-sm:w-full"
        type={input.type}
        placeholder={input.name}
        value={items[input.name]}
        onChange={(e) => updateValues(e.target.value, input.name)}
      />
    </div>
  ));
  const VAT_DISCOUNT_INPUT = tax_discount_input.map((input: any) => (
    <div className="relative  max-sm:px-0 flex gap-1 items-center " key={input.id}>
      <Input
        className=" py-2 text-xl max-sm:text-sm bg-gray-300 max-md:text-md  outline-none rounded-sm text-black  font-normal w-28  max-sm:w-24"
        type={input.type}
        placeholder={input.placeholder}
        value={invoiceInformation[input.name]}
        onChange={(e) =>
          input.name == "Discount"
            ? dispatch(
                updateDiscount({
                  invoiceId: invoiceInformation.id,
                  value: Number(e.target.value),
                })
              )
            : dispatch(
                updateVAT({
                  invoiceId: invoiceInformation.id,
                  value: Number(e.target.value),
                })
              )
        }
      />
      <p className="text-gray-900 text-xl inline">%</p>
    </div>
  ));

  const ITEMLIST = invoiceInformation.itemList.map((item: any, i: any) => (
    <div
      className="relative  items-center grid grid-cols-5 px-2 bg-gray-100 py-1 w-full"
      key={i}
    >
      <p className="text-black text-center  font-normal text-xl max-sm:text-xs">
        {item.description}
      </p>
      <p className="text-black text-center   font-normal text-xl max-sm:text-xs">
        {item.quantity}
      </p>
      <p className="text-black  text-center  font-normal text-xl max-sm:text-xs">
        {item.unit_price}
      </p>
      <p className="text-black  text-center  font-normal text-xl max-sm:text-xs">
        {item.amount}
      </p>
      <TrashBent
        className="text-3xl text-black inline"
        onClick={() => handleDelete(item.itemID)}
      />
    </div>
  ));

  return (
    <>
      <section className="flex bg-white relative transition duration-700 justify-start w-full h-full flex-col  px-1 max-sm:px-1">
        {viewMode && (
          <ViewModal
            data={{ ...invoiceInformation }}
            callback={() => setViewMode(!viewMode)}
          />
        )}

        <div className="relative flex justify-end gap-1  items-center  h-14 mb-4">
          {btns.map((btn) => (
            <div className="relative h-14 w-auto " key={btn.text}>
              <Btn text={btn.text} icon={btn.icon} callback={btn.func} />
            </div>
          ))}

          <button
            onClick={() => {
              console.log(invoiceInformation);
              // dispatch(createInvoice({ ...invoice, TOTAL }));

              // toast.success("Invoice added", { theme: "dark" });
            }}
            className="w-44 h-full max-sm:w-28 shadow-md border   text-center flex justify-center items-center transition duration-500 px-2  text-gray-black text-sm font-normal rounded-md "
          >
            <SendFast className="text-4xl  mt-0.5 inline text-black" />
            SEND
          </button>
        </div>

        <div className="relative flex justify-between -mt-7">
          <Form className="relative flex flex-col justify-between w-full max-sm:w-full">
            {OWNER_}
          </Form>
        </div>

        <Form className="grid grid-cols-3 max-sm:grid-cols-2 w-full  gap-2 max-sm:gap-2">
          {CUSTOMER_}
        </Form>
        <div className="relative w-full flex border  flex-col gap-0.5">
          <div className="relative  bg-black items-center grid grid-cols-5  gap-1 py-1 w-full max-sm:w-auto">
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
          </div>
          {ITEMLIST}
        </div>

        <div className="relative w-full flex justify-between items-center mt-2 gap-1">
          {ADDITEM}
          {addNew.map((btn) => (
            <div className="relative h-12  w-auto" key={btn.text}>
              <Btn text={btn.text} icon={btn.icon} callback={btn.func} />
            </div>
          ))}{" "}
        </div>
        <hr className="w-full border-gray-300" />

        <div className="relative w-full flex items-center justify-start py-2">
          <div className="relative  w-1/3 max-sm:w-full  flex justify-start  items-center  gap-0.5">
            {VAT_DISCOUNT_INPUT}
          </div>
        </div>
        <hr className="w-full border-gray-300" />

        <div className="relative w-full flex justify-end   max-sm:grid grid-cols-1 max-sm:px-0 items-center">
          <div className="relative grid grid-cols-1 items-center w-1/2 max-sm:w-full  gap-2">
            <div className="relative flex justify-between items-center max-sm:w-full">
              <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                discount
              </p>

              <p className="text-xl  text-gray-500 mr-2  font-normal">
                {Number(invoiceInformation.Discount)}%
              </p>
            </div>

            <div className="relative flex justify-between items-center   gap-2 ">
              <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                Tax
              </p>

              <p className="text-xl  text-gray-500 mr-2  font-normal">
                {" "}
                {Number(invoiceInformation.VAT)}%
              </p>
            </div>

            <hr className="w-full border-gray-300" />

            <div className="relative flex justify-between items-center   gap-2 ">
              <p className="text-xl text-gray-500 font-normal max-sm:text-sm ">
                Total
              </p>
              <p className="text-xl  text-gray-500 mr-2  font-normal">
                ${invoiceInformation.TOTAL}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Template;
