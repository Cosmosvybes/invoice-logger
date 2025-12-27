import React, { ComponentType } from "react";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import { Navigate } from "react-router-dom";

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth: React.FC<P> = (props) => {
    const { isAuthenticated, loading } = useAppSelector((store) => store.userSlice);

    // Only show spinner if we are loading AND don't already think we are authenticated
    if (loading && !isAuthenticated) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Authenticating...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
}
export default withAuth;
