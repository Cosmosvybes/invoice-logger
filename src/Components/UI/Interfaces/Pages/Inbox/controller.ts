import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";

export default function useInvoiceReceivedController() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
    dispatch(getUser(localStorage.getItem("token")!));
  }, []);
  const { inbox } = useAppSelector((state) => state.invoice);

  // let list = new Array();
  // list.length = 4;
  // list.fill(staticForm);

  return {
    inbox,
  };
}
