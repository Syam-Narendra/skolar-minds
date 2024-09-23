import { CalendarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { format, set } from "date-fns";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { IEmployee } from "../StaffSection/AllEmployees";

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

import { Loader2 } from "lucide-react";

import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { IClass } from "../ClassSection/AllClasses";
import { CountryNamesApiObject } from "../StaffSection/countryNamesApi";

type FormValues = {
  firstName: string;
  lastName: string;
  transportEnrollment: string;
  transportEnrollmentRemarks: string;
  previousInstitution: string;
  annualFee: number;
  admissionDate: string;
  gender?: string;
  bloodGroup?: string;
  caste?: string;
  religion?: string;
  fatherName?: string;
  fatherMobile?: string;
  fatherOccupation: string;
  motherName?: string;
  motherOccupation: string;
  motherMobile?: string;
  mobileNumber: number;
  nationality: string;
  motherEducation: string;
  idType: string;
  fatherEducation: string;
  email: string;
  pincode: number;
  idCardNumber: number;
  healthRecords: string;
  communicationAddress: string;
  govtQuota: string;
  govtQuotaRemarks: string;
};

const iDCards = {
  Aadhaar: "Aadhaar Card",
  PAN: "PAN Card",
  VoterID: "Voter ID Card",
  DrivingLicense: "Driving License",
  Passport: "Passport",
  RationCard: "Ration Card",
};

export const StudentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [isloadingButton, setLoading] = useState(false);
  const watchedValues = watch();
  const [date, setDate] = useState<Date>();
  const [admissionDate, setAdmissionDate] = useState<Date>();

  const dailogRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const randomStudentId = `SCH-${Math.floor(Math.random() * 1000000)}`;
    const allValues = {
      studentId: randomStudentId,
      ...formValues,
    };
    setLoading(true);
    const userToken = Cookies.get("token");
    console.log(formValues);
    const { data, status } = await axios.post(
      `${process.env.API_URL}/api/create-student`,
      allValues,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    if (status === 200) {
      setLoading(false);
      reset();
      dailogRef.current?.click();
    }
  };
  const [classTeachers, setClassTeachers] = useState<IEmployee[]>([]);
  const [classes, setClasses] = useState<IClass[]>([]);

  const fetchClassTeachers = async () => {
    const userToken = Cookies.get("token");
    console.log(userToken);
    const { data, status } = await axios.get(
      `${process.env.API_URL}/api/get-all-employees`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    setClassTeachers(data);
    fetch(`${process.env.API_URL}/api/get-all-classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClassTeachers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Student Details</h1>
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
            <Select onValueChange={(value) => setValue("govtQuota", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Govt Quota *" />
              </SelectTrigger>
              <SelectContent {...register("govtQuota", { required: true })}>
                <SelectGroup>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {watchedValues.govtQuota === "yes" && (
            <div className="w-full md:w-1/2 px-2">
              <input
                disabled={watchedValues.govtQuota !== "yes"}
                className={`border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none ${
                  watchedValues.govtQuota !== "yes" && "cursor-not-allowed"
                }`}
                placeholder={
                  watchedValues.govtQuota === "yes"
                    ? "Remarks for Govt. Quota"
                    : "🚫"
                }
                {...register("govtQuotaRemarks", { required: true })}
              />
            </div>
          )}

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="First Name *"
              {...register("firstName", {
                required: "First Name is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Last Name *"
              {...register("lastName", {
                required: "Last Name is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
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
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none cursor-not-allowed"
              placeholder="Student ID will  be auto generated"
              disabled
            />
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
                    !admissionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {admissionDate ? (
                    format(admissionDate, "PPP")
                  ) : (
                    <span className="text-gray-500">Date of Admission *</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="single"
                  selected={admissionDate}
                  onSelect={setAdmissionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <Select
              onValueChange={(value) => setValue("transportEnrollment", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Transport Enrollment *" />
              </SelectTrigger>
              <SelectContent
                {...register("transportEnrollment", { required: true })}
              >
                <SelectGroup>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {watchedValues.transportEnrollment === "yes" && (
            <div className="w-full md:w-1/2 px-2">
              <input
                disabled={watchedValues.govtQuota !== "yes"}
                className={`border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none ${
                  watchedValues.govtQuota !== "yes" && "cursor-not-allowed"
                }`}
                placeholder={
                  watchedValues.transportEnrollment === "yes"
                    ? "Remarks for Transport"
                    : "🚫"
                }
                {...register("transportEnrollmentRemarks", { required: true })}
              />
            </div>
          )}

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Annual Fee *"
              {...register("annualFee", { required: true })}
            />
            {errors.annualFee && (
              <span className="text-red-600">* Required</span>
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
            <Select onValueChange={(value) => setValue("caste", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Caste" />
              </SelectTrigger>
              <SelectContent {...register("caste")}>
                <SelectGroup>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                  <SelectItem value="Minority">Minority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Previous Institution Name"
              {...register("previousInstitution")}
            />
          </div>

          <div className="flex flex-wrap mx-2 space-y-4 w-full">
            <h1 className="text-sm font-bold text-gray-500">
              Father's Details
            </h1>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Father Name"
              {...register("fatherName")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Father Occupation"
              {...register("fatherOccupation")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Education"
              {...register("fatherEducation")}
            />
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Mobile Number"
              type="number"
              {...register("fatherMobile")}
            />
          </div>

          <div className="flex flex-wrap mx-2 space-y-4 w-full">
            <h1 className="text-sm font-bold text-gray-500">
              Mother's Details
            </h1>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Mother Name"
              {...register("motherName")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Mother Occupation"
              {...register("motherOccupation")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Education"
              {...register("motherEducation")}
            />
          </div>

          <div className="w-full md:w-1/2 px-2">
            <input
              className="border border-gray- rounded-md p-2 w-full bg-transparent focus:outline-none"
              placeholder="Mobile Number"
              type="number"
              {...register("motherMobile")}
            />
          </div>
        </div>

        <div className="w-full px-2">
          <Button type="submit" className="min-w-10" disabled={isloadingButton}>
            {isloadingButton ? (
              <Loader2 className="mr-2 h-4 w-20 animate-spin" />
            ) : (
              "Add Student"
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
            <AlertDialogTitle>Student Created Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              Navigate To All Students Section To See All Students
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
