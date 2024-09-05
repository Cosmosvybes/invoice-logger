import { useLayoutEffect } from "react";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Table_ from "./Table";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
const ClientPage = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);
  return (
    <>
      <div className="relative px-28  max-sm:px-0 h-screen">
        <BreadCrumb title="Clients" useLink={true} linkTitle="client/new" />
        <Table_ />
      </div>
    </>
  );
};

export default ClientPage;
