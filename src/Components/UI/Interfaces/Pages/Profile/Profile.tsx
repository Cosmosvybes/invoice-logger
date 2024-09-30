import { useEffect } from "react";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import {
  getUser,
  setIsLoggedIn,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";

const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("token")!));
    dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
  }, []);
  const { account } = useAppSelector((state) => state.userSlice);

  return (
    <>
      {/* {!loading && ( */}
      <div className="px-28 max-sm:px-0 max-md:px-0">
        <BreadCrumb title="Profile" useLink={false} linkTitle="" />
        <div className="relative py-0  max-sm:py-0  h-auto flex justify-between max-sm:flex-col  ">
          <div className="relative w-full  max-sm:w-full h-auto">
            <h3 className="text-2xl px-3 max-sm:px-0 max-sm:mt-5 max-sm:text-sm text-slate-800">
              {" "}
              Account information
            </h3>
            <div className="grid grid-cols-1 gap-3 max-sm:gap-2 mt-3 max-sm:grid-cols-1">
              <div className="relative w-full px-3 max-sm:px-0  border-b  rounded block">
                <h4 className="text-slate-900 font-bold">Firstname</h4>
                <p className="text-slate-800 font-light">
                  {" "}
                  {account.firstname}
                </p>
              </div>
              <div className="relative w-full px-3 border-b  rounded block">
                <h4 className="text-slate-900 font-bold">Lastname</h4>
                <p className="text-slate-800 font-light">
                  {" "}
                  {account.lastname}{" "}
                </p>
              </div>
              <div className="relative w-full px-3 border-b  rounded block">
                <h4 className="text-slate-900 font-bold">Email</h4>
                <p className="text-slate-800 font-light">{account.email}</p>
              </div>

              <div className="relative w-full px-3 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900 font-bold">Business name</h4>
                <p className="text-slate-800 font-light">
                  {" "}
                  {account.settings.businessName}{" "}
                </p>
              </div>
              <div className="relative w-full px-3 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900 font-bold"> Address</h4>
                <p className="text-slate-800 font-light">
                  {" "}
                  {account.settings.businessAddress}{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-1/3  max-sm:w-full max-sm:hidden h-auto flex px-3  py-2 max-sm:py-0 max-sm px-3:flex-col">
            <div className="relative w-full h-auto  px-10 py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full h-full object-contain max-md:w-full max-md:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Profile;
