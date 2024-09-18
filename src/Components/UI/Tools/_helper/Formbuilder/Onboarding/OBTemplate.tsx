import { ArrowRight } from "react-huge-icons/outline";
import { Button, Input, Spinner } from "reactstrap";

const OBTemplate = ({
  formFields,
  handleChange,
  formValues,
  handleSubmit,
  isLoading,
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
  isLoading: boolean;
}) => {
  const FORM = formFields.map((_, i) => {
    switch (_.type) {
      case "checkbox":
        return;

      default:
        return (
          <div className="relative" key={i}>
            <label className="mb-1 text-xl"> {_.name}</label>
            <Input
              type="text"
              placeholder={_.placeholder}
              value={formValues[_.name]}
              required={_.required}
              onChange={(e) => handleChange(e.target.value, _.name)}
              className="block w-full outline-none border mb-2 px-2 py-3"
            />
          </div>
        );
    }
  });

  return (
    <>
      <div className="relative w-full gap-5 px-10  max-sm:h-96">
        <form onSubmit={(e) => handleSubmit(e)}>
          {FORM}
          <Button className=" bg-black mt-2 flex justify-center items-center gap-2 text-white font-bold text-2xl text-center py-3 px-2 w-full">
            SIGN IN{" "}
            {!isLoading ? (
              <ArrowRight className="inline text-4xl" />
            ) : (
              <Spinner type="grow" color="light" size={"sm"} />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default OBTemplate;
