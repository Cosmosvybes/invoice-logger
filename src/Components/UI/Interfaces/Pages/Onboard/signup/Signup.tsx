import { LoadingDashed } from "react-huge-icons/solid";
// import logo from "../../../../../../assets/HatchfulExport-All(1) (2)/logo_transparent.png";
// import Header from "../../../../Tools/_helper/Formbuilder/Common/Header/Header";
import OBTemplate from "../../../../Tools/_helper/Formbuilder/Onboarding/OBTemplate";
import Overlay from "../../Subscription/_OverlayComp/Overlay";
import useSignUpController from "./controller";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
const Signup = () => {
  //
  const { handleChange, handleSubmit, formValues, formFields } =
    useSignUpController();
  const { loading } = useAppSelector((store) => store.walletSlice);
  return (
    <>
      {/* <Header /> */}

      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-purple-600 animate-spin z-30" />
          }
        />
      )}
      <div className="relative bg-gradient-to-br   to-gray-white  h-full max-sm:h-screen justify-start max-sm:justify-between flex">
        <div className="relative w-full  px-10 max-sm:hidden"></div>

        <div className="relative max-sm:px-1 bg-gray-100  w-3/4 max-sm:w-full h-full  px-10  flex justify-start items-start">
          <OBTemplate
            isLoading={loading}
            handleSubmit={handleSubmit}
            formFields={formFields}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
        {/* <div className="relative h-auto max-sm:h-auto flex justify-start">
          <img
            src={logo}
            alt="image-logo"
            className="w-44 h-24 object-contain"
          />
        </div> */}
      </div>
    </>
  );
};

export default Signup;
