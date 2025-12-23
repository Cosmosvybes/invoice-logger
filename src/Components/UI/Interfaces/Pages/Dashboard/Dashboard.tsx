// import useDashboardController from ".";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import Account from "../../../Tools/InvoiceModal/Account";
//


const Dashboard = () => {
  // useDashboardController();

  return (
    <>
      <div className="relative w-full px-4 md:px-12 py-6">
        <Account />
      </div>
    </>
  );
};

export default withAuth(Dashboard);
