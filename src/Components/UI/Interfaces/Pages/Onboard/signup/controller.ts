import { useState } from "react";
import { toast } from "react-toastify";

interface valueInterface {
  [key: string]: string;
}
export default function useSignUpController() {
  //
  const [formFields] = useState([
    {
      id: 1,
      name: "Firstname",
      type: "text",
      value: "",
      placeholder: "Enter your firstname",
      required: true,
    },
    {
      id: 2,
      name: "Lastname",
      type: "text",
      value: "",
      placeholder: "Enter your lastname",
      required: true,
    },
    {
      id: 3,
      name: "Email",
      type: "text",
      value: "",
      placeholder: "Enter your email",
      required: true,
    },
    {
      id: 2,
      name: "Password",
      type: "password",
      value: "",
      placeholder: "Password here",
      required: true,
    },
    {
      id: 2,
      name: "Confirm Password",
      type: "password",
      value: "",
      placeholder: "Comfirm password",
      required: true,
    },
  ]);

  const values = formFields.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
    {}
  );
  const [formValues, setFormValues] = useState<valueInterface>(values);

  const handleChange = (newValue: string, key: string) => {
    setFormValues((prev) => ({ ...prev, [key]: newValue }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // setLoading(true);

    const pattern = /^[A-Z][a-zA-Z]{6,10}[0-9]{1,3}[\W]{1}$/;

    const isValidPassword = pattern.test(formValues["Password"]);
    if (!isValidPassword) {
      toast.warn("Check password pattern");
      return;
    }
    const passwordMatch =
      formValues["Password"] === formValues["Confirm Password"];
    if (!passwordMatch) {
      toast.warn("Password doesn't match");
      return;
    }
    console.log(formValues);
  };

  return {
    formFields,
    formValues,
    handleChange,
    handleSubmit,
    loading,
  };
}
