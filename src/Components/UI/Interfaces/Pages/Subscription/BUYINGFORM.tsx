import { useState } from "react";
import { Input } from "reactstrap";
import useSmartContractController from "../../../../Web3/Credentials/Index";

const BUYINGFORM = ({ closeHandler }: { closeHandler: () => void }) => {
  const [ethAmount, setEthAmount] = useState("");
  const { handleTopUp } = useSmartContractController();
  return (
    <div className="relative w-1/2 max-sm:w-full h-1/2 max-sm:h-auto bg-white rounded-lg flex flex-col justify-start items-start gap-4 p-2 shadow-lg">
      <div className="relative flex justify-between gap-5 w-full items-center">
        <h1 className="text-[16px] text-purple-600">{"BUY STEADYBILL TOKEN"}</h1>{" "}
        <button
          onClick={closeHandler}
          className="w-20 p-1 rounded-md bg-red-500 text-white  a"
        >
          close{" "}
        </button>
      </div>
      <Input
        type="text"
        value={ethAmount}
        placeholder="ETH amount here"
        onChange={(e) => setEthAmount(e.target.value)}
      />
      <button
        onClick={() => handleTopUp(ethAmount)}
        className="bg-purple-800 text-white p-3 w-full rounded-lg"
      >
        BUY
      </button>
    </div>
  );
};

export default BUYINGFORM;
