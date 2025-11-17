import { useLayoutEffect } from "react";
import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientForm/ClientFormBuilder";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
import {
  getUser,
  setIsAuthenticated,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
const AddClient = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(setIsAuthenticated());
  }, []);

  return (
    <>
      <div className="relative  h-screen px-28 max-sm:px-0 max-sm:overflow-x-scroll max-sm:overflow-y-clip s max-sm:h-screen  bg-transparent">
        <BreadCrumb title="New Client" useLink={false} linkTitle="client/new" />

        <div className="relative py-0 max-sm:py-0   flex justify-between max-sm:flex-col-reverse gap-3">
          <div className="relative w-1/3 max-sm:hidden  max-sm:w-full h-auto flex  py-2 max-sm:py-0  flex-col">
            <div className="relative w-full h-auto  py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full  object-contain max-md:w-full max-md:h-auto"
              />
            </div>
          </div>

          <div className="relative w-full  max-sm:w-full max-sm:h-screen  max-sm:px-3">
            <ClientFormBuilder />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddClient);
