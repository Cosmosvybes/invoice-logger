import { useState } from "react";
import useModalController from "../../InvoiceModal/controller";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import { add } from "../../../../../States/Slices/ClientSlice/clientSlice";

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
    Object.keys(clientFormValues).map((name) => updateClientForm("", name)); //clear input values
  };

  return {
    formValues,
    updateClientForm,
    handleAddNewClient,
  };
}
