import { useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_URL } from "../../../../../../Components/constants/Index";

interface valueInterface {
  [key: string]: string;
}

export default function useSignUpController() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);
  const [loading, setLoadingLocal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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

  // const dispatch = useAppDispatch();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Relaxed pattern: Minimum 8 characters, at least one letter and one number
    const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    const isValidPassword = pattern.test(formValues["Password"]);
    if (!isValidPassword) {
      toast.warn("Password must be at least 8 characters and include both letters and numbers");
      return;
    }
    const passwordMatch =
      formValues["Password"] === formValues["Confirm Password"];
    if (!passwordMatch) {
      toast.warn("Password doesn't match");
      return;
    }

    try {
      setLoadingLocal(true);
      const result = await fetch(
        `${API_URL}/api/create_account`,
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ ...formValues, freemiumCount: 50 }),
        }
      );
      if (!result.ok) {
        setLoadingLocal(false);

        if (result.status == 403) {
          return toast.error("Action forbidden, User account exist, sign in");
        } else if (result.status == 500) {
          return toast.error("Service unavailable, try again");
        } else if (result.status == 503) {
          return toast.error("Internal server error");
        }
      } else {
        setLoadingLocal(false);
        const { response } = await result.json();
        
        // [NEW] Save email for verification page
        localStorage.setItem("email", formValues["Email"]);
        
        toast.success(response);
        navigate("/verification_code?onboard=true");
      }
    } catch (error: any) {
      setLoadingLocal(false);
      toast.error(error, { position: "top-center" });
    }
  };

  return {
    formFields,
    formValues,
    handleChange,
    handleSubmit,
    loading,
  };
}
