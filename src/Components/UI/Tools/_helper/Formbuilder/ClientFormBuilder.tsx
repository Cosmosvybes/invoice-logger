import { Button, Input } from "reactstrap";
import useModalController from "../../InvoiceModal/controller";
import useClientFormController from "./client.form.controller";

const ClientFormBuilder = () => {
  const { newCLientsFormField } = useModalController();

  const { formValues, updateClientForm, handleAddNewClient } =
    useClientFormController();

  const CLIENT_FORM = newCLientsFormField.map((_, i) => (
    <div className="relative block " key={i}>
      <p>{_.placeholder}</p>
      <Input
        className="border border-gray-300 w-full outline-none rounded-md px-3 max-sm:py-4 py-5 "
        type={"text"}
        placeholder={_.placeholder}
        value={formValues[_.name]}
        name={_.name}
        onChange={(e) => updateClientForm(e.target.value, _.name)}
      />
    </div>
  ));

  return (
    <>
      <div className="relative block px-4 max-sm:text-sm mt-2">
        <p>Adding a client makes it easy to send them invoice.</p>
      </div>
      <div className="relative px-4  grid grid-cols-2 gap-7 mt-5 max-sm:grid-cols-1 ">
        {CLIENT_FORM}
      </div>
      <div className="relative flex mt-4  gap-3  px-4 w-1/2 max-sm:w-full max-md:w-full justify-start  max-sm:justify-end">
        <Button
          onClick={() => history.back()}
          className="bg-transparent w-1/6 max-sm:w-auto max-sm:py-3 py-5  border px-3 rounded-md text-gray-900"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleAddNewClient()}
          className="bg-black w-1/6 max-sm:w-auto max-sm:py-2 py-5 px-3 rounded-md text-white"
        >
          Add client
        </Button>
      </div>
    </>
  );
};

export default ClientFormBuilder;
