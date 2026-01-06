import { Html, Head, Preview, Tailwind } from "@react-email/components";

import { Invoice } from "../../States/Slices/invoice.types";
import InvoiceTemplate from "./InvoiceTemplate";

const Mailer = ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
  const mainColor = "#7c3aed"; // violet-600

  return (
    <Html>
      <Head />
      <Preview>
        Good day to you, find your invoice statement.{" "}
        {String(invoiceInformation.id)}{" "}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: mainColor,
                gray: {
                  50: "#f9fafb",
                  100: "#f3f4f6",
                  200: "#e5e7eb",
                  500: "#6b7280",
                  800: "#1f2937",
                  900: "#111827",
                },
              },
              fontFamily: {
                sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <InvoiceTemplate invoiceInformation={invoiceInformation} />
      </Tailwind>
    </Html>
  );
};

export default Mailer;
