import { Button, Input } from "reactstrap";

const OBTemplate = ({
  formFields,
  handleChange,
  formValues,
  handleSubmit,
}: {
  formFields: {
    id: number;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    required: boolean;
  }[];
  formValues: { [key: string]: string };
  handleChange(value: string, inputName: string): void;
  handleSubmit(e: any): void;
}) => {
  const FORM = formFields.map((_, i) => {
    switch (_.type) {
      case "checkbox":
        return;

      default:
        return (
          <div className="relative" key={i}>
            <label> {_.name}</label>
            <Input
              type="text"
              placeholder={_.placeholder}
              value={formValues[_.name]}
              required={_.required}
              onChange={(e) => handleChange(e.target.value, _.name)}
              className="block w-full outline-none border px-3 py-2"
            />
          </div>
        );
    }
  });

  return (
    <>
      <div className="relative w-full gap-2 px-10  max-sm:h-96">
        <form onSubmit={(e) => handleSubmit(e)}>
          {FORM}
          <Button className=" bg-black mt-2 text-white text-center py-3 px-2 w-full">
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
};

export default OBTemplate;
