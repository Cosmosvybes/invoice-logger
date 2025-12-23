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
    placeholder: "Your address",
  },
  {
    type: "text",
    name: "ClientCity",
    value: "",
    placeholder: "Your city/postal",
  },
  {
    type: "text",
    name: "BusinessState",
    value: "",
    placeholder: "Your state",
  },
  {
    type: "text",
    name: "BusinessCountry",
    value: "",
    placeholder: "Your country",
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
    placeholder: "Client's city/Postal",
  },
  {
    type: "text",
    name: "State",
    value: "",
    placeholder: "Client's state",
  },
  {
    type: "text",
    name: "Country",
    value: "",
    placeholder: "Client's country",
  },

  {
    type: "text",
    name: "paymentInformation",
    value: "",
    placeholder: "Payment Information",
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
    type: "text",
    name: "otherInformation",
    value: "",
    placeholder: "Other Information",
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
  {
    type: "select",
    name: "Recurring",
    value: "None",
    placeholder: "Recurring Frequency",
    options: ["None", "Weekly", "Monthly"],
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
    type: "email",
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
