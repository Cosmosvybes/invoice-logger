export const forms = [
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
    placeholder: "Business state",
  },
  {
    type: "text",
    name: "BusinessCountry",
    value: "",
    placeholder: "Country",
  },

  {
    type: "text",
    name: "Client",
    value: "",
    placeholder: "Client's name",
  },
  {
    type: "text",
    name: "ClientAddress",
    value: "",
    placeholder: "Client's address",
  },
  {
    type: "text",
    name: "City",
    value: "",
    placeholder: "City/Postal",
  },
  {
    type: "text",
    name: "State",
    value: "",
    placeholder: "State",
  },
  {
    type: "text",
    name: "Country",
    value: "",
    placeholder: "Country",
  },

  {
    type: "text",
    name: "paymentInformation",
    value: "",
    placeholder: "payment Information",
  },
  {
    type: "text",
    name: "Notes",
    value: "",
    placeholder: "Transaction  Notes",
  },
  {
    type: "text",
    name: "shippingAddress",
    value: "",
    placeholder: "Shipping Address",
  },
  {
    type: "date",
    name: "DateIssued",
    value: "",
    placeholder: "Begin on",
  },
  {
    type: "date",
    name: "DateDue",
    value: "",
    placeholder: "Due on",
  },
];

const newCLientsFormField = [
  {
    type: "text",
    name: "Name",
    value: "",
    placeholder: "Client's name",
  },
  {
    type: "text",
    name: "Email",
    value: "",
    placeholder: "Email",
  },
  {
    type: "text",
    name: "Address",
    value: "",
    placeholder: "Address",
  },
  {
    type: "text",
    name: "City_Postal_State",
    value: "",
    placeholder: "City or Postal , State",
  },
  {
    type: "text",
    name: "Country",
    value: "",
    placeholder: "Country",
  },
];

export default function useModalController() {
  let combinedForm = [...forms];
  return {
    forms,
    combinedForm,
    newCLientsFormField,
  };
}
