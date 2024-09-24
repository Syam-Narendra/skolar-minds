import { format } from "date-fns";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { CountryNamesApiObject } from "./countryNamesApi";
type Inputs = {
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
  employeeRole: string;
  employeeDesignation: string;
  salary: number;
  parentName: string;
  nationality: string;
  idType: string;
  gender: string;
  bloodGroup: string;
  email: string;
  emergencyContactNumber: number;
  pincode: number;
  userStatus: string;
  userRole: string;
  employeeSpecialization: string;
  employeeSpecializationType: string;
  idCard: string;
  idCardNumber: number;
  employeeImage: string;
  maritalStatus: string;
  subjectExpertise: string;
  religion: string;
  healthRecords: string;
  communicationAddress: string;
  educationalQualification: string;
  workExperience: string;
  previousOrganization: string;
};

const employeeSpecializationTypes = {
  TeachingStaff: "Teaching Staff",
  NonTeachingStaff: "Non Teaching Staff",
  Management: "Management",
};

const iDCards = {
  Aadhaar: "Aadhaar Card",
  PAN: "PAN Card",
  VoterID: "Voter ID Card",
  DrivingLicense: "Driving License",
  Passport: "Passport",
  RationCard: "Ration Card",
};

export const CombinedForm = () => {
  const [isloadingButton, setLoadingButton] = useState(false);
  const dailogRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<Inputs>();
  const watchedValues = watch();
  const [date, setDate] = useState<Date>();
  const [joiningDate, setJoiningDate] = useState<Date>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const randomEmployeeId = "EMP-" + Math.floor(Math.random() * 1000);
    setLoadingButton(true);
    console.log(`formValues`, formData);
    const userToken = Cookies.get("token");
    const { data, status } = await axios.post(
      `${process.env.API_URL}/api/create-employee`,
      { employeeId: randomEmployeeId, ...formData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    if (status === 200) {
      setLoadingButton(false);
      reset();
      dailogRef.current?.click();
    }
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
              <SelectItem key={each} value={each}>
                {each}
              </SelectItem>
            ))}
          </>
        );
      case employeeSpecializationTypes.NonTeachingStaff:
        return (
          <>
            {nonTeachingStaff.map((each) => (
              <SelectItem key={each} value={each}>
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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Employee Details</h1>
      <form
        className="space-y-4"
        onChange={() => clearErrors()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap mx-2 space-y-4">
          <h1 className="text-sm font-bold text-gray-500">Basic Information</h1>
        </div>
        <div className="flex flex-wrap mx-2 space-y-4">
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Employee Name *"
              {...register("employeeName", { required: true })}
            />
            {errors.employeeName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Gender *" />
              </SelectTrigger>
              <SelectContent {...register("gender", { required: true })}>
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && (
              <span className="text-red-600">* Please select Gender</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-gray-500">Date of Birth *</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Mobile Number *"
              type="number"
              {...register("mobileNumber", { required: true })}
            />
            {errors.mobileNumber && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !joiningDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {joiningDate ? (
                    format(joiningDate, "PPP")
                  ) : (
                    <span className="text-gray-500">Joining Date *</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="single"
                  selected={joiningDate}
                  onSelect={setJoiningDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Salary"
              type="number"
              {...register("salary", { required: true })}
            />
            {errors.salary && <span className="text-red-600">* Required</span>}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("employeeType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Employee Type *" />
              </SelectTrigger>
              <SelectContent {...register("employeeType", { required: true })}>
                <SelectGroup>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.employeeType && (
              <span className="text-red-600">
                * Please select Employee Type
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("employeeRole", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Employee Role" />
              </SelectTrigger>
              <SelectContent {...register("employeeRole", { required: true })}>
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
                * Please select Employee Role
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select
              onValueChange={(value) => setValue("employeeDesignation", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Employee Designation *" />
              </SelectTrigger>
              <SelectContent
                {...register("employeeDesignation", { required: true })}
              >
                <SelectGroup>
                  <EmployeeSpecializationForm />
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.employeeDesignation && (
              <span className="text-red-600">
                * Please select Employee Designation
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select
              onValueChange={(value) => setValue("subjectExpertise", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Subject Expertise *" />
              </SelectTrigger>
              <SelectContent
                {...register("subjectExpertise", { required: true })}
              >
                <SelectGroup>
                  <SelectItem value="Maths">Maths</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.employeeDesignation && (
              <span className="text-red-600">
                * Please select Employee Designation
              </span>
            )}
          </div>

          <div className="flex flex-wrap mx-2 space-y-4 w-full">
            <h1 className="text-sm font-bold text-gray-500">
              Personal Information
            </h1>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("bloodGroup", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Blood Group *" />
              </SelectTrigger>
              <SelectContent {...register("bloodGroup", { required: true })}>
                <SelectGroup>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.bloodGroup && (
              <span className="text-red-600">* Please select Blood Group</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("maritalStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Marital Status " />
              </SelectTrigger>
              <SelectContent {...register("maritalStatus")}>
                <SelectGroup>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Prefer Not to Say">
                    Prefer Not to Say
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("religion", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Religion" />
              </SelectTrigger>
              <SelectContent {...register("religion")}>
                <SelectGroup>
                  <SelectItem value="Hinduism">Hinduism</SelectItem>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("nationality", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Nationality" />
              </SelectTrigger>
              <SelectContent {...register("nationality", { required: true })}>
                <SelectGroup>
                  <CountryNamesApiObject />
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.nationality && (
              <span className="text-red-600">* Please select Nationality</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Parent/Spouse Name"
              {...register("parentName", { required: true })}
            />
            {errors.parentName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Emergency Contact Number"
              type="number"
              {...register("emergencyContactNumber", { required: true })}
            />
            {errors.emergencyContactNumber && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Communication Address"
              {...register("communicationAddress")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Pincode"
              type="number"
              {...register("pincode", { required: true })}
            />
            {errors.pincode && <span className="text-red-600">* Required</span>}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Health and Medical Records (if any chronic conditions)"
              {...register("healthRecords")}
            />
          </div>

          <div className="flex flex-wrap mx-2 space-y-4 w-full">
            <h1 className="text-sm font-bold text-gray-500">
              Documentation & Experience Details:
            </h1>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("idType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="ID Card Type *" />
              </SelectTrigger>
              <SelectContent {...register("idType", { required: true })}>
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
              <span className="text-red-600">* Please select ID Card Type</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Id Card Number"
              {...register("idCardNumber", { required: true })}
            />
            {errors.idCardNumber && (
              <span className="text-red-600">* Required</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select
              onValueChange={(value) =>
                setValue("educationalQualification", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Educational Qualification *" />
              </SelectTrigger>
              <SelectContent
                {...register("educationalQualification", { required: true })}
              >
                <SelectGroup>
                  <SelectItem value="Bachelor Degree">
                    Bachelor Degree
                  </SelectItem>
                  <SelectItem value="Master Degree">Master Degree</SelectItem>
                  <SelectItem value="Ph.D">Ph.D</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.bloodGroup && (
              <span className="text-red-600">
                * Please select Educational Qualification
              </span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Work Experience"
              {...register("workExperience")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Previous Organization"
              {...register("previousOrganization")}
            />
          </div>
          <div className="flex flex-wrap mx-2 space-y-4 w-full">
            <h1 className="text-sm font-bold text-gray-500">
              Access and Permissions:
            </h1>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("userRole", value)}>
              <SelectTrigger>
                <SelectValue placeholder="User Role *" />
              </SelectTrigger>
              <SelectContent {...register("userRole", { required: true })}>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && (
              <span className="text-red-600">* Please select User Role</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select onValueChange={(value) => setValue("userStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="User Status " />
              </SelectTrigger>
              <SelectContent {...register("userStatus", { required: true })}>
                <SelectGroup>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">InActive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full px-2">
          <Button type="submit" className="min-w-10" disabled={isloadingButton}>
            {isloadingButton ? (
              <Loader2 className="mr-2 h-4 w-20 animate-spin" />
            ) : (
              "Add Employee"
            )}
          </Button>
        </div>
      </form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hidden" ref={dailogRef}>
            Show Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Employee Created Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              Navigate To All Employees Section To See All Employees
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Done</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
