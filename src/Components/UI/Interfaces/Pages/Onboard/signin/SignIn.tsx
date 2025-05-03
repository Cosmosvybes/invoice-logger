import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";

import useSigninController from "./controller";
const SignIn = () => {
  const { formFields, handleChange, handleSubmit, loading, formValues } =
    useSigninController();
  return (
    <>
      <Header />
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-white  justify-between max-sm:justify-center flex">
        {" "}
        <div className="relative w-full  px-10 max-sm:hidden"></div>
        <div className="relative max-sm:px-1   w-1/2 max-sm:w-full h-full py-5 px-10   flex justify-center items-center">
          <OBTemplate
            isLoading={loading}
            handleSubmit={handleSubmit}
            formFields={formFields}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
