import {
  Html,
  Tailwind,
  Body,
  Head,
  Preview,
  Heading,
  Hr,
  Container,
  Img,
} from "@react-email/components";

import { Invoice } from "../../States/Slices/invoice.types";

const Mailer = ({ invoiceInformation }: { invoiceInformation: Invoice }) => {
  return (
    <>
      <Html>
        <Head />
        <Preview>
          Good day to you, find your invoice statement.{" "}
          {String(invoiceInformation.id)}{" "}
        </Preview>
        <Tailwind>
          <Body className=" text-black py-5 px-2 border-5 border-gray-100 bg-gray-white  w-full">
            <Container className="py-auto border-3 border-gray-100 ">
              <Img
                className="h-20 w-auto object-cover"
                src="https://res.cloudinary.com/dkckrpwew/image/upload/v1726595270/logo_transparent_jxwxhn.png"
                style={{
                  width: "100%",
                }}
                alt="logo"
              />

              <p className="text-sm">
                Hi there 👋, I'm Chris from etherbill. You have got an invoice.
              </p>
              <Hr className="border-gray-100 w-full" />
              <p className="text-black font-normal">
                Reference ID- {invoiceInformation.id}
              </p>
              <Hr className="border-gray-100 w-full" />

              <p className="text-black  font-normal">
                Sender's address - {invoiceInformation.BusinessAddress}{" "}
                {invoiceInformation.ClientCity}{" "}
                {invoiceInformation.BusinessState},{" "}
                {invoiceInformation.BusinessCountry}.
              </p>
              <Hr className="border-gray-100 w-full" />
              <p className="text-black  font-normal">
                {" "}
                Date issued- {invoiceInformation.DateIssued}{" "}
              </p>
              <Hr className="border-gray-100 w-full" />
              <p className="text-black  font-normal">
                {" "}
                Date due - {invoiceInformation.DateDue}{" "}
              </p>
              <Hr className="border-gray-100 w-full" />
              <Container className=" text-gray-700">
                <Heading className="">Products</Heading>
                <table
                  border={0}
                  width={"100%"}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead className="w-full">
                    <tr className="w-full">
                      <th style={{ textAlign: "left", padding: "14px" }}>
                        S/No.
                      </th>
                      <th style={{ textAlign: "left", padding: "14px" }}>
                        Description
                      </th>
                      <th style={{ textAlign: "left", padding: "14px" }}>
                        prod.Qty
                      </th>
                      <th style={{ textAlign: "left", padding: "14px" }}>
                        Prod.Price
                      </th>
                      <th style={{ textAlign: "left", padding: "14px" }}>
                        Unit total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {invoiceInformation.itemList.map((_: any, i: number) => (
                      <tr
                        key={i}
                        className={` ${
                          i % 2 == 0 ? "bg-gray-100" : "bg-gray-50"
                        }  w-full`}
                      >
                        <td style={{ textAlign: "left", padding: "14px" }}>
                          {String(_.itemID).slice(0, 12)}
                        </td>
                        <td style={{ textAlign: "left", padding: "14px" }}>
                          {_.description}
                        </td>
                        <td style={{ textAlign: "left", padding: "14px" }}>
                          {_.quantity}
                        </td>
                        <td style={{ textAlign: "left", padding: "14px" }}>
                          {_.unitPrice}
                        </td>
                        <td style={{ textAlign: "left", padding: "14px" }}>
                          {_.unitTotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Container>
              <br />

              <div className="relative text-gray-700 justify-end items-center px-2 flex-col">
                <p> Shipping address - {invoiceInformation.shippingAddress}</p>

                <Hr className="border-gray-100 w-full" />

                <p>
                  {" "}
                  Payment Information - {invoiceInformation.paymentInformation}
                </p>

                <Hr className="border-gray-100 w-full" />

                <p> Transaction notes -{invoiceInformation.Notes}</p>

                <Hr className="border-gray-100 w-full" />

                <p> Other Information -{invoiceInformation.otherInformation}</p>
              </div>
              <div className="relative  text-gray-700 justify-end items-center px-2 flex-col">
                <p> Value added tax- {invoiceInformation.VAT} % </p>
                <Hr className="border-gray-100 w-full" />

                <p> Discount- {invoiceInformation.Discount} % </p>
                <Hr className="border-gray-100 w-full" />

                <p>
                  {" "}
                  Total- {String(
                    invoiceInformation.TOTAL.toLocaleString()
                  )}{" "}
                  {invoiceInformation.currency}{" "}
                </p>
              </div>
              <Hr />
              <Heading className="text-black flex justify-start h-20 text-center ">
                <Img
                  className="h-full w-auto object-cover"
                  src="https://res.cloudinary.com/dkckrpwew/image/upload/v1726595270/logo_transparent_jxwxhn.png"
                  style={{
                    width: "100%",
                  }}
                  alt="logo"
                />
              </Heading>
              <Container className="px-2 text-gray-500">
                <p>
                  All trademarks, service marks, and company names are the
                  property of Etherbill Inc.
                </p>
                <p className="text-xl text-sky-900 opacity-50 font-normal">
                  Etherbill Inc • {new Date().getFullYear()} &copy;
                </p>
              </Container>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
};

export default Mailer;
