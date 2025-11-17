import { Button, Input } from "reactstrap";
import useModalController from "../../../InvoiceModal/controller";
import useClientFormController from "./client.form.controller";
import Overlay from "../../../../Interfaces/Pages/Subscription/_OverlayComp/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";

const ClientFormBuilder = () => {
  const { newCLientsFormField } = useModalController();

  const { formValues, updateClientForm, handleAddNewClient, loading } =
    useClientFormController();

  const CLIENT_FORM = newCLientsFormField.map((_, i) => {
    switch (_.type) {
      case "email":
        return (
          <div className="relative block " key={i}>
            <p className="text-sm">{_.placeholder}</p>
            <Input
              className="border border-gray-300 w-full outline-none rounded-md px-1 max-sm:py-2 py-2 lg:text-sm"
              type={"email"}
              placeholder={_.placeholder}
              value={formValues[_.name]}
              name={_.name}
              onChange={(e) => updateClientForm(e.target.value, _.name)}
              required={true}
            />
          </div>
        );

      default:
        return (
          <div className="relative block " key={i}>
            <p className="text-sm">{_.placeholder}</p>
            <Input
              className="border border-gray-300 w-full outline-none rounded-md px-1 max-sm:py-2 py-2 lg:text-sm"
              type={"text"}
              placeholder={_.placeholder}
              value={formValues[_.name]}
              name={_.name}
              onChange={(e) => updateClientForm(e.target.value, _.name)}
              required={true}
            />
          </div>
        );
    }
  });

  return (
    <>
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-purple-600 animate-spin z-30" />
          }
        />
      )}

      <div className="relative block  max-sm:text-sm">
        <p>Adding a client makes it easy to send them invoice.</p>
      </div>
      <div className="relative grid grid-cols-1 gap-2 mt-2 max-sm:grid-cols-1 ">
        {CLIENT_FORM}
      </div>
      <div className="relative flex mt-3 gap-2  pb-5 w-1/2 max-sm:w-full max-md:w-full justify-start  max-sm:justify-end">
        <Button
          onClick={() => history.back()}
          className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[14px]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddNewClient}
          className=" rounded-md gap-2  flex justify-between items-center p-2 bg-purple-900 text-white  h-10  text-[14px]"
        >
          Add client
        </Button>
      </div>
    </>
  );
};

export default ClientFormBuilder;
