// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";

import useSigninController from "./controller";
const SignIn = () => {
  const { formFields, handleChange, handleSubmit, loading, formValues } =
    useSigninController();
  return (
    <>
      {/* <Header /> */}
      <div className="relative bg-gradient-to-br from-purple-50 h-full  to-gray-white max-sm:h-screen  justify-start max-sm:justify-start flex">
        {" "}
        <div className="relative w-full  px-5 max-sm:hidden"></div>
        <div className="relative max-sm:px-1 bg-gray-100  w-3/4 max-sm:w-full h-full py-5 px-10  flex justify-start items-start ">
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
