import { useState } from "react";
import { toast } from "react-toastify";

//
export default function useSigninController() {
  const [formFields] = useState([
    {
      id: 1,
      name: "Email",
      type: "text",
      value: "",
      placeholder: "Enter your email",
      required: true,
    },
    {
      id: 2,
      name: "Password",
      type: "text",
      value: "",
      placeholder: "Password here",
      required: true,
    },
  ]);

  const values = formFields.reduce(
    (allvalues, currValue) => ({
      ...allvalues,
      [currValue.name]: currValue.value,
    }),
    {}
  );

  const [formValues, setFormValues]: any = useState(values);

  const handleChange = (newValue: string, inputName: string) => {
    setFormValues((prev: any) => ({
      ...prev,
      [inputName]: newValue.trimEnd(),
    }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    //// // //
    // https://ether-bill-server-1.onrender.com
    setLoading(true);
    const response = await fetch(
      `https://ether-bill-server-1.onrender.com/api/sign-in?email=${encodeURIComponent(
        formValues.Email
      )}&password=${encodeURIComponent(formValues.Password)}`,
      { method: "POST" }
    );
    const result = await response.json();
    const { token } = result;
    if (response.status == 403) {
      setLoading(false);
      return toast.warning(result.response, { theme: "colored" });
    } else if (response.status == 404) {
      setLoading(false);
      return toast.warning(result.response, { theme: "dark" });
    } else if (response.status == 500) {
      setLoading(false);
      return toast.error(result.response, { theme: "dark" });
    } else {
      const response = await fetch(
        `https://ether-bill-server-1.onrender.com/api/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        }
      );

      if (response.status == 200) {
        localStorage.setItem("token", token);
        location.replace("/dashboard");
      }
    }
  };

  // // // //
  return {
    formFields,
    formValues,
    handleChange,
    handleSubmit,
    loading,
  };
}
