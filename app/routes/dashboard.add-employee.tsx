import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Inputs = {
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
};

const formTypes = {
  EmployeeDetails: "EmployeeDetailsForm",
  PersonalDetails: "PersonalDetailsForm",
  CommunicationDetails: "CommunicationDetailsForm",
};

export default function App() {
  const [activeForm, setActiveForm] = useState(formTypes.EmployeeDetails);

  const EmployeeDetailsForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = () =>
      setActiveForm(formTypes.PersonalDetails);

    return (
      <div>
        <form className="space-y-4 pl-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/3 px-2 ">
              <input
                className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
                placeholder="Name"
                {...register("employeeName", { required: true })}
              />
              {errors.employeeName && (
                <span className="text-red-600">* Required</span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2 ">
              <input
                className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
                placeholder="Mobile Number"
                type="number"
                {...register("mobileNumber", { required: true, maxLength: 10 })}
              />
              {errors.mobileNumber && (
                <span className="text-red-600">* Invalid Mobile Number</span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2 bg-white ">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Next"
            />
          </div>
        </form>
      </div>
    );
  };

  const PersonalDetailsForm = () => <h1>fhv</h1>;

  const CommunicationDetailsForm = () => <h1>Communication Details</h1>;

  const renderActiveForm = () => {
    switch (activeForm) {
      case formTypes.EmployeeDetails:
        return <EmployeeDetailsForm />;
      case formTypes.PersonalDetails:
        return <PersonalDetailsForm />;
      case formTypes.CommunicationDetails:
        return <CommunicationDetailsForm />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row m-5 p-2 rounded-lg bg-272727">
        <button
          onClick={() => setActiveForm(formTypes.EmployeeDetails)}
          className={`${
            activeForm === formTypes.EmployeeDetails && "bg-black text-white"
          } w-full md:w-1/3  p-2 text-gray-400 font-bold rounded-lg`}
        >
          Employee Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.PersonalDetails)}
          className={`${
            activeForm === formTypes.PersonalDetails && "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-md`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.CommunicationDetails)}
          className={`${
            activeForm === formTypes.CommunicationDetails &&
            "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-md`}
        >
          Communicaton Details
        </button>
      </div>
      <div>{renderActiveForm()}</div>
    </div>
  );
}
