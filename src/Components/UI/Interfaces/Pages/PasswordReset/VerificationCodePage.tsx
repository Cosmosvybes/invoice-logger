import { LoadingDashed } from "react-huge-icons/solid";
import Overlay from "../Subscription/_OverlayComp/Overlay";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import { setLoading } from "../../../../../States/Slices/wallet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../Tools/_helper/Formbuilder/Onboarding/AuthLayout";
import { Spinner } from "reactstrap";
import { ArrowRight } from "react-huge-icons/outline";

const VerificationCodePage = () => {
  const [code, setCode] = useState("");
  const { loading } = useAppSelector((store: any) => store.walletSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const codeVerificationHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const userEmail = localStorage.getItem("email");
    dispatch(setLoading());
    try {
      const response = await fetch(
        "https://ether-bill-server-1.onrender.com/api/verify_code",
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ code, userEmail }),
        }
      );

      if (!response.ok) {
        dispatch(setLoading());
        if (response.status == 403) {
          return toast.error("Code does not match");
        } else {
          return toast.error("Verification failed. Please try again.");
        }
      } else {
        const { message } = await response.json();
        dispatch(setLoading());
        toast.success(message);
        navigate("/new_password");
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <AuthLayout 
      title="Verify Identity" 
      subtitle="We've sent a 6-digit code to your email address"
    >
      {loading && (
        <Overlay>
          <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
        </Overlay>
      )}

      <form onSubmit={codeVerificationHandler} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">
            Verification Code
          </label>
          <input
            type="text"
            placeholder="000000"
            maxLength={6}
            value={code}
            required
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-black text-center tracking-[0.5em] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-slate-200 shadow-inner"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-violet-600 transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? <Spinner size="sm" color="light" /> : (
            <>
              Verify Code
              <ArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-2">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Wrong email address? <span className="text-violet-600 font-bold">Go back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerificationCodePage;
