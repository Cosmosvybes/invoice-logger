import BreadCrumb from "../Layout/BreadCrumb";
import AccountDetails from "./AccountDetails";

const Account = () => {
  return (
    <>

      <BreadCrumb 
        useLink={true} 
        title="Account" 
        linkTitle="new/invoice" 
        onClick={() => localStorage.removeItem("id")} 
      />
      <AccountDetails />
    </>
  );
};

export default Account;
