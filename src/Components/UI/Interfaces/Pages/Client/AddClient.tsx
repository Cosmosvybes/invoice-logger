import { useLayoutEffect } from "react";
import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientForm/ClientFormBuilder";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
const AddClient = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);

  return (
    <>
      <div className="relative px-28 max-sm:px-0 h-screen">
        <BreadCrumb title="New Client" useLink={true} linkTitle="" />

        <div className="relative py-0 max-sm:py-0  flex justify-between max-sm:flex-col-reverse  gap-5">
          <div className="relative w-1/3  max-sm:w-full h-auto flex  py-2 max-sm:py-0  flex-col">
            <div className="relative w-full h-auto  py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full h-full object-contain max-md:w-full max-md:h-auto"
              />
            </div>
          </div>

          <div className="relative w-full  max-sm:w-full h-auto  max-sm:px-3">
            <ClientFormBuilder />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;
