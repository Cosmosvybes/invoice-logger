export const forms = [
  {
    type_: "text",
    name: "Client",
    value: "",
    placeholder: "Client's name",
  },
  {
    type_: "text",
    name: "ClientAddress",
    value: "",
    placeholder: "Client's address",
  },
  {
    type_: "text",
    name: "City",
    value: "",
    placeholder: "City/Postal",
  },
  {
    type_: "text",
    name: "State",
    value: "",
    placeholder: "State",
  },
  {
    type_: "text",
    name: "Country",
    value: "",
    placeholder: "Country",
  },

  {
    type_: "text",
    name: "AdditionalInfo",
    value: "",
    placeholder: "Additional Information",
  },
  {
    type_: "date",
    name: "DateIssued",
    value: "",
    placeholder: "Issued on",
  },
  {
    type_: "date",
    name: "DateDue",
    value: "",
    placeholder: "Date Due",
  },
  {
    type_: "text",
    name: "paymentInformation",
    value: "",
    placeholder: "payment Information",
  },
  {
    type_: "text",
    name: "Notes",
    value: "",
    placeholder: "Transaction  Notes",
  },
  // {
  //   type_: "text",
  //   name: "VAT",
  //   value: "",
  //   placeholder: "Add Tax",
  // },
  // {
  //   type_: "text",
  //   name: "Discount",
  //   value: "",
  //   placeholder: "Transaction Discount",
  // },
];

export const senderInfo = [
  {
    type: "text",
    name: "Business",
    value: "",
    placeholder: "Your business name",
  },
  {
    type: "text",
    name: "BusinessAddress",
    value: "",
    placeholder: "business address",
  },
  {
    type: "text",
    name: "ClientCity",
    value: "",
    placeholder: "city/postal",
  },
  {
    type: "text",
    name: "BusinessState",
    value: "",
    placeholder: "state",
  },
  {
    type: "text",
    name: "BusinessCountry",
    value: "",
    placeholder: "country",
  },
];

export default function useModalController() {
  let combinedForm = [...senderInfo, ...forms];
  return {
    forms,
    senderInfo,
    combinedForm,
  };
}
