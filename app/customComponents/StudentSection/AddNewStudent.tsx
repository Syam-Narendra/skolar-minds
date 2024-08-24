import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { IEmployee } from "../StaffSection/AllEmployees";

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
};

const StudentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const userToken = Cookies.get("token");
    console.log(formValues);
    const { data } = await axios.post(
      "http://localhost:3000/api/create-student",
      formValues,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    console.log(data);
  };
  const [classTeachers, setClassTeachers] = useState<IEmployee[]>([]);

  const fetchClassTeachers = async () => {
    const userToken = Cookies.get("token");
    console.log(userToken);
    const { data, status } = await axios.get(
      "http://localhost:3000/api/get-all-employees",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    console.log(`Class Teachers Data`, data[0].id.toString());
    setClassTeachers(data);
  };

  useEffect(() => {
    fetchClassTeachers();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg space-y-6"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name*
            </label>
            <Input
              {...register("studentName", { required: true })}
              placeholder="Name of Student"
              className="w-full"
            />
            {errors.studentName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Picture</label>
            <Input type="file" {...register('picture')} className="w-full" />
            <small className="text-gray-600">Max size 100KB</small>
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Registration No
            </label>
            <Input
              {...register("registrationNo")}
              placeholder="Registration No"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Admission*
            </label>
            <Input
              type="date"
              {...register("admissionDate", { required: true })}
              className="w-full"
            />
            {errors.admissionDate && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Class*
            </label>
            <Input type="text" {...register("class", { required: true })} />
            {/* <Select {...register("class", { required: true })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="null"></SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
            {errors.class && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile No. for SMS/WhatsApp
            </label>
            <Input
              {...register("mobile")}
              placeholder="e.g +91xxxxxxxxxx"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Class Teacher
            </label>
            <Select
              onValueChange={(value) => setValue("classTeacherID", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classTeachers.map((classTeacher) => (
                    <SelectItem
                      key={classTeacher.id}
                      value={classTeacher.id.toString()}
                    >
                      {classTeacher.employeeName}
                    </SelectItem>
                  ))}
                  <SelectItem value="null">Assign Later</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Other Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Date Of Birth
            </label>
            <Input type="date" {...register("dob")} className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Any Identification Mark?
            </label>
            <Input
              {...register("identificationMark")}
              placeholder="Any Identification Mark?"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <Input
              {...register("bloodGroup")}
              placeholder="Blood Group"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Caste</label>
            <Input
              {...register("caste")}
              placeholder="Caste"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Religion</label>
            <Input
              {...register("religion")}
              placeholder="Religion"
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <Textarea
              {...register("address")}
              placeholder="Address"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* 3. Father/Guardian Information */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Father/Guardian Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Father Name
            </label>
            <Input
              {...register("fatherName")}
              placeholder="Father Name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Father National ID
            </label>
            <Input
              {...register("fatherNationalId")}
              placeholder="Father National ID"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile No</label>
            <Input
              {...register("fatherMobile")}
              placeholder="Mobile No"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <Input
              {...register("fatherProfession")}
              placeholder="Profession"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* 4. Mother Information */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Mother Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mother Name
            </label>
            <Input
              {...register("motherName")}
              placeholder="Mother Name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mother National ID
            </label>
            <Input
              {...register("motherNationalId")}
              placeholder="Mother National ID"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile No</label>
            <Input
              {...register("motherMobile")}
              placeholder="Mobile No"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <Input
              {...register("motherProfession")}
              placeholder="Profession"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="text-center">
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
