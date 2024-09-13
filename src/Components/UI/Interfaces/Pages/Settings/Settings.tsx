import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

import useSettingsController from "./controller";
import InputProvider from "../../../Tools/_helper/Formbuilder/Settings/InputProvider";
import { Button } from "reactstrap";
const Settings = () => {
  const {
    settingsSchema,
    personalizationSchema,
    fieldsValue,
    handleChange,
    handleSubmit,
    subscriptionSchema,
    businessDetails,
    settings,
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
            schema={subscriptionSchema}
            data={fieldsValue}
            title="Subscription Management"
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
        </div>
        <div className="relative h-52 w-full flex justify-start max-sm:justify-end mt-2 px-2 items-center">
          <Button
            onClick={handleSubmit}
            color="primary"
            className="w-52 max-sm:w-44"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default Settings;
