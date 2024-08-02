import InvoiceModal from "../../Tools/InvoiceModal/InvoiceModal";
import Menu from "../../Tools/Menu";
import useMainController from "./main";

const Main = () => {
  const { modalSwitch, setModalSwitch } = useMainController();

  return (
    <>
      <div className="relative flex justify-center items-center  max-sm:items-start max-sm:py-0 h-screen">
        <Menu modal={modalSwitch} setModalSwitch={setModalSwitch} />
        {modalSwitch && (
          <InvoiceModal setModalSwitch={setModalSwitch} modal={modalSwitch} />
        )}
      </div>
    </>
  );
};

export default Main;
