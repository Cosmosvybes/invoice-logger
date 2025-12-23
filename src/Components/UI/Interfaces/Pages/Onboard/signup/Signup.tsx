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
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-violet-500 animate-spin z-30" />
          }
        />
      )}
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

export default Signup;
