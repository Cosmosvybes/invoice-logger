import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientForm/ClientFormBuilder";
import user from "./../../../../../assets/User.svg";

const AddClient = () => {
  // const dispatch = useAppDispatch();
  
  // Auth is handled globally by Layout

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <BreadCrumb title="New Business Client" useLink={false} linkTitle="" />
        
        <div className="mt-10">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                        <div className="w-20 h-20 bg-violet-600 rounded-[2rem] flex items-center justify-center p-4 shadow-lg shadow-violet-200 shrink-0">
                            <img src={user} alt="user" className="w-full h-full invert brightness-0" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Build Your Network</h2>
                            <p className="text-slate-500 font-bold max-w-lg">Add a new client to your dashboard to start issuing professional invoices and tracking payments instantly.</p>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-6 md:p-10">
                         <ClientFormBuilder />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
