import axios from "axios";
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

import { IClass } from "../ClassSection/AllClasses";
import { CountryNamesApiObject } from "../StaffSection/countryNamesApi";

type FormValues = {
  studentName: string;
  // picture?: FileList;
  registrationNo?: string;
  admissionDate: string;
  class: string;
  classTeacherID: string;
  classTeacherName?: string;
  mobile?: string;
  dob?: string;
  gender?: string;
  identificationMark?: string;
  bloodGroup?: string;
  caste?: string;
  religion?: string;
  address?: string;
  fatherName?: string;
  fatherNationalId?: string;
  fatherMobile?: string;
  fatherProfession?: string;
  motherName?: string;
  motherNationalId?: string;
  motherMobile?: string;
  motherProfession?: string;
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
  employeeRole: string;
  employeeDesignation: string;
  salary: number;
  parentName: string;
  nationality: string;
  idType: string;

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
  employeeSignature: string;
  employeeJoiningDateString: string;
  maritalStatus: string;
  subjectExpertise: string;
  healthRecords: string;
  communicationAddress: string;
  educationalQualification: string;
  workExperience: string;
  previousOrganization: string;
  govtQuota: string;
  govtQuotaRemarks: string;
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

  const dailogRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    setLoading(true);
    const userToken = Cookies.get("token");
    console.log(formValues);
    const { data, status } = await axios.post(
      `${process.env.API_URL}/api/create-student`,
      formValues,
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

          <div className="flex flex-wrap mx-2 space-y-4">
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

          <div className="flex flex-wrap mx-2 space-y-4">
            <h1 className="text-sm font-bold text-gray-500">
              Documentation & Experience Details:
            </h1>
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
          <div className="flex flex-wrap mx-2 space-y-4">
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
