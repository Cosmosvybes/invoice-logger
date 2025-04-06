// import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";
// import { Invoice } from "../../../../../../States/Slices/invoice.types";
import { setCurrrentInvoices } from "../../../../../../States/Slices/invoice";
//custom hook
export default function useInvoiceController() {
  const { draft, sent, paid, overdue } = useAppSelector(
    (state) => state.invoice
  );

  const { currentData } = useAppSelector((store) => store.invoice);

  const dispatch = useAppDispatch();
  //filter func
  const handleInvoiceFilter = (arg: string) => {
    switch (arg) {
      case "draft":
        const uniqueDraft = draft.filter((item) => item.status == "Draft");

        return dispatch(setCurrrentInvoices(uniqueDraft));

      case "sent":
        const uniqueSent = sent.filter((item) => item.status === "sent");
       ;
        return dispatch(setCurrrentInvoices(uniqueSent));

      case "paid":
        const uniquePaid = paid.filter((item) => item.status === "paid");
        return dispatch(setCurrrentInvoices(uniquePaid));

      case "overdue":
        const uniqueOverdue = overdue.filter(
          (item) => item.status === "overdue"
        );

        return dispatch(setCurrrentInvoices(uniqueOverdue));
      default:
        return dispatch(setCurrrentInvoices(sent));
    }
  };

  return {
    currentData,
    handleInvoiceFilter,
  };
}
