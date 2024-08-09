import BreadCrumb from "../Layout/BreadCrumb";
import AccountDetails from "./AccountDetails";

const Account = () => {
  return (
    <>
      <BreadCrumb useLink={true} title="Account" />
      <AccountDetails />
    </>
  );
};

export default Account;
