import withAuth from "../../../Tools/_helper/Auth/withAuth";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Table_ from "./Table";

const ClientPage = () => {
  return (
    <>
      <div className="relative w-full h-full min-h-screen px-4 md:px-12 py-6">
        <BreadCrumb title="Clients" useLink={true} linkTitle="client/new" />
        <Table_ />
      </div>
    </>
  );
};

export default withAuth(ClientPage);
