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
                Create New Password
                </h1>
                <p className="text-slate-500 text-sm">Create a secure password for your account.</p>
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-xs font-bold uppercase tracking-wide ml-1">New Password</label>
                <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                required={true}
                onChange={(e) => setNewPassword(e.target.value)}
                className="clean-input w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
            </div>

             <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-xs font-bold uppercase tracking-wide ml-1">Confirm Password</label>
                <input
                type="password"
                placeholder="Confirm new password"
                value={cPassword}
                required={true}
                onChange={(e) => setcPassword(e.target.value)}
                className="clean-input w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
            </div>

            <button
                onClick={handleNewPasswordUpdate}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-violet-600 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] group"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    Reset Password
                </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
