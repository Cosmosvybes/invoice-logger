import { useState } from "react";
import { toast } from "react-toastify";
import { add } from "../../../../../../States/Slices/ClientSlice/clientSlice";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import useModalController from "../../../InvoiceModal/controller";

type FormValues = {
  [key: string]: string;
};

export default function useClientFormController() {
  const { newCLientsFormField } = useModalController();
  const dispatch = useAppDispatch();

  let clientFormValues = newCLientsFormField.reduce(
    (allInfo, currInfo) => ({
      ...allInfo,
      [currInfo.name]: currInfo.value,
    }),
    {}
  );

  const [formValues, setFormValues] = useState<FormValues>(clientFormValues);

  const updateClientForm = (newValue: string, inputName: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [inputName]: newValue,
    }));
  };

  const handleAddNewClient = () => {
    const { Name, Email, City_Postal_State, Country, Address } = formValues;
    dispatch(
      add({
        name: Name,
        email: Email,
        address: Address,
        country: Country,
        cityStatePostal: City_Postal_State,
        id: Date.now(),
      })
    );
    Object.keys(clientFormValues).map((name) => updateClientForm("", name));
    toast.success("New Client added", { theme: "light" }); //clear input values
  };

  return {
    formValues,
    updateClientForm,
    handleAddNewClient,
  };
}
