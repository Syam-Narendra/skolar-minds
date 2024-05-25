import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type Inputs = {
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
  employeeRole: string;
  specifyEmployeeType: string;
};

const formTypes = {
  EmployeeDetails: "EmployeeDetailsForm",
  PersonalDetails: "PersonalDetailsForm",
  CommunicationDetails: "CommunicationDetailsForm",
};

const employeeSpecializationTypes = {
  TeachingStaff: "Teaching Staff",
  NonTeachingStaff: "Non Teaching Staff",
  Management: "Management",
};

export default function App() {
  const [activeForm, setActiveForm] = useState(formTypes.EmployeeDetails);

  const EmployeeDetailsForm = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
    } = useForm<Inputs>();
    const watchedValues = watch();
    const [date, setDate] = useState<Date>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);
      setActiveForm(formTypes.PersonalDetails);
    };

    const EmployeeSpecializationForm = () => {
      const managementStaff = [
        "Principal",
        "Vice Principal",
        "Operations Manager",
        "Activities Director",
        "Accountant",
        "Stationary Manager",
      ];

      const nonTeachingStaff = [
        "Food Service Staff",
        "Support Staff",
        "Custodial Staff",
        "Security Personnel ",
        "Bus Drivers",
        "Bus Aides",
        "Other Technicians",
      ];

      switch (watchedValues.employeeRole) {
        case employeeSpecializationTypes.TeachingStaff:
          return <SelectItem value="Teaching">Teaching</SelectItem>;
        case employeeSpecializationTypes.Management:
          return (
            <>
              {managementStaff.map((each) => (
                <SelectItem
                  key={each}
                  value={each}
                  className="text-white bg-black"
                >
                  {each}
                </SelectItem>
              ))}
            </>
          );
        case employeeSpecializationTypes.NonTeachingStaff:
          return (
            <>
              {nonTeachingStaff.map((each) => (
                <SelectItem
                  key={each}
                  value={each}
                  className="bg-black text-white"
                >
                  {each}
                </SelectItem>
              ))}
            </>
          );
        default:
          return null; // Add a default case to handle other cases
      }
    };

    return (
      <div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-y-3 flex-wrap">
            <div className="w-full mt-3 md:w-1/3 px-2">
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
            <div className="w-full md:w-1/3 px-2">
              <Select
                onValueChange={(value) => setValue("employeeType", value)}
              >
                <SelectTrigger className="bg-black text-white border-slate-600 ">
                  <SelectValue placeholder="Select Employee Type" />
                </SelectTrigger>
                <SelectContent
                  className="bg-black text-white "
                  {...register("employeeType", { required: true })}
                >
                  <SelectGroup>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.employeeType && (
                <span className="text-red-600">
                  * Please select an Employee Type
                </span>
              )}
            </div>

            <div className="w-full md:w-1/3 px-2 ">
              <Select
                onValueChange={(value) => setValue("employeeRole", value)}
              >
                <SelectTrigger className="bg-black text-white border-slate-600 ">
                  <SelectValue placeholder="Select Employee Role" />
                </SelectTrigger>
                <SelectContent
                  {...register("employeeRole", { required: true })}
                  className="bg-black text-white "
                >
                  <SelectGroup>
                    {Object.values(employeeSpecializationTypes).map((each) => (
                      <SelectItem key={each} value={each}>
                        {each}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.employeeRole && (
                <span className="text-red-600">
                  * Please select an Employee Role
                </span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2">
              <Select
                onValueChange={(value) =>
                  setValue("specifyEmployeeType", value)
                }
              >
                <SelectTrigger className="bg-black text-white border-slate-600 ">
                  <SelectValue placeholder="Select Employee Role" />
                </SelectTrigger>
                <SelectContent
                  {...register("specifyEmployeeType", { required: true })}
                  className="bg-black text-white "
                >
                  <SelectGroup>
                    <EmployeeSpecializationForm />
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.specifyEmployeeType && (
                <span className="text-red-600">
                  * Please Specify Employee Type
                </span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2">
              <Popover>
                <PopoverTrigger className="bg-black  hover:bg-black" asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="text-white">Select Joining Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-black text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="px-2">
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
      <div className="flex flex-col md:flex-row m-5 p-2 bg-stone-950 rounded-[0.5rem] bg-272727">
        <button
          onClick={() => setActiveForm(formTypes.EmployeeDetails)}
          className={`${
            activeForm === formTypes.EmployeeDetails && "bg-black text-white"
          } w-full md:w-1/3  p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Employee Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.PersonalDetails)}
          className={`${
            activeForm === formTypes.PersonalDetails && "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.CommunicationDetails)}
          className={`${
            activeForm === formTypes.CommunicationDetails &&
            "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Communicaton Details
        </button>
      </div>

      <div className="space-y-4 pl-5">
        <h1 className="text-white px-2">Add New Employee</h1>
        {renderActiveForm()}
      </div>
    </div>
  );
}
