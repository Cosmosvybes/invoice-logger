import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeDisable } from "react-huge-icons/outline";
import { LoadingDashed } from "react-huge-icons/solid";
import { useState } from "react";
import AuthLayout from "../../../../Tools/_helper/Formbuilder/Onboarding/AuthLayout";
import useSignUpController from "./controller";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import Overlay from "../../Subscription/_OverlayComp/Overlay";
import { Spinner } from "reactstrap";

const Signup = () => {
  const { handleChange, handleSubmit, formValues } = useSignUpController();
  const { loading } = useAppSelector((store: any) => store.walletSlice);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Start your 30-day free trial. No credit card required."
    >
      {loading && (
        <Overlay>
           <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
        </Overlay>
      )}
      
      <form onSubmit={(e: any) => handleSubmit(e)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
            <input
              type="text"
              placeholder="John"
              value={formValues["Firstname"]}
              required
              onChange={(e) => handleChange(e.target.value, "Firstname")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={formValues["Lastname"]}
              required
              onChange={(e) => handleChange(e.target.value, "Lastname")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
           <input
              type="email"
              placeholder="john@example.com"
              value={formValues["Email"]}
              required
              onChange={(e) => handleChange(e.target.value, "Email")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formValues["Password"]}
              required
              onChange={(e) => handleChange(e.target.value, "Password")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeDisable className="text-lg" /> : <Eye className="text-lg" />}
            </button>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formValues["Confirm Password"]}
              required
              onChange={(e) => handleChange(e.target.value, "Confirm Password")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <p className="text-[10px] text-slate-400 leading-tight">
          Use at least 8 characters with a mix of letters, numbers & symbols.
        </p>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-violet-600 transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? <Spinner size="sm" color="light" /> : (
            <>
                Create Account
                <ArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-2">
           <p className="text-sm text-slate-500">
             Already have an account?{" "}
             <Link to="/" className="text-violet-600 font-bold hover:underline">Sign in</Link>
           </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
