// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";

import useSigninController from "./controller";
const SignIn = () => {
  const { formFields, handleChange, handleSubmit, loading, formValues } =
    useSigninController();
  return (
    <>
      <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-full h-full min-h-screen">
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
