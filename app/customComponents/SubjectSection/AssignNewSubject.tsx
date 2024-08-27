import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { IClass } from "../ClassSection/AllClasses";
import { IEmployee } from "../StaffSection/AllEmployees";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

type FormValues = {
  className: string;
  subjectName: string;
  classTeacher: string;
};

const AssignNewSubject: React.FC = () => {
  const [error, setError] = useState("");
  const [allClasses, setAllClasses] = useState<IClass[]>([]);
  const [allTeachers, setAllTeachers] = useState<IEmployee[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);

  const dailogRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    setLoading(true);
    const userToken = Cookies.get("token");
    console.log(formValues);
    try {
      const { data, status } = await axios.post(
        "https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/create-subject",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(`Status: ${status}`);
      if (status === 200) {
        setLoading(false);
        reset();
        dailogRef.current?.click();
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const fetchClassesAndSubjects = () => {
    const userToken = Cookies.get("token");
    const teachers = axios.get("https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/get-all-employees", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    });
    const classes = axios.get("https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/get-all-classes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    });
    Promise.all([teachers, classes]).then(([teachers, classes]) => {
      setAllClasses(classes.data);
      setAllTeachers(teachers.data);
    });
  };

  useEffect(() => {
    fetchClassesAndSubjects();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg space-y-6"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Assign Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Subject Name *
              </label>
              <Input
                {...register("subjectName", { required: true })}
                placeholder="Subject Name"
                className="w-full"
              />
              {errors.className && (
                <span className="text-red-500 text-sm p-2">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select Class
              </label>
              <Select onValueChange={(v) => setValue("className", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent {...register("className", { required: true })}>
                  <SelectGroup>
                    {allClasses.map((each) => (
                      <SelectItem key={each.id} value={each.className}>
                        {each.className} {each.sectionName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {
                errors.className && (
                  <span className="text-red-500 text-sm p-2">
                    This field is required
                  </span>
                )
              }
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Teacher
              </label>
              <Select onValueChange={(v) => setValue("classTeacher", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Teacher Name" />
                </SelectTrigger>
                <SelectContent
                  {...register("classTeacher", { required: true })}
                >
                  <SelectGroup>
                    {allTeachers.map((each) => (
                      <SelectItem key={each.id} value={each.employeeName}>
                        {each.employeeName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {
                errors.classTeacher && (
                  <span className="text-red-500 text-sm p-2">
                    This field is required
                  </span>
                )
              }
            </div>
          </div>
        </section>
        <div className="text-red-600">{error}</div>

        <div className="text-center">
          <Button type="submit" className="mt-4">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Subject"
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
            <AlertDialogTitle>Subject Added Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              Navigate To All Subjects Section To See All Subjects
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

export default AssignNewSubject;
