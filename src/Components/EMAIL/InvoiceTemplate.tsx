import {
  Body,
  Heading,
  Hr,
  Container,
  Img,
  Tailwind,
  Button,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import { Invoice } from "../../States/Slices/invoice.types";

const InvoiceTemplate = ({
  invoiceInformation,
}: {
  invoiceInformation: Invoice;
}) => {
  const mainColor = "#7c3aed"; // violet-600

  return (
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
      <Body className="bg-gray-50 py-10 font-sans">
        <Container className="bg-white border border-gray-200 rounded-lg shadow-sm mx-auto p-0 overflow-hidden max-w-2xl">
          {/* Header */}
          <Section className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <Row>
              <Column>
                <Img
                  className="h-10 object-contain"
                  src="https://res.cloudinary.com/dkckrpwew/image/upload/v1726595270/logo_transparent_jxwxhn.png"
                  alt="Etherbill"
                />
              </Column>
              <Column align="right">
                <Text className="text-gray-500 text-xs uppercase tracking-wider font-semibold m-0">
                  Invoice #{invoiceInformation.id}
                </Text>
                <Text className="text-gray-900 text-sm font-bold m-0 mt-1">
                  {invoiceInformation.DateIssued}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Hero / Summary */}
          <Section className="px-8 py-8 text-center bg-white">
            <Text className="text-gray-500 text-sm mb-2 font-medium">
              You received an invoice from <span className="text-gray-900 font-bold">{invoiceInformation.Business || invoiceInformation.IssuedBy}</span>
            </Text>
            <Heading className="text-4xl font-extrabold text-gray-900 my-4 m-0">
               {Number(invoiceInformation.TOTAL).toLocaleString()} <span className="text-lg text-gray-500 ml-1 align-top">{invoiceInformation.currency}</span>
            </Heading>
            
            {invoiceInformation.paymentLink && (
               <Button
                 className="bg-primary hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-bold text-sm no-underline mt-4 shadow-md inline-block"
                 href={invoiceInformation.paymentLink}
               >
                 Pay Invoice Now
               </Button>
            )}
            <Text className="text-gray-400 text-xs mt-4">
              Due Date: {invoiceInformation.DateDue}
            </Text>
          </Section>

          <Hr className="border-gray-100 my-0 mx-8" />

          {/* Details Grid */}
          <Section className="px-8 py-8">
            <Row>
              <Column className="w-1/2 align-top pr-4">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</Text>
                <Text className="text-gray-900 font-bold text-sm m-0 mb-1">{invoiceInformation.Client}</Text>
                <Text className="text-gray-500 text-xs m-0 leading-relaxed">
                  {invoiceInformation.ClientAddress}
                </Text>
              </Column>
              <Column className="w-1/2 align-top pl-4">
                 <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">From</Text>
                 <Text className="text-gray-900 font-bold text-sm m-0 mb-1">{invoiceInformation.Business}</Text>
                  <Text className="text-gray-500 text-xs m-0 leading-relaxed">
                  {invoiceInformation.BusinessAddress}
                </Text>
              </Column>
            </Row>
          </Section>
          
          {/* Items Table - Clean CSS Grid/Table Hybrid */}
          <Section className="px-8 pb-8">
             <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Line Items</Text>
             <Section className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <Row className="bg-gray-50 border-b border-gray-200">
                    <Column className="px-4 py-3 text-left w-1/2"><Text className="m-0 text-xs font-bold text-gray-500">Description</Text></Column>
                    <Column className="px-4 py-3 text-right"><Text className="m-0 text-xs font-bold text-gray-500">Qty</Text></Column>
                    <Column className="px-4 py-3 text-right"><Text className="m-0 text-xs font-bold text-gray-500">Price</Text></Column>
                    <Column className="px-4 py-3 text-right"><Text className="m-0 text-xs font-bold text-gray-500">Total</Text></Column>
                </Row>
                
                {/* Items */}
                {invoiceInformation.itemList.map((item: any, i: number) => (
                    <Row key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                        <Column className="px-4 py-3 text-left"><Text className="m-0 text-sm font-medium text-gray-900">{item.description}</Text></Column>
                        <Column className="px-4 py-3 text-right"><Text className="m-0 text-sm text-gray-500">{item.quantity}</Text></Column>
                        <Column className="px-4 py-3 text-right"><Text className="m-0 text-sm text-gray-500">{Number(item.unitPrice).toLocaleString()}</Text></Column>
                        <Column className="px-4 py-3 text-right"><Text className="m-0 text-sm font-bold text-gray-900">{Number(item.unitTotal).toLocaleString()}</Text></Column>
                    </Row>
                ))}
             </Section>

             {/* Totals Breakdown */}
             <Section className="mt-4">
                 <Row>
                     <Column className="w-1/2"></Column>
                     <Column className="w-1/2">
                        <Row className="mb-2">
                             <Column align="left"><Text className="m-0 text-xs font-bold text-gray-500">Subtotal</Text></Column>
                             <Column align="right"><Text className="m-0 text-sm font-medium text-gray-900">{Number(invoiceInformation.TOTAL - (invoiceInformation.VAT / 100 * invoiceInformation.TOTAL) + (invoiceInformation.Discount / 100 * invoiceInformation.TOTAL)).toLocaleString()}</Text></Column>
                        </Row>
                        {invoiceInformation.Discount > 0 && (
                            <Row className="mb-2">
                                <Column align="left"><Text className="m-0 text-xs font-bold text-green-600">Discount ({invoiceInformation.Discount}%)</Text></Column>
                                <Column align="right"><Text className="m-0 text-sm font-medium text-green-600">-{invoiceInformation.Discount}%</Text></Column>
                            </Row>
                        )}
                         {invoiceInformation.VAT > 0 && (
                            <Row className="mb-2">
                                <Column align="left"><Text className="m-0 text-xs font-bold text-gray-500">VAT ({invoiceInformation.VAT}%)</Text></Column>
                                <Column align="right"><Text className="m-0 text-sm font-medium text-gray-900">+{invoiceInformation.VAT}%</Text></Column>
                            </Row>
                        )}
                        <Hr className="border-gray-200 my-3" />
                        <Row>
                             <Column align="left"><Text className="m-0 text-base font-extrabold text-gray-900">Total Due</Text></Column>
                             <Column align="right"><Text className="m-0 text-xl font-extrabold text-primary">{Number(invoiceInformation.TOTAL).toLocaleString()} {invoiceInformation.currency}</Text></Column>
                        </Row>
                     </Column>
                 </Row>
             </Section>
          </Section>

          {/* Footer */}
          <Section className="bg-gray-50 border-t border-gray-200 px-8 py-6 text-center">
            <Text className="text-gray-500 text-xs mb-2">
               If you have any questions, contact us at <span className="text-primary">{invoiceInformation.email}</span>
            </Text>
            <Text className="text-gray-400 text-[10px] uppercase tracking-wider">
               Powered by Etherbill
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  );
};

export default InvoiceTemplate;
