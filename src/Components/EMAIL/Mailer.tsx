import { Html, Head, Preview } from "@react-email/components";

import { Invoice } from "../../States/Slices/invoice.types";
import InvoiceTemplate from "./InvoiceTemplate";

const Mailer = ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
  return (
    <>
      <Html>
        <Head />
        <Preview>
          Good day to you, find your invoice statement.{" "}
          {String(invoiceInformation.id)}{" "}
        </Preview>

        <InvoiceTemplate invoiceInformation={invoiceInformation} />
      </Html>
    </>
  );
};

export default Mailer;
