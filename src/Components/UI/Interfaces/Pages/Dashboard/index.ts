import { useLayoutEffect} from "react";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";

//
export default function useDashboardController() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);
}
