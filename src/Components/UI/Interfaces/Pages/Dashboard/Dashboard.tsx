// import useDashboardController from ".";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import Account from "../../../Tools/InvoiceModal/Account";
//


const Dashboard = () => {
  // useDashboardController();

  return (
    <>
      <div className="relative px-20 max-sm:px-0  max-sm:w-full max-md:w-full">
        <Account />
      </div>
    </>
  );
};

export default withAuth(Dashboard);
