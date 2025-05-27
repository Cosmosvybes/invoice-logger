import React, { ComponentType } from "react";
import { useAppSelector } from "../../../../../../States/hoooks/hook";
import Empty from "../../../../Interfaces/Pages/Dashboard/Invoices/Empty";
import SignIn from "../../../../Interfaces/Pages/Onboard/signin/SignIn";

function escrowReReady<P extends object>(WrappedComponent: ComponentType<P>) {
  //

  const EscrowReReady: React.FC<P> = (props) => {
    const { isConnected } = useAppSelector((store) => store.walletSlice);
    const { isAuthenticated } = useAppSelector((store) => store.userSlice);
    if (!isAuthenticated) {
      return <SignIn />;
    }
    if (!isConnected) {
      return (
        <div className="relative flex justify-center items-center h-screen w-full">
          <Empty message={"Connect wallet to proceed"} />
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return EscrowReReady;
}

export default escrowReReady;
