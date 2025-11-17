import React from "react";
import { useContext, createContext, useEffect } from "react";
// import { useAppDispatch } from "../../../../../States/hoooks/hook";
// import { getUser } from "../../../../../States/Slices/invoice";

const AuthContext = createContext({});

function Authcontext({ children }: { children: React.ReactNode }) {
  // const dispatch = useAppDispatch();
  useEffect(() => {
    // function loadData() {
    //   dispatch(getUser(localStorage.getItem("token")!));
    // }
    // loadData();
    // return () => loadData();
  }, []);
  return (
    <>
      <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
    </>
  );
}
export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value)
    throw new Error("Context should be wrapped around the app component");

  return value;
}

export default Authcontext;
