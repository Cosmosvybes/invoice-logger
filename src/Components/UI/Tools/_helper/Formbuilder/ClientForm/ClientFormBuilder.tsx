import useModalController from "../../../InvoiceModal/controller";
import useClientFormController from "./client.form.controller";
import Overlay from "../../../Layout/Overlay";
import { Spinner } from "reactstrap";
// import SubscriptionModal from "../../../../Interfaces/Pages/Subscription/SubscriptionModal";

const ClientFormBuilder = () => {
  const { newCLientsFormField } = useModalController();
  const { formValues, updateClientForm, handleAddNewClient, loading } = useClientFormController();
  // const { showUpgradeModal, setShowUpgradeModal } = useClientFormController();

  const CLIENT_FORM = (newCLientsFormField || []).map((_, i) => {
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none font-medium";
    const labelClasses = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

    return (
      <div className="relative block" key={i}>
        <label className={labelClasses}>{_.placeholder}</label>
        <input
          className={inputClasses}
          type={_.type === "email" ? "email" : "text"}
          placeholder={`Enter ${_.placeholder.toLowerCase()}...`}
          value={formValues?.[_.name] || ""}
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
        <Overlay children={<Spinner color="violet" />} />
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6">
          {CLIENT_FORM}
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-slate-100">
          <button
            onClick={() => history.back()}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
          >
            Cancel
          </button>
          
          <button
            onClick={handleAddNewClient}
            className="px-8 py-3 rounded-xl bg-violet-600 text-white font-bold shadow-md hover:bg-violet-700"
          >
            Add Client
          </button>
        </div>
      </div>
      {/* <SubscriptionModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} /> */}
    </>
  );
};

export default ClientFormBuilder;
