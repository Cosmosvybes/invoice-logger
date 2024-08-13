import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Table_ from "./Table";
const ClientPage = () => {
  return (
    <>
      <div className="relative px-28  max-sm:px-2 h-screen">
        <BreadCrumb title="Clients" useLink={true} linkTitle="client/new" />
        <Table_ />
      </div>
    </>
  );
};

export default ClientPage;
