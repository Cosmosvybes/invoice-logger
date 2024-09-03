import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import { setIsLoggedIn } from "../../../../../../States/Slices/ClientSlice/useAuth/user";

//
export default function useSigninController() {
  const dispatch = useAppDispatch();
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

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    //// // //
    const response = await fetch(
      `http://localhost:8080/api/sign-in?email=${encodeURIComponent(
        formValues.Email
      )}&password=${encodeURIComponent(formValues.Password)}`,
      { method: "POST" }
    );
    const result = await response.json();
    const { token } = result;
    if (response.status == 403) {
      return toast.warning(result.response, { theme: "colored" });
    } else if (response.status == 404) {
      return toast.warning(result.response, { theme: "dark" });
    } else {
      const response = await fetch(`http://localhost:8080/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });

      if (response.status == 200) {
        location.replace("/dashboard");
        localStorage.setItem("token", token);
        dispatch(setIsLoggedIn({ token: localStorage.getItem("token")! }));
      }
    }
  };

  // // // //
  return {
    formFields,
    formValues,
    handleChange,
    handleSubmit,
  };
}
