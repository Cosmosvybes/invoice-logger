import { useAppDispatch } from "../../../../../../../States/hoooks/hook";

import { changeCurrency } from "../../../../../../../States/Slices/invoice";
import { useParams } from "react-router-dom";

const Currency = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleCurrencyChange = () => {
    const selectDoc = document.querySelector(
      "#currencies"
    ) as HTMLSelectElement;
    dispatch(
      changeCurrency({
        id: id ? Number(id) : Number(localStorage.getItem("id")),
        currency: selectDoc.value,
        token: String(localStorage.getItem("token")),
      })
    );
  };

  return (
    <>
      <div className="relative flex justify-center gap-2 items-center">
        <span className="text-xs text-slate-600 font-bold">Currency</span>
        <select
          onChange={handleCurrencyChange}
          id="currencies"
          className="clean-input px-3 py-2 text-xs font-mono text-violet-700 font-bold bg-white border border-slate-300 rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-violet-500/20 shadow-sm appearance-none min-w-[80px] text-center"
        >
          <option>--select--</option>
          <option>NGN</option>
          <option>USD</option>
          <option>EUR</option>
          <option>KWT</option>
          <option>KES</option>
          <option>GHS</option>
          <option>ZAR</option>
          <option>RWF</option>
          <option>XOF</option>
          <option>XAF</option>
          <option>UGX</option>
          <option>TZS</option>
        </select>
      </div>
    </>
  );
};

export default Currency;
