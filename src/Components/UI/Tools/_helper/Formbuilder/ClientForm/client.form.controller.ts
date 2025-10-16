import { useState } from "react";
import { toast } from "react-toastify";
import { add } from "../../../../../../States/Slices/ClientSlice/clientSlice";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import useModalController from "../../../InvoiceModal/controller";
import { API_URL } from "../../../../../constants/Index";

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

  const token = localStorage.getItem("token");
  const handleAddNewClient = async () => {
    let hasEmptyStr = Object.values(formValues).find((val) => val == "");

    if (hasEmptyStr != undefined) {
      toast.warn("Incomplete client details", { theme: "colored" });
      return;
    }
    const { Name, Email, City_Postal_State, Country, Address } = formValues;
    const client = {
      name: Name,
      email: Email,
      address: Address,
      country: Country,
      cityStatePostal: City_Postal_State,
      id: Date.now(),
    };
    // https://ether-bill-server-1.onrender.com
    const response = await fetch(`${API_URL}/api/client/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) {
      // location.replace("/");
    }
    toast.success("New Client added", { theme: "light" });
    Object.keys(clientFormValues).map((name) => updateClientForm("", name));
    return dispatch(add({ ...client })); //clear input values
  };

  return {
    formValues,
    updateClientForm,
    handleAddNewClient,
  };
}
