import { LoadingDashed } from "react-huge-icons/solid";
import Header from "../../../Tools/_helper/Formbuilder/Common/Header/Header";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import { Button, Input } from "reactstrap";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import { setLoading } from "../../../../../States/Slices/wallet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerificationCodePage = () => {
  const [code, setCode] = useState("");
  const { loading } = useAppSelector((store) => store.walletSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const codeVerificationHandler = async () => {
    if (!code) return;
    const userEmail = localStorage.getItem("email");
    dispatch(setLoading());
    // console.log(userEmail, code);
    try {
      const response = await fetch("http://localhost:8080/api/verify_code", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ code, userEmail }),
      });

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
        navigate("/new_password");
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error("Error occured");
    }
  };

  return (
    <>
      <Header />
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-purple-600 animate-spin z-30" />
          }
        />
      )}

      <div className="relative bg-gradient-to-br from-purple-200 to-gray-white  justify-between max-sm:justify-center flex">
        <div className="relative w-full  px-10 max-sm:hidden"></div>

        <div className="relative max-sm:px-1   w-1/2 max-sm:w-full h-[calc(100vh-100px)] py-5 px-10  flex-col  flex justify-center items-center">
          <h1 className="text-2xl text-purple-700 font-extrabold mb-2">
            VERIFICATION CODE{" "}
          </h1>
          <Input
            type="number"
            placeholder={" verification code here"}
            value={code}
            required={true}
            onChange={(e) => setCode(e.target.value)}
            className="block w-full outline-none text-center border mb-2 px-2 py-3"
          />

          <Button
            onClick={codeVerificationHandler}
            className=" bg-gradient-to-r mt-4 from-purple-600 to-black flex justify-center items-center gap-2 text-white font-normal hover:text-gray-100 text-2xl border-none text-center py-3 hover:from-purple-700 hover:to-purple-900 transition duration-500 px-2 w-full"
          >
            SUBMIT CODE
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerificationCodePage;
