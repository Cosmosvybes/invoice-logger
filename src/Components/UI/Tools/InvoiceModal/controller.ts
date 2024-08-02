import { useState } from "react";
import { objectType, reciept } from "./interface";

export default function useModalController() {
  const form: objectType[] = [
    {
      id: 1,
      value: "",
      name: "User",
      labelName: "Invoice To",
      placeholder: "Client/User",
    },
    {
      id: 2,
      value: "",
      name: "Description",
      labelName: "Description",
      placeholder: "Invoice Description",
    },
    {
      id: 3,
      value: "",
      name: "Amount",
      labelName: "Amount",
      placeholder: "Amount",
    },
    {
      id: 6,
      value: "",
      name: "IssuedBy",
      labelName: "Issued By",
      placeholder: "Issued By",
    },
  ];

  //get input values
  const inputValues: any = () => {
    let formValues = form.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr.value,
      }),
      {}
    );
    return formValues;
  };

  const [allValues, setAllValues] = useState(inputValues);

  function updateValues(newValue: string, inputName: string) {
    setAllValues((prevValue: reciept) => ({
      ...prevValue,
      [inputName]: newValue,
    }));
    console.log(allValues);
  }

  function handleSubmit() {
    console.log(allValues);
  }

  return {
    form,
    inputValues,
    allValues,
    updateValues,
    handleSubmit,
  };
}
