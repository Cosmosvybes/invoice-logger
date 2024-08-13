import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientFormBuilder";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";

const AddClient = () => {
  return (
    <>
      <div className="relative px-28 max-sm:px-2 h-screen">
        <BreadCrumb title="New Client" useLink={false} linkTitle="" />
        <ClientFormBuilder />
      </div>
    </>
  );
};

export default AddClient;
