import useDashboardController from ".";
import Account from "../../../Tools/InvoiceModal/Account";
//
const Dashboard = () => {
  useDashboardController();

  return (
    <>
      <div className="relative  w-full  h-auto px-28 max-sm:px-0  max-sm:w-full max-md:w-full">
        <Account />
      </div>
    </>
  );
};

export default Dashboard;
