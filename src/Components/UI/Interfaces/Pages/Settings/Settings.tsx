import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Spinner } from "reactstrap";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
// import Spinner_ from "../../../Tools/_helper/Loader/Spinner";
const Settings = () => {
  const {
    settingsSchema,
    personalizationSchema,
    fieldsValue,
    subscriptionSchema,
    businessDetails,
    settings,
    handleChange,
    handleSubmit,
    loading,
  } = useSettingsController();
  return (
    <>
      <div className="relative px-28 max-sm:px-0 h-auto">
        <BreadCrumb title="Settings" useLink={false} linkTitle="" />
        <br/>
        <div className="relative w-full grid grid-cols-3 max-sm:grid-cols-1 px-2 gap-5 max-sm:gap-3  h-auto max-sm:h-auto ">
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={personalizationSchema}
            data={fieldsValue}
            title="User Preferences"
            handleChange={handleChange}
          />

          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={[...settingsSchema, ...businessDetails]}
            data={fieldsValue}
            title="Profile & Account Info"
            handleChange={handleChange}
          />
          <InputProvider
            settings={settings}
            handleSubmit={handleSubmit}
            schema={subscriptionSchema}
            data={fieldsValue}
            title="Subscription Management"
            handleChange={handleChange}
          />
        </div>
        <div className="relative h-52 max-sm:h-20 w-full flex justify-start max-sm:justify-end mt-2 max-sm:mt-1 px-1 max-sm:px-4 items-center">
          <button
            className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[14px]"
            onClick={handleSubmit}
          >
            {loading && (
              <Spinner type="grow" color="light" size="md" className="inline" />
            )}{" "}
            save settings
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Settings);
