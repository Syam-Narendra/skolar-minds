import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
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
import { Session } from "@remix-run/node";

type FormValues = {
  className: string;
  sectionName: string;
};

const CreateNewClass = ({ session }: { session: any }) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);

  const dailogRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    setLoading(true);
    const userToken = session.data.token;
    try {
      const { data, status } = await axios.post(
        `${process.env.API_URL}/api/create-class`,
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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg space-y-6"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Class Name</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Class Name *
              </label>
              <Input
                {...register("className", { required: true })}
                placeholder="Class Name"
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
                Section Name
              </label>
              <Input
                {...register("sectionName")}
                placeholder="Section Name"
                className="w-full"
              />
            </div>
          </div>
        </section>
        <div className="text-red-600">{error}</div>

        <div className="text-center">
          <Button type="submit" className="mt-4">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
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
            <AlertDialogTitle>Class Created Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              Navigate To All Classes Section To See All Classes
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

export default CreateNewClass;
