import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

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
import { formTypes, setEmployeeObject } from "./globalVariables";

type Inputs = {
  parentName: string;
  nationality: string;
  idType: string;
  gender: string;
  salary: number;
  bloodGroup: string;
  email: string;
};

const iDCards = {
  Aadhaar: "Aadhaar Card",
  PAN: "PAN Card",
  VoterID: "Voter ID Card",
  DrivingLicense: "Driving License",
  Passport: "Passport",
  RationCard: "Ration Card",
};

export const PersonalDetailsForm = ({
  changeTab,
}: {
  changeTab: (data: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [date, setDate] = useState<Date>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    changeTab(formTypes.CommunicationDetails);
    setEmployeeObject(data);
  };

  return (
    <div id="personalDetailsForm">
      <h1 className="text-white px-2">Add Personal Details</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-y-3 flex-wrap">
          <div className="w-full mt-3 md:w-1/3 px-2">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Parent/Spouse Name"
              {...register("parentName", { required: true })}
            />
            {errors.parentName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>

          <div className="w-full md:w-1/3 px-2">
            <Select onValueChange={(value) => setValue("nationality", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
                <SelectValue placeholder="Nationality" />
              </SelectTrigger>
              <SelectContent
                className="bg-black text-white "
                {...register("nationality", { required: true })}
              >
                <SelectGroup>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.nationality && (
              <span className="text-red-600">* Please select Nationality</span>
            )}
          </div>

          <div className="w-full md:w-1/3 px-2">
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
                <SelectValue placeholder="Select Employee Gender" />
              </SelectTrigger>
              <SelectContent
                {...register("gender", { required: true })}
                className="bg-black text-white "
              >
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && (
              <span className="text-red-600">* Please Specify Gender</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-2 ">
            <Select onValueChange={(value) => setValue("idType", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
                <SelectValue placeholder="Id Type" />
              </SelectTrigger>
              <SelectContent
                {...register("idType", { required: true })}
                className="bg-black text-white "
              >
                <SelectGroup>
                  {Object.values(iDCards).map((each) => (
                    <SelectItem key={each} value={each}>
                      {each}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.idType && (
              <span className="text-red-600">* Please select Id Type</span>
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
                    <span className="text-[#9CA3AF]">Date Of Birth</span>
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
          <div className="w-full md:w-1/3 px-2">
            <Select onValueChange={(value) => setValue("bloodGroup", value)}>
              <SelectTrigger className="bg-black text-[#9CA3AF] border-slate-600 ">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent
                className="bg-black text-white "
                {...register("bloodGroup", { required: true })}
              >
                <SelectGroup>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.bloodGroup && (
              <span className="text-red-600">* Please select Blood Group</span>
            )}
          </div>
          <div className="w-full mt-3 md:w-1/3 px-2">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-red-600">* Invalid E-mail</span>
            )}
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
