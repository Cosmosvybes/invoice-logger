import { Button, Input } from "reactstrap";
// import Header from "../../../Tools/_helper/Formbuilder/Common/Header/Header";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLoading } from "../../../../../States/Slices/wallet";
import { toast } from "react-toastify";
const NewPassword = () => {
  const { loading } = useAppSelector((store) => store.walletSlice);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleNewPasswordUpdate = async () => {
    if (!newPassword || !cPassword) return;
    else if (newPassword !== cPassword)
      return toast.warning("Passsword doe not match");

    const userEmail = localStorage.getItem("email");

    dispatch(setLoading());

    try {
      const response = await fetch(
        "https://ether-bill-server-1.onrender.com/api/update_password",
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ userEmail, newPassword }),
        }
      );

      if (!response.ok) {
        dispatch(setLoading());
        if (response.status == 503) {
          return toast.error("Service temporarily unavailable");
        } else if (response.status == 403) {
          return toast.error("Code does not match");
        } else if (response.status == 500) {
          return toast.error("Service temporarily unavailable");
        }
      } else {
        const { message } = await response.json();
        dispatch(setLoading());
        toast.success(message);
        navigate("/");
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error("Error occured");
    }
  };

  return (
    <>
      {/* <Header /> */}
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-purple-600 animate-spin z-30" />
          }
        />
      )}

      <div className="relative bg-gradient-to-br from-purple-200 to-gray-white  justify-between max-sm:justify-center flex">
        <div className="relative w-full  px-10 max-sm:hidden"></div>

        <div className="relative max-sm:px-1 bg-purple-500   w-3/4 max-sm:w-full max-sm:h-screen py-5 px-10  flex-col  flex justify-center items-center">
          <h1 className="text-2xl text-purple-500 font-bold mb-2">
            CREATE NEW PASSWORD
          </h1>
          <Input
            type="email"
            placeholder={"new password"}
            value={newPassword}
            required={true}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full outline-none border mb-2 px-2 py-1 lg:text-sm "
          />
          <Input
            type="text"
            placeholder={"comfirm password"}
            value={cPassword}
            required={true}
            onChange={(e) => setcPassword(e.target.value)}
            className="block w-full outline-none border mb-2 px-2 py-1 lg:text-sm "
          />

          <Button
            onClick={handleNewPasswordUpdate}
            className=" bg-gradient-to-r mt-4 from-purple-600 to-black flex justify-center items-center gap-2 text-white font-normal hover:text-gray-100 text-2xl border-none text-center py-1 hover:from-purple-700 hover:to-purple-900 transition duration-500 px-2 w-full"
          >
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
