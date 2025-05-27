import { useState } from "react";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../../../../../../States/Slices/ClientSlice/useAuth/user";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../States/hoooks/hook";

//
export default function useSigninController() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);
  const navigate = useNavigate();
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
      type: "password",
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
    // console.log(loading);
    const response = await fetch(`http://localhost:8080/api/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        email: formValues["Email"],
        password: formValues["Password"],
      }),
    });
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
      localStorage.setItem("token", token);

      const response = await fetch(`http://localhost:8080/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        dispatch(setIsAuthenticated());
        navigate("/dashboard");
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
    isAuthenticated,
  };
}
