import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Button, Spinner } from "reactstrap";
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
        <div className="relative h-52 max-sm:h-20 w-full flex justify-start max-sm:justify-end mt-2 max-sm:mt-1 px-2 items-center">
          <Button
            onClick={handleSubmit}
            color="dark"
            className="w-52 flex justify-center items-center max-sm:w-auto font-bold py-2"
          >
            {loading && (
              <Spinner type="grow" color="light" size="sm" className="inline" />
            )}{" "}
            save settings
          </Button>
        </div>
      </div>
    </>
  );
};

export default Settings;
