import { useAppSelector } from "../../../../../States/hoooks/hook";

export default function useInvoiceReceivedController() {
  const { staticForm } = useAppSelector((state) => state.invoice);
  let list = new Array();
  list.length = 4;
  list.fill(staticForm);

  return {
    list,
  };
}
