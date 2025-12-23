import { useLayoutEffect } from "react";
import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientForm/ClientFormBuilder";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
import {
  getUser,
  setIsAuthenticated,
} from "../../../../../States/Slices/ClientSlice/useAuth/user";
import { useAppDispatch } from "../../../../../States/hoooks/hook";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
const AddClient = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(setIsAuthenticated());
  }, []);

  return (
    <>
      <div className="w-full h-full min-h-screen px-4 md:px-8 py-6">
        <BreadCrumb title="New Client" useLink={false} linkTitle="client/new" />

        <div className="relative w-full mt-6 max-w-2xl mx-auto animate-fade-in-up">
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 md:p-8">
            <div className="mb-8 text-center">
                 <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={user} alt="new client" className="w-8 h-8 opacity-50" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800">Add New Client</h2>
                 <p className="text-slate-500 mt-2">Enter the client's information below to create a new profile.</p>
            </div>
            
            <ClientFormBuilder />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddClient);
