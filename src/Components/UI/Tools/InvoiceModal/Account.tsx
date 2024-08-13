import BreadCrumb from "../Layout/BreadCrumb";
import AccountDetails from "./AccountDetails";

const Account = () => {
  return (
    <>
      <BreadCrumb useLink={true} title="Account" linkTitle="" />
      <AccountDetails />
    </>
  );
};

export default Account;
