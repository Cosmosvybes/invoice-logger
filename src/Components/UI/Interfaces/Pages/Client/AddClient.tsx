import ClientFormBuilder from "../../../Tools/_helper/Formbuilder/ClientFormBuilder";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";
const AddClient = () => {
  return (
    <>
      <div className="relative px-28 max-sm:px-2 h-screen">
        <BreadCrumb title="New Client" useLink={false} linkTitle="" />


        <div className="relative py-0 max-sm:py-0  flex justify-between max-sm:flex-col-reverse  gap-5">


          <div className="relative w-1/3  max-sm:w-full h-auto flex px-5  py-2 max-sm:py-0 max-sm:px-5 flex-col">
            <div className="relative w-full h-auto  px-10 py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full h-full object-contain max-md:w-full max-md:h-auto"
              />
            </div>
          </div>

          <div className="relative w-full  max-sm:w-full h-auto px-5  max-sm:px-0 py-2">
          <ClientFormBuilder />
        </div>
        </div>
     
      </div>
    </>
  );
};

export default AddClient;
