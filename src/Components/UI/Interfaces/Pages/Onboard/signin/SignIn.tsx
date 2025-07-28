// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";

import useSigninController from "./controller";
const SignIn = () => {
  const { formFields, handleChange, handleSubmit, loading, formValues } =
    useSigninController();
  return (
    <>
      {/* <Header /> */}
      <div className="relative bg-gradient-to-br from-purple-200  to-gray-white  justify-center max-sm:justify-center flex">
        {" "}
        <div className="relative w-full  px-5 max-sm:hidden"></div>
        <div className="relative max-sm:px-1 bg-gray-100  w-3/4 max-sm:w-full h-screen py-5 px-10  flex justify-center items-center">
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
