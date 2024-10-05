import { ArrowRight } from "react-huge-icons/outline";
import { Button, Input, Spinner, Card, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { Eye, EyeDisable } from "react-huge-icons/bulk";
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

  const FORM = formFields.map((_, i) => {
    switch (_.type) {
      case "checkbox":
        return;
      case "password":
        return (
          <div className="relative" key={i}>
            <label className="mb-1 text-green-600 text-xl"> {_.name}</label>
            <div className="relative  py-0">
              <Input
                type={isPassWord ? "password" : "text"}
                placeholder={_.placeholder}
                value={formValues[_.name]}
                required={_.required}
                onChange={(e) => handleChange(e.target.value, _.name)}
                className="block w-full outline-none border mb-2 px-2 py-3"
              />
              {isPassWord ? (
                <EyeDisable
                  className=" absolute top-5 text-2xl right-5"
                  onClick={handleShowPassword}
                />
              ) : (
                <Eye
                  className=" absolute top-5 text-2xl right-5"
                  onClick={handleShowPassword}
                />
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative" key={i}>
            <label className="mb-1 text-green-600 text-xl"> {_.name}</label>
            <Input
              type="text"
              placeholder={_.placeholder}
              value={formValues[_.name]}
              required={_.required}
              onChange={(e) => handleChange(e.target.value, _.name)}
              className="block w-full outline-none border mb-2 px-2 py-3"
            />
          </div>
        );
    }
  });

  return (
    <>
      <Card className="relative w-full border-none gap-4 shadow-lg px-4  max-sm:h-auto py-4">
        <CardTitle className="text-2xl font-bold text-green-600">
          <p> Sign in to your account </p>
          <p className="text-gray-400 font-normal text-sm max-sm:text-sm">
            {" "}
            Enter your email & password
          </p>
        </CardTitle>

        <form onSubmit={(e) => handleSubmit(e)}>
          {FORM}
          <Link to={"/"} className="text-xl max-sm:text-sm text-green-600 mb-2">
            Forgot password ?
          </Link>
          <Button className=" bg-gradient-to-r from-green-600 to-black mt-3 flex justify-center items-center gap-2 text-white font-bold text-2xl border-none text-center py-2 px-2 w-full">
            SIGN IN{" "}
            {!isLoading ? (
              <ArrowRight className="inline text-4xl" />
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
