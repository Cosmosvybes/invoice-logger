import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeDisable } from "react-huge-icons/outline";
import { useState } from "react";
import AuthLayout from "../../../../Tools/_helper/Formbuilder/Onboarding/AuthLayout";
import useSigninController from "./controller";
import { Spinner } from "reactstrap";

const SignIn = () => {
  const { formValues, handleChange, handleSubmit, loading } = useSigninController();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your dashboard"
    >
      <form onSubmit={(e: any) => handleSubmit(e)} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            value={formValues["Email"]}
            required
            onChange={(e) => handleChange(e.target.value, "Email")}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <Link to="/reset_password" title="reset password"  className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formValues["Password"]}
              required
              onChange={(e) => handleChange(e.target.value, "Password")}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeDisable className="text-xl" /> : <Eye className="text-xl" />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:bg-violet-600 hover:shadow-violet-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <Spinner size="sm" color="light" />
          ) : (
            <>
              Sign In
              <ArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-2">
          <p className="text-sm text-slate-500">
            New here?{" "}
            <Link to="/create/new/account" className="text-violet-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
