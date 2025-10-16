import { useState } from "react";
import { toast } from "react-toastify";
import { setLoading } from "../../../../../../States/Slices/wallet";
import { useAppDispatch } from "../../../../../../States/hoooks/hook";
import { useNavigate } from "react-router-dom";

interface valueInterface {
  [key: string]: string;
}

export default function useSignUpController() {
  const navigate = useNavigate();
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

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const pattern = /^[A-Z][a-zA-Z]{6,10}[0-9]{1,7}[\W]{1}$/;

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

    try {
      dispatch(setLoading());
      const result = await fetch(
        "https://ether-bill-server-1.onrender.com/api/create_account",
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(formValues),
        }
      );
      if (!result.ok) {
        dispatch(setLoading());

        if (result.status == 403) {
          return toast.error("Action forbidden, User account exist, sign in");
        } else if (result.status == 500) {
          return toast.error("Service unavailable, try again");
        } else if (result.status == 503) {
          return toast.error("Internal server error");
        }
      } else {
        dispatch(setLoading());
        const { response } = await result.json();
        toast.success(response);
        navigate("/");
      }
    } catch (error: any) {
      dispatch(setLoading());
      toast.error(error, { position: "top-center" });
    }
  };

  return {
    formFields,
    formValues,
    handleChange,
    handleSubmit,
  };
}
