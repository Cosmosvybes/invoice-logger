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
      <div className="relative flex justify-center gap-2 items-center border">
        <label className="px-1"> Currency</label>
        <select
          onChange={handleCurrencyChange}
          id="currencies"
          className="px-2 w-auto py-2"
        >
          <option>--select--</option>
          <option>NGN</option>
          <option>USD</option>
          <option>EUR</option>
          <option>KWT</option>
        </select>
      </div>
    </>
  );
};

export default Currency;
