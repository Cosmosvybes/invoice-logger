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
    placeholder: "Your address (incl. City, State, Country)",
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
    placeholder: "Client's address (incl. City, State, Country)",
  },
  {
    type: "text",
    name: "phoneNumber",
    value: "",
    placeholder: "Client's Phone (e.g. +1234567890)",
  },
  {
    type: "text",
    name: "Notes",
    value: "",
    placeholder: "Notes / Payment Instructions",
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
    options: ["None", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "Annually"],
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
    placeholder: "Client's address (incl. City, State, Country)",
  },
  {
    type: "text",
    name: "PhoneNumber",
    value: "",
    placeholder: "Phone (e.g. +1234567890)",
  },
];

export const combinedForm = [...forms];

export default function useModalController() {
  return {
    forms,
    combinedForm,
    newCLientsFormField,
  };
}
