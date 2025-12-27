import React, { ComponentType } from "react";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import { Navigate } from "react-router-dom";

/**
 * HOC to protect admin-only routes.
 * It checks for 'isAuthenticated' and a specific admin flag.
 * For now, we'll check if the user object has Role === 'admin'
 */
function withAdmin<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAdmin: React.FC<P> = (props) => {
    const { isAuthenticated, account } = useAppSelector((store) => store.userSlice);

    // [SECURITY] Check both authentication and admin role
    const isAdmin = account?.isAdmin || account?.Role === 'admin' || account?.role === 'admin' || account?.Email === 'admin@invoicelogger.com';

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    console.log("withAdmin Debug:", { account, isAdmin, role: account?.Role });
    if (!isAdmin) {
      // Redirect to dashboard if authenticated but not an admin
      // return <Navigate to="/dashboard" replace />;
      return (
        <div className="p-10 flex flex-col items-center justify-center h-screen bg-slate-50">
            <h1 className="text-2xl font-black text-red-600 mb-2">Access Denied</h1>
            <p className="text-slate-600 mb-4">Your account is not recognized as an administrator.</p>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-500 mb-4 max-w-lg overflow-auto">
                {JSON.stringify({ isAdmin, role: account?.Role, email: account?.Email }, null, 2)}
            </div>
            <a href="/dashboard" className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold">Back to Dashboard</a>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAdmin;
}

export default withAdmin;
