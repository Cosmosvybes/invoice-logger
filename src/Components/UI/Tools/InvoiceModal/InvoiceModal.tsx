import { DocumentText, PlusThin, RemoveCircle } from "react-huge-icons/outline";
import { Input } from "reactstrap";
import useModalController from "./controller";
import BTN from "../_helper/Button";
import { useState } from "react";

interface callBack {
  modal: boolean;
  setModalSwitch(e: boolean): void;
}

const InvoiceModal = ({ modal, setModalSwitch }: callBack) => {
  const { form, updateValues, allValues, handleSubmit } = useModalController();
  const [actionControl] = useState([
    {
      id: 1,
      text: "Cancel",
      callback: () => setModalSwitch(!modal),
      icon: <DocumentText className="text-2xl inline text-gray-50" />,
    },
    {
      id: 2,
      text: "Generate",
      callback: () => handleSubmit(),
      icon: <DocumentText className="text-2xl inline text-gray-50" />,
    },
  ]);

  return (
    <>
      <div className="absolute h-screen w-full px-44 duration-1000 transition max-sm:px-2 max-sm:py-2 max-sm:h-screen py-36  flex justify-center items-center">
        <div className="relative border h-full w-full  rounded-3xl bg-gradient-to-tr from-sky-800 to-sky-400 flex flex-col  gap-3 px-5 py-5 font-bold">
          <div className="relative flex  h-12 justify-start items-center ">
            <h1 className="text-5xl font-extralight text-gray-50 max-sm:text-xl max-sm:font-light ml-12 max-sm:ml-2">
              New
            </h1>
            <PlusThin className="text-5xl mt-1 text-gray-50 inline-block" />
          </div>

          <div className="relative w-full justify-center items-center h-full rounded-lg mt-2 px-10 max-sm:px-1">
            <div className="relative grid grid-cols-2 gap-5 max-sm:gap-2 py-20">
              {form.map((input) => (
                <div className="relative w-full block" key={input.id}>
                  <p className="text-gray-50 text-2xl font-extralight">
                    {input.labelName}
                  </p>
                  <Input
                    value={allValues[input.name]}
                    placeholder={input.placeholder}
                    onChange={(e) => updateValues(e.target.value, input.name)}
                    className="px-8 max-sm:w-full py-6 w-full rounded-md outline-none border bg-gray-50 border-gray-50"
                  />
                </div>
              ))}
              <select className="px-3 py-6 rounded-md">
                <option>Payment Method</option>
                <option>Cash</option>
                <option>E-transfer</option>
              </select>

              <select className="px-3 py-6 rounded-md">
                <option>Additional/Late Fee</option>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="relative flex justify-end items-center  w-full h-36 mb-10 px-10 max-sm:px-2 gap-2">
              {actionControl.map((btn) => (
                <BTN text={btn.text} callback={btn.callback} icon={btn.icon} />
              ))}
            </div>
          </div>

          <RemoveCircle
            className="text-7xl z-10 hover:text-sky-700 duration-700 transition text-gray-50 absolute right-2 top-2"
            onClick={() => setModalSwitch(!modal)}
          />
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;
