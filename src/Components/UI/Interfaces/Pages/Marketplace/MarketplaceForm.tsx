import { useState } from "react";
import { Input } from "reactstrap";
import useSmartContractController from "../../../../Web3/Credentials/Index";
import { toast } from "react-toastify";
const MarketplaceForm = ({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: (arg: boolean) => void;
}) => {
  const { handleListNewJob } = useSmartContractController();

  const [formData, setFormData] = useState<{
    [key: string]: string | number | any;
  }>({
    jobTitle: "",
    jobDuration: "",
    budget: 0,
    deadline: "",
    category: "",
    description: "",
  });

  const handleFormDataChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = () => {
    const { category, jobDuration, jobTitle, budget, description } = formData;
    const unixTIme = Math.floor(new Date(formData.deadline).getTime() / 1000);

    const hasEmptyField = Object.keys(formData).filter(
      (key) => formData[key] == ""
    );
    if (hasEmptyField.length > 0) {
      toast.warning("Missing form details in the form fields", {
        theme: "dark",
        position: "top-center",
      });
    } else {
      return handleListNewJob(
        jobTitle,
        jobDuration,
        budget,
        description,
        unixTIme,
        category
      );
      //   console.log(unixTIme);
    }
  };

  return (
    <div className="z-50 gap-1 bg-purple-300 w-1/2 max-sm:w-full mt-10  p-2 h-auto rounded-lg relative">
      <button
        onClick={() => setIsToggled(!isToggled)}
        className="w-20 z-30 p-1 rounded-md bg-red-500 text-white absolute right-4 top-2"
      >
        close
      </button>

      <div className="relative p-2 grid grid-cols-1 gap-1 h-auto mt-6 max-sm:mt-4">
        <div className="relative block">
          <b>Title</b>
          <Input
            className="border border-gray-300 w-full h-12  outline-none rounded-md px-3 max-sm:py-2 py-3"
            type={"text"}
            placeholder="Business title"
            value={formData.jobTitle}
            name={""}
            onChange={(e) => handleFormDataChange("jobTitle", e.target.value)}
            required={true}
          />
        </div>

        <div className="relative block">
          <b>Execution duration</b>
          <Input
            className="border border-gray-300 w-full h-12  outline-none rounded-md px-3 max-sm:py-2 py-3"
            type={"text"}
            placeholder="Execution duration. e.g 2 weeks "
            value={formData.jobDuration}
            name={""}
            onChange={(e) =>
              handleFormDataChange("jobDuration", e.target.value)
            }
            required={true}
          />
        </div>

        <div className="relative block">
          <b>Deal budget</b>
          <Input
            className="border border-gray-300 w-full h-12  outline-none rounded-md px-3 max-sm:py-2 py-3"
            type={"number"}
            placeholder="Deal budget"
            value={formData.budget}
            name={""}
            onChange={(e) => handleFormDataChange("budget", e.target.value)}
            required={true}
          />
        </div>

        <div className="relative block">
          <b>Deal deadline</b>

          <Input
            className="border border-gray-300 w-full h-12  outline-none rounded-md px-3 max-sm:py-2 py-3"
            type="date"
            placeholder="Business deadline"
            value={formData.deadline}
            name={""}
            onChange={(e) => handleFormDataChange("deadline", e.target.value)}
            required={true}
          />
        </div>
      </div>

      <div className="relative p-2  gap-2 flex flex-col">
        <div className="relative block">
          <b>Deal category</b>

          <select
            name="category"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => handleFormDataChange("category", e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="IT">IT</option>
            <option value="Construction">Construction</option>
            <option value="Enviromental">Enviromental</option>
            <option value="Enviromental">Others</option>
          </select>
        </div>

        <div className="relative">
          <b>Deal description</b>
          <textarea
            onChange={(e) =>
              handleFormDataChange("description", e.target.value)
            }
            className="border h-[12rem] max-sm:h-auto w-full p-4 rounded-lg"
            value={formData.description}
          ></textarea>
        </div>
      </div>

      <div className="relative p-2 flex  h-auto  w-full justify-end gap-2 items-center">
        <button
          onClick={handleFormSubmit}
          className="w-20 p-1 rounded-md bg-green-500 text-white"
        >
          proceed
        </button>

        <button
          // onClick={() => setIsTOggled(!isToggled)}
          className="w-20 p-1 rounded-md bg-red-500 text-white"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default MarketplaceForm;
