import { Button, Input } from "reactstrap";
// import Header from "../../../Tools/_helper/Formbuilder/Common/Header/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import { render } from "@react-email/components";
import { setLoading } from "../../../../../States/Slices/wallet";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";
import GeneralMailer from "../../../../EMAIL/GeneralMailer";
import { Link, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const verificationCode = String(Date.now()).slice(9, 17);
  const navigate = useNavigate();

  const emailHtml = render(
    <GeneralMailer verificationCode={Number(verificationCode)} />,
    {
      pretty: true,
    }
  );

  const [email, setEmail] = useState("");
  const { loading } = useAppSelector((store) => store.walletSlice);
  const dispatch = useAppDispatch();

  const passwordResetHandler = async (emailTemplate: any) => {
    const emailInstance = await emailTemplate;
    if (!email) return;
    // e.preventDefault();
    dispatch(setLoading());
    try {
      const response = await fetch(
        "https://ether-bill-server-1.onrender.com/api/reset-password",
        //https://ether-bill-server-1.onrender.com
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ email, emailInstance, verificationCode }),
        }
      );

      if (!response.ok) {
        dispatch(setLoading());
        if (response.status == 503) {
          return toast.error("Service temporarily unavailable");
        } else if (response.status == 403) {
          return toast.error("Account does not exist");
        } else if (response.status == 500) {
          return toast.error("Connection error");
        }
      } else {
        const { message } = await response.json();
        dispatch(setLoading());
        toast.success(message);
        navigate("/verification_code");
        localStorage.setItem("email", email);
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

        <div className="relative max-sm:px-1 max-sm:h-screen bg-gray-100   w-3/4 max-sm:w-full h-screen py-5 px-10  flex-col  flex justify-center items-start">
          <h1 className="text-2xl text-purple-500 font-bold mb-2 ">
            Password reset
          </h1>
          <Input
            type="email"
            placeholder={"Enter your email"}
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full outline-none py-2 border mb-2 px-2 py-1 lg:text-sm "
          />

          <Button
            onClick={() => passwordResetHandler(emailHtml)}
            className=" bg-gradient-to-r mt-4 from-purple-600 to-black flex justify-center items-center gap-2 text-white font-normal hover:text-gray-100 text-2xl border-none text-center py-1 hover:from-purple-700 hover:to-purple-900 transition duration-500 px-2 w-full"
          >
            Request code
          </Button>
          <div className="relative mt-2 max-sm:mt-5 flex justify-right w-full">
            <Link
              to={"/"}
              className="text-sm flex max-sm:text-sm  text-[14px] text-xs text-purple-500"
            >
              Already have an account?
              <span className="text-purple-500 text-xs max-sm:text-sm text-[16px] ml-3 underline">
                {"Sign in"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
