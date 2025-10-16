import { Button, Input } from "reactstrap";
import useModalController from "../../../InvoiceModal/controller";
import useClientFormController from "./client.form.controller";

const ClientFormBuilder = () => {
  const { newCLientsFormField } = useModalController();

  const { formValues, updateClientForm, handleAddNewClient } =
    useClientFormController();

  const CLIENT_FORM = newCLientsFormField.map((_, i) => {
    switch (_.type) {
      case "email":
        return (
          <div className="relative block " key={i}>
            <p>{_.placeholder}</p>
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
            <p>{_.placeholder}</p>
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
      <div className="relative block  max-sm:text-sm mt-2">
        <p>Adding a client makes it easy to send them invoice.</p>
      </div>
      <div className="relative grid grid-cols-1 gap-2 mt-5 max-sm:grid-cols-1 ">
        {CLIENT_FORM}
      </div>
      <div className="relative flex mt-4  gap-5  pb-5 w-1/2 max-sm:w-full max-md:w-full justify-start  max-sm:justify-end">
        <Button
          onClick={() => history.back()}
          className="bg-purple-500 text-white w-32 text-sm max-sm:w-auto max-sm:py-3 py-2  border px-3 rounded-md text-gray-900"
        >
          Cancel
        </Button>
        <Button className="bg-purple-500 text-white w-32 text-sm max-sm:w-auto max-sm:py-3 py-2  border px-3 rounded-md text-gray-900">
          Add client
        </Button>
      </div>
    </>
  );
};

export default ClientFormBuilder;
