import { useState } from "react";
import { toast } from "react-toastify";
import { render } from "@react-email/components";

import Overlay from "../../../Tools/Layout/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";
import GeneralMailer from "../../../../EMAIL/GeneralMailer";
import { API_URL } from "../../../../constants/Index";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../Tools/_helper/Formbuilder/Onboarding/AuthLayout";
import { Spinner } from "reactstrap";
import { ArrowRight } from "react-huge-icons/outline";

const PasswordReset = () => {
  const [verificationCode] = useState(String(Math.floor(100000 + Math.random() * 900000)));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoadingLocal] = useState(false);
  // const dispatch = useAppDispatch();
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const passwordResetHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoadingLocal(true);
    setErrorDetails(null);

    try {
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
            recipient: email,
            receipient: email,
            emailInstance: emailHtml, 
            htmlContent: emailHtml, 
            verificationCode 
          }),
        }
      );

      if (!response.ok) {
        setLoadingLocal(false);
        const errorData = await response.json().catch(() => ({}));
        const userMsg = errorData.response || response.statusText;
        setErrorDetails(`${response.status}: ${userMsg}`);

        if (response.status === 403) {
          return toast.error("Account does not exist");
        } else {
             return toast.error(userMsg || "Failed to request code");
        }
      } else {
        const { message } = await response.json();
        setLoadingLocal(false);
        toast.success(message || "Code sent successfully!");
        localStorage.setItem("email", email);
        navigate("/verification_code");
      }
    } catch (error: any) {
      setLoadingLocal(false);
      console.error("Password Reset Error:", error);
      setErrorDetails(error.message || "Network Error");
      toast.error("An error occurred while sending requests");
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a verification code"
    >
      {loading && (
        <Overlay>
          <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
        </Overlay>
      )}

      <form onSubmit={passwordResetHandler} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-violet-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <Spinner size="sm" color="light" />
          ) : (
            <>
              Request Code
              <ArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {errorDetails && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg animate-fade-in">
            <p className="text-red-700 text-[10px] font-bold uppercase mb-1 tracking-tight">System Message</p>
            <code className="text-[10px] text-red-500 font-mono break-all">{errorDetails}</code>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="text-sm text-slate-500">
            Remembered your password?{" "}
            <Link to="/" className="text-violet-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default PasswordReset;
