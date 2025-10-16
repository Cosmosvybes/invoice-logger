import { ArrowRight } from "react-huge-icons/solid";
import { Button, Input, Spinner, Card, CardTitle } from "reactstrap";
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

  const FORM = formFields.map((_, i) => {
    switch (_.type) {
      case "checkbox":
        return;
      case "password":
        return (
          <div className="relative" key={i}>
            <label className="mb-1 text-purple-500 text-xs">
              {" "}
              {_.name}{" "}
              <p className="block text-xs text-gray-500">
                {_.name == "Password" &&
                  url.pathname != "/" &&
                  "Alphabet, number and special character  E.g Password123$ "}
              </p>
            </label>
            <div className="relative  py-0">
              <Input
                type={isPassWord ? "password" : "text"}
                placeholder={_.placeholder}
                value={formValues[_.name]}
                required={_.required}
                onChange={(e) => handleChange(e.target.value, _.name)}
                className="block w-full outline-none border mb-2 px-2 py-1 lg:text-sm"
              />
              {isPassWord ? (
                <EyeDisable
                  className=" absolute top-2 text-xl right-5"
                  onClick={handleShowPassword}
                />
              ) : (
                <Eye
                  className=" absolute top-2 text-xl right-5"
                  onClick={handleShowPassword}
                />
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative" key={i}>
            <label className="mb-1 text-purple-500 text-xs"> {_.name}</label>
            <Input
              type="text"
              placeholder={_.placeholder}
              value={formValues[_.name]}
              required={_.required}
              onChange={(e) => handleChange(e.target.value, _.name)}
              className="block w-full outline-none border mb-2 px-2 py-1 lg:text-sm "
            />
          </div>
        );
    }
  });

  return (
    <>
      <Card className="relative backdrop-blur-lg bg-gray-100 w-full border-none gap-2 z-10 px-2  max-sm:h-auto py-4">
        <CardTitle className="text-2xl font-bold text-purple-500">
          <p>
            {url.pathname == "/" || url.pathname != "/create/new/account"
              ? "Welcome back"
              : "Create new account "}{" "}
          </p>
          <strong className="text-purple-500 font-normal text-sm max-sm:text-sm">
            {url.pathname == "/"
              ? "Enter your email & password to continue"
              : "Enter your details here"}
          </strong>
        </CardTitle>

        <form onSubmit={(e) => handleSubmit(e)}>
          {FORM}
          <div className="relative max-md:py-2  max-sm:py-2 max-lg:py-2 w-full flex justify-between items-start gap-4">
            <Link
              to={"/reset_password"}
              className="text-xs max-sm:text-sm text-purple-500"
            >
              Forgot password ?
            </Link>
            {url.pathname == "/" || url.pathname != "/create/new/account" ? (
              <Link
                to={"/create/new/account"}
                className="text-xs  max-sm:text-sm text-purple-500 "
              >
                Create new account
              </Link>
            ) : (
              <Link
                to={"/"}
                className="text-xs flex flex-col   max-sm:text-sm text-purple-500"
              >
                Already have an account?
                <span className="text-purple-500 underline max-sm:text-[16px] text-xs font-extrabold">
                  {"Sign in"}
                </span>
              </Link>
            )}
          </div>

          <Button className=" bg-gradient-to-r mt-4 from-purple-600 to-black flex justify-center items-center gap-2 text-white font-bold hover:text-gray-100 text-2xl border-none text-center py-1 hover:from-purple-700 hover:to-purple-900 transition duration-500 px-2 w-full">
            {url.pathname == "/" ? "SIGN IN" : "SIGN UP"}
            {!isLoading ? (
              <ArrowRight className="inline text-2xl" />
            ) : (
              <Spinner type="grow" color="light" size={"sm"} />
            )}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default OBTemplate;
