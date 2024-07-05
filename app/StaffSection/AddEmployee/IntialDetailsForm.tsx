import { useForm, SubmitHandler } from "react-hook-form";
import { formTypes, setEmployeeObject } from "./globalVariables";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
import { useState } from "react";
type Inputs = {
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
  employeeRole: string;
  employeeDesignation: string;
  salary: number;
};

const employeeSpecializationTypes = {
  TeachingStaff: "Teaching Staff",
  NonTeachingStaff: "Non Teaching Staff",
  Management: "Management",
};

export const IntialDetailsForm = ({
  changeTab,
}: {
  changeTab: (data: string) => void;
}) => {
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
    changeTab(formTypes.PersonalDetails);
    setEmployeeObject(data);
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
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-white px-2">Add Employee Details</h1>
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

          <div className="w-full md:w-1/3 px-2">
            <Select onValueChange={(value) => setValue("employeeType", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
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
            <Select onValueChange={(value) => setValue("employeeRole", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
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
              onValueChange={(value) => setValue("employeeDesignation", value)}
            >
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
                <SelectValue placeholder="Select Employee Designation" />
              </SelectTrigger>
              <SelectContent
                {...register("employeeDesignation", { required: true })}
                className="bg-black text-white "
              >
                <SelectGroup>
                  <EmployeeSpecializationForm />
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.employeeDesignation && (
              <span className="text-red-600">* Please Specify Designation</span>
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
                    <span className="text-[#9CA3AF]">Select Joining Date</span>
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
          <div className="w-full md:w-1/3 px-2 ">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Salary"
              type="number"
              {...register("salary", { required: true, minLength: 1 })}
            />
            {errors.salary && (
              <span className="text-red-600">* Enter Salary</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-2 text-white">
            <Label htmlFor="picture">Upload Picture</Label>
            <Input
              id="picture"
              className="bg-blue-500 border-none"
              type="file"
            />
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
