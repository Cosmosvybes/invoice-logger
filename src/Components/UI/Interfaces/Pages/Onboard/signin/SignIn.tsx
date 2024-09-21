import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";
import useSigninController from "./controller";
const SignIn = () => {
  const { formFields, handleChange, handleSubmit, loading, formValues } =
    useSigninController();
  return (
    <>
      <div className="relative h-screen justify-between max-sm:justify-center flex">
        <div className="relative w-full border max-sm:hidden"></div>
        <div className="relative w-1/2 max-sm:w-full h-full  max-sm:shadow-md shadow-gray-50 flex justify-center items-center">
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
