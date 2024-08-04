import useModalController from "./controller";
import Template from "../_helper/Formbuilder/Template";

const InvoiceModal = () => {
  const { forms, senderInfo } = useModalController();

  return (
    <>
      <div className="relative h-screen  w-full  duration-1000 transition  max-sm:py-2 max-sm:h-screen   flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-screen boder-black w-full  py-10 max-sm:w-full rounded-3xl bg-gray-50  flex flex-col  gap-3 px-5  font-bold">
          <Template reciepient={forms} sender={senderInfo} />
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;
