import Overlay from "../../../Tools/Layout/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "../../../Tools/_helper/Formbuilder/Onboarding/AuthLayout";
import { Spinner } from "reactstrap";
import { ArrowRight, Eye, EyeDisable } from "react-huge-icons/outline";
import { API_URL } from "../../../../../Components/constants/Index";

const NewPassword = () => {
  const [loading, setLoadingLocal] = useState(false);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useAppDispatch();

  const handleNewPasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !cPassword) return;
    if (newPassword !== cPassword)
      return toast.warning("Passwords do not match");

    const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!pattern.test(newPassword)) {
      return toast.warn("Password must be at least 8 characters and include both letters and numbers");
    }

    const userEmail = localStorage.getItem("email");
    setLoadingLocal(true);

    try {
      const response = await fetch(
        `${API_URL}/api/update_password`,
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ userEmail, newPassword }),
        }
      );

      if (!response.ok) {
        setLoadingLocal(false);
        return toast.error("Failed to update password. Try again.");
      } else {
        const { message } = await response.json();
        setLoadingLocal(false);
        toast.success(message);
        navigate("/");
      }
    } catch (error) {
      setLoadingLocal(false);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <AuthLayout 
      title="Create New Password" 
      subtitle="Ensure your new password is secure and unique"
    >
      {loading && (
        <Overlay>
          <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
        </Overlay>
      )}

      <form onSubmit={handleNewPasswordUpdate} className="space-y-6">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeDisable className="text-xl" /> : <Eye className="text-xl" />}
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={cPassword}
            required
            onChange={(e) => setcPassword(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-violet-600 transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? <Spinner size="sm" color="light" /> : (
            <>
              Reset Password
              <ArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default NewPassword;
