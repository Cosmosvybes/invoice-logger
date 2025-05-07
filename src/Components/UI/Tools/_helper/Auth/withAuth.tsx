import React, { ComponentType } from "react";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import SignIn from "../../../Interfaces/Pages/Onboard/signin/SignIn";


function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth: React.FC<P> = (props) => {
    const { isAuthenticated } = useAppSelector((store) => store.userSlice);

    // const navigate = useNavigate();
    if (!isAuthenticated) {
      return <SignIn />;
    }
    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
}
export default withAuth;
