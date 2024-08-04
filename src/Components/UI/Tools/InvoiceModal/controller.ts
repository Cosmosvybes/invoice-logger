export default function useModalController() {
  const forms = [
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
      placeholder: "Client'sa address",
    },
    {
      type_: "text",
      name: "City",
      value: "",
      placeholder: "City/Postal",
    },
    {
      type_: "text",
      name: "state",
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
      name: "IssuedBy",
      value: "",
      placeholder: "Invoice From",
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
    // {
    //   type_: "checkbox",
    //   name: "Save Text Doc",
    //   value: false,
    //   placeholder: "Save Invoice",
    // },
  ];

  const senderInfo = [
    {
      type: "text",
      name: "Business",
      value: "",
      placeholder: "Business name",
    },
    {
      type: "text",
      name: "BusinessAddress",
      value: "",
      placeholder: "Business address",
    },
    {
      type: "text",
      name: "ClientCity",
      value: "",
      placeholder: "City/Postal",
    },
    {
      type: "text",
      name: "BusinessState",
      value: "",
      placeholder: "State",
    },
    {
      type: "text",
      name: "BusinessCountry",
      value: "",
      placeholder: "Business Country",
    },
  
   
  ];
  return {
    forms,
    senderInfo,
  };
}
