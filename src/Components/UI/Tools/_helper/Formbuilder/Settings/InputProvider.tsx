import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

const InputProvider = ({
  schema,
  settings,
  handleChange,
  handleSubmit,
  title,
}: {
  schema: {
    type: string;
    name: string;
    value: boolean | string;
    label: string;
    checked?: boolean | string;
    options?: [];
  }[];
  data: { [key: string]: string };
  settings: { [key: string]: any };
  handleChange: (newVal: string, name: string | boolean) => void;
  handleSubmit(): void;
  title: string;
}) => {
  const FORM = schema.map((_, i) => {
    switch (_.type) {
      case "switch":
        return (
          <div className="relative " key={i}>
            <FormGroup
              switch
              key={i}
              className="flex justify-between  px-0 items-center"
            >
              <Label> {_.label}</Label>
              <Input
                color="dark"
                type="switch"
                value={settings[_.name]}
                checked={settings[_.name]}
                onChange={(e) => {
                  handleChange(_.name, e.currentTarget.checked);
                }}
              />
            </FormGroup>
          </div>
        );
      case "select":
        return (
          <div className="relative" key={i}>
            <FormGroup
              key={i}
              className="flex justify-between  px-0 items-center"
            >
              <Label> {_.label}</Label>
              <Input
                color="dark"
                type="select"
                value={settings[_.name]}
                onChange={(e) => handleChange(_.name, e.currentTarget.checked)}
              />
              <option>--select--</option>
              <option>USD</option>
              <option>NGN</option>
              <option>EUR</option>
              <option>KWT</option>
            </FormGroup>
          </div>
        );

      default:
        return (
          <div className="relative" key={i}>
            <FormGroup key={i}>
              <Label> {_.label}</Label>
              <Input
                type="text"
                className="form-control text-gray-400"
                value={settings[_.name]}
                onChange={(e) => handleChange(_.name, e.target.value)}
              />
            </FormGroup>
          </div>
        );
    }
  });

  return (
    <>
      <Card className="w-full border-none h-96 max-sm:h-auto shadow-md">
        <CardBody className="border-none text-gray-400">
          <h1 className="text-2xl max-sm:text-xl mb-2"> {title}</h1>
          <hr />
          <br />
          <Form
            className="grid grid-cols-1 gap-2 max-sm:grid-cols-1  max-sm:mt-0"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {FORM}
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default InputProvider;
