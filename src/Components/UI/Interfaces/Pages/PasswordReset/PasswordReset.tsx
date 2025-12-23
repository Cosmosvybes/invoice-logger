 // import { Button, Input } from "reactstrap";
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
import { API_URL } from "../../../../constants/Index";
import { Link, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  // Generate a stable 6-digit code (100000-999999) to avoid leading zero issues
  const [verificationCode] = useState(String(Math.floor(100000 + Math.random() * 900000)));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { loading } = useAppSelector((store) => store.walletSlice);
  const dispatch = useAppDispatch();
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const passwordResetHandler = async () => {
    if (!email) return;

    dispatch(setLoading());
    setErrorDetails(null); // Clear previous errors

    try {
      // Render email template inside handler to ensure latest state
      const emailHtml = await render(
        <GeneralMailer verificationCode={Number(verificationCode)} />,
        { pretty: true }
      );

      const response = await fetch(
        `${API_URL}/api/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ 
            email, 
            userEmail: email, 
            recipient: email, // Common
            receipient: email, // Matches typo in InvoiceTemplate sending logic
            emailInstance: emailHtml, 
            htmlContent: emailHtml, 
            verificationCode 
          }),
        }
      );

      if (!response.ok) {
        dispatch(setLoading());
        
        // Capture detailed error for user debugging
        const errorData = await response.json().catch(() => ({}));
        const userMsg = errorData.response || response.statusText;
        const debugMsg = `${response.status}: ${userMsg}`;
        setErrorDetails(debugMsg);

        if (response.status === 503) {
          return toast.error("Service temporarily unavailable");
        } else if (response.status === 403) {
          return toast.error("Account does not exist");
        } else if (response.status === 500) {
          return toast.error("Connection error");
        } else {
             return toast.error(userMsg || "Failed to request code");
        }
      } else {
        const { message } = await response.json();
        dispatch(setLoading());
        toast.success(message || "Code sent successfully!");
        localStorage.setItem("email", email);
        navigate("/verification_code");
      }
    } catch (error: any) {
      dispatch(setLoading());
      console.error("Password Reset Error:", error);
      const debugMsg = error.message || "Network Error";
      setErrorDetails(debugMsg);
      toast.error("An error occurred while sending requests");
    }
  };

  return (
    <>
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
          }
        />
      )}

      <div className="w-full h-full min-h-screen flex justify-center items-center bg-slate-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 md:p-12 animate-fade-in-up">
          <div className="flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-3xl text-slate-900 font-extrabold mb-2 tracking-tight">
                Password Reset
                </h1>
                <p className="text-slate-500 text-sm">Enter the email associated with your account.</p>
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-xs font-bold uppercase tracking-wide ml-1">Email Address</label>
                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                className="clean-input w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
            </div>

            <button
                onClick={() => passwordResetHandler()}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-violet-600 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] group"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    Request Code
                </span>
            </button>

             {errorDetails && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-left animate-fade-in">
                    <p className="text-red-800 text-xs font-bold mb-1">Server Error Details:</p>
                    <code className="text-[10px] text-red-600 font-mono break-all block">
                        {errorDetails}
                    </code>
                    <p className="text-[10px] text-red-500 mt-1 italic">
                        (If this says "500", the email server is failing)
                    </p>
                </div>
            )}

            <div className="relative mt-4 flex justify-center w-full text-center border-t border-slate-100 pt-6">
                <p className="text-slate-500 text-sm">
                    Remember your password?
                    <Link
                    to={"/"}
                    className="text-violet-600 font-bold hover:text-violet-800 transition-colors ml-1"
                    >
                    Sign in
                    </Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
