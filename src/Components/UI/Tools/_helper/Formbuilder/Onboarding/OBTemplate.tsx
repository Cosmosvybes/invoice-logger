import { ArrowRight } from "react-huge-icons/solid";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { Eye, EyeDisable } from "react-huge-icons/outline";
import { useState } from "react";

const OBTemplate = ({
  formFields,
  handleChange,
  formValues,
  handleSubmit,
  isLoading,
}: {
  formFields: {
    id: number;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    required: boolean;
  }[];
  formValues: { [key: string]: string };
  handleChange(value: string, inputName: string): void;
  handleSubmit(e: any): void;
  isLoading: boolean;
}) => {
  const [isPassWord, setIsPassword] = useState(true);
  const handleShowPassword = () => {
    setIsPassword(!isPassWord);
  };
  const url = new URL(location.href);

  // Helper to determine column span
  const isSignUp = formFields.some(field => field.name === "Confirm Password");
  
  const getColSpan = (name: string) => {
    if (!isSignUp) return "col-span-2"; // Sign In: all full width
    
    const halfWidthFields = ["Firstname", "Lastname", "Password", "Confirm Password"];
    return halfWidthFields.includes(name) ? "col-span-2 md:col-span-1" : "col-span-2";
  };

  const FORM = formFields.map((_, i) => {
    const colSpan = getColSpan(_.name);
    
    switch (_.type) {
      case "checkbox":
        return null;
      case "password":
        return (
          <div className={`relative ${colSpan}`} key={i}>
            <label className="mb-2 block text-violet-700 text-xs font-bold tracking-wide uppercase">
              {_.name}
            </label>
            <div className="relative">
              <input
                type={isPassWord ? "password" : "text"}
                placeholder={_.placeholder}
                value={formValues[_.name]}
                required={_.required}
                onChange={(e) => handleChange(e.target.value, _.name)}
                className="block w-full glass-input rounded-lg px-4 py-3 text-sm h-11 text-slate-900 placeholder:text-slate-500 border border-slate-300/50"
              />
              <div 
                className="absolute top-3 right-4 text-slate-500 cursor-pointer hover:text-violet-600 transition-colors"
                onClick={handleShowPassword}
              >
                {isPassWord ? <EyeDisable className="text-xl" /> : <Eye className="text-xl" />}
              </div>
            </div>
             {_.name == "Password" && url.pathname != "/" && (
                <p className="block mt-1 text-[10px] text-slate-500 leading-tight">
                  Alphabet, number & special char (e.g. Pass123$)
                </p>
             )}
          </div>
        );

      default:
        return (
          <div className={`relative ${colSpan}`} key={i}>
            <label className="mb-2 block text-violet-700 text-xs font-bold tracking-wide uppercase"> {_.name}</label>
            <input
              type="text"
              placeholder={_.placeholder}
              value={formValues[_.name]}
              required={_.required}
              onChange={(e) => handleChange(e.target.value, _.name)}
              className="block w-full glass-input rounded-lg px-4 py-3 text-sm h-11 text-slate-900 placeholder:text-slate-500 border border-slate-300/50"
            />
          </div>
        );
    }
  });

  return (
    <>
      <div className="relative glass-heavy w-full h-full min-h-screen border-none flex flex-col justify-center p-8 md:p-12 border border-slate-200/50 backdrop-blur-2xl">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {url.pathname == "/" || url.pathname != "/create/new/account"
                ? "Welcome back"
                : "Create Account"}
            </h2>
            <p className="text-slate-500 text-xs font-medium">
                {url.pathname == "/"
                ? "Enter your email & password to continue"
                : "Enter your details to get started"}
            </p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
           <div className="grid grid-cols-2 gap-6 mb-6">
              {FORM}
           </div>
          
          <div className="flex justify-end mb-4">
               <Link
                to={"/reset_password"}
                className="text-xs text-violet-600 font-bold hover:text-violet-800 transition-colors"
              >
                Forgot Password?
              </Link>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-violet-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 group border border-white/10">
            {url.pathname == "/" ? "Sign In" : "Sign Up"}
            {!isLoading ? (
              <ArrowRight className="inline text-xl group-hover:translate-x-1 transition-transform" />
            ) : (
              <Spinner type="grow" color="light" size={"sm"} />
            )}
          </button>
          
          <div className="pt-4 text-center border-t border-slate-200/50 mt-4">
            {url.pathname == "/" || url.pathname != "/create/new/account" ? (
               <p className="text-slate-500 text-xs">
                Don't have an account?{" "}
                <Link
                    to={"/create/new/account"}
                    className="text-violet-600 font-bold hover:text-violet-800 transition-colors ml-1"
                >
                    Create one
                </Link>
               </p>
            ) : (
               <p className="text-slate-500 text-xs">
                Already have an account?{" "}
                <Link
                    to={"/"}
                    className="text-violet-600 font-bold hover:text-violet-800 transition-colors ml-1"
                >
                    Sign in
                </Link>
               </p>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-[10px] font-mono">
            STEADYBILL v1.0.0
          </p>
        </div>
      </div>
    </>
  );
};

export default OBTemplate;
