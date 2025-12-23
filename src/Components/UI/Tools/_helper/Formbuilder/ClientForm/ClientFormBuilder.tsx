import useModalController from "../../../InvoiceModal/controller";
import useClientFormController from "./client.form.controller";
import Overlay from "../../../../Interfaces/Pages/Subscription/_OverlayComp/Overlay";
import { LoadingDashed } from "react-huge-icons/solid";
import { RemoveCircle, Tick } from "react-huge-icons/outline";

const ClientFormBuilder = () => {
  const { newCLientsFormField } = useModalController();

  const { formValues, updateClientForm, handleAddNewClient, loading } =
    useClientFormController();

  const CLIENT_FORM = newCLientsFormField.map((_, i) => {
    // Common input classes
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all duration-200 font-medium";
    const labelClasses = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

    return (
      <div className="relative block" key={i}>
        <label className={labelClasses}>{_.placeholder}</label>
        <input
          className={inputClasses}
          type={_.type === "email" ? "email" : "text"}
          placeholder={`Enter ${_.placeholder.toLowerCase()}...`}
          value={formValues[_.name]}
          name={_.name}
          onChange={(e) => updateClientForm(e.target.value, _.name)}
          required={true}
        />
      </div>
    );
  });

  return (
    <>
      {loading && (
        <Overlay
          children={
            <LoadingDashed className="text-5xl text-violet-600 animate-spin z-30" />
          }
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6">
          {CLIENT_FORM}
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-slate-100">
          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
          >
            <RemoveCircle className="text-xl" />
            Cancel
          </button>
          
          <button
            onClick={handleAddNewClient}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-violet-600 text-white font-bold shadow-md hover:bg-violet-700 hover:shadow-lg transition-all transform active:scale-95"
          >
            <Tick className="text-xl" />
            Add Client
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientFormBuilder;
