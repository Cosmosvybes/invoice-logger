import Template from "../../Tools/_helper/Formbuilder/InvoiceTemplate/Template";

import BreadCrumb from "../../Tools/Layout/BreadCrumb";

const Create = () => {
  return (
    <>
      <div className="relative px-28  max-sm:px-0 max-md:w-full ">
        <BreadCrumb useLink={false} title={"New invoice"} linkTitle="invoice" />
        <Template />
      </div>
    </>
  );
};

export default Create;
