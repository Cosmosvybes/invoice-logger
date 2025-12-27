import withAuth from "../../../Tools/_helper/Auth/withAuth";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import Table_ from "./Table";

const ClientPage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <BreadCrumb title="My Clients" useLink={true} linkTitle="client/new" />
        <div className="mt-8">
            <Table_ />
        </div>
      </div>
    </div>
  );
};

export default withAuth(ClientPage);
