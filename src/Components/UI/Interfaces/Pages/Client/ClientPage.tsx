import withAuth from "../../../Tools/_helper/Auth/withAuth";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Table_ from "./Table";

const ClientPage = () => {
  return (
    <>
      <div className="relative px-28  border max-sm:px-0 h-screen">
        <BreadCrumb title="Clients" useLink={true} linkTitle="client/new" />
        <Table_ />
      </div>
    </>
  );
};

export default withAuth(ClientPage);
