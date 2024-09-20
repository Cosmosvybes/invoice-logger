import {
  Html,
  Tailwind,
  Body,
  Head,
  Preview,
  Text,
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
          Good day to you, find attached the invoice statement.{" "}
          {String(invoiceInformation.id)}{" "}
        </Preview>
        <Tailwind>
          <Body className=" text-black py-5 px-2 border-5 border-gray-100 bg-gray-50 w-full">
            <Container className="py-auto border-3 border-gray-100 ">
              <Img
                className="h-20 w-auto object-cover"
                src="https://res.cloudinary.com/dkckrpwew/image/upload/v1726595270/logo_transparent_jxwxhn.png"
                style={{
                  width: "100%",
                }}
                alt="logo"
              />

              <Container className="text-slate-700">
                <p className="text-2xl">
                  Hi there 👋, I'm Chris from etherbill.
                </p>
                <p className="block text-xl">You have got an invoice.</p>
              </Container>

              <Container className="block text-black  bg-white">
                <p className="text-black font-normal  text-sm">
                  REFERENCE ID- {invoiceInformation.id}
                </p>
                <Hr className="border-gray-100 w-full" />

                <p className="text-black text-sm font-normal">
                  COMPANY ADDRESS-{" "}
                  {invoiceInformation.BusinessAddress.toUpperCase()}{" "}
                  {invoiceInformation.ClientCity.toUpperCase()}{" "}
                  {invoiceInformation.BusinessState.toUpperCase()},
                  {invoiceInformation.BusinessCountry.toUpperCase()}.
                </p>
                <Hr className="border-gray-100 w-full" />
                <p className="text-black text-sm font-normal">
                  {" "}
                  DATE ISSUED- {invoiceInformation.DateIssued}{" "}
                </p>
                <Hr className="border-gray-100 w-full" />
                <p className="text-black text-sm font-normal">
                  {" "}
                  DUE DATE - {invoiceInformation.DateDue}{" "}
                </p>
              </Container>
              <Container className="  text-gray-700">
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

              <Container className="block px-2 bg-gray-50  text-gray-700 font-sans">
                <div className="relative justify-end items-center flex-col">
                  <Text className="text-black font-thin text-xl">
                    <p> Value added tax- {invoiceInformation.VAT} % </p>
                    <Hr className="border-gray-100 w-full" />
                  </Text>

                  <Text className="text-black font-thin text-xl">
                    <p> Discount- {invoiceInformation.Discount} % </p>
                    <Hr className="border-gray-100 w-full" />
                  </Text>

                  <Text className="text-black font-thin text-xl">
                    <p>
                      {" "}
                      TOTAL- {invoiceInformation.TOTAL.toLocaleString()}{" "}
                      {invoiceInformation.currency}{" "}
                    </p>
                    <Hr className="border-gray-100 w-full" />
                  </Text>
                </div>
              </Container>
              <Container className="block px-2 text-gray-700 bg-gray-50 font-sans">
                <div className="relative justify-end items-center flex-col">
                  <Text className="text-black font-thin text-xl">
                    <p>
                      {" "}
                      Shipping address - {invoiceInformation.shippingAddress}
                    </p>
                  </Text>
                  <Hr className="border-gray-100 w-full" />
                  <Text className="text-black font-thin text-xl">
                    <p>
                      {" "}
                      Payment Information -{" "}
                      {invoiceInformation.paymentInformation}
                    </p>
                  </Text>
                  <Hr className="border-gray-100 w-full" />
                  <Text className="text-black font-thin text-xl">
                    <p> Transaction notes -{invoiceInformation.Notes}</p>
                  </Text>
                  <Hr className="border-gray-100 w-full" />
                  <Text className="text-black font-thin text-xl">
                    <p>
                      {" "}
                      Other Information -{invoiceInformation.otherInformation}
                    </p>
                  </Text>
                </div>
              </Container>

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
                  property of Etherbill inc..
                </p>
                <Text className="font-normal text-sm text-gray-600 ">
                  {new Date().getFullYear()} Etherbill Inc &copy;.
                </Text>
              </Container>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
};

export default Mailer;
