import { useState } from "react";
import { toast } from "react-toastify";
import { add } from "../../../../../../States/Slices/ClientSlice/clientSlice";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import useModalController from "../../../InvoiceModal/controller";
import { API_URL } from "../../../../../constants/Index";
import { useNavigate } from "react-router-dom";

type FormValues = {
  [key: string]: string;
};

export default function useClientFormController() {
  const { newCLientsFormField } = useModalController();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      if (response.status === 403) {
        navigate("/subscription/payment");
      }
      // location.replace("/");
    } else toast.success("New Client added", { theme: "light" });
    Object.keys(clientFormValues).map((name) => updateClientForm("", name));
    setLoading(false);
    return dispatch(add({ ...client })); //clear input values
  };

  return {
    loading,
    formValues,
    updateClientForm,
    handleAddNewClient,
  };
}
