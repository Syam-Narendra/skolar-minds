import { useForm, SubmitHandler } from "react-hook-form";
import { setEmployeeObject } from "./globalVariables";

type Inputs = {
  emergencyContactName: string;
  emergencyContactNumber: number;
  doorNumber: string;
  pincode: number;
  streetName: string;
};

export const CommunicationDetailsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { pincode } = watch();
  console.log(pincode);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmployeeObject(data);
  };

  return (
    <div id="personalDetailsForm">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-y-3 flex-wrap">
          <div className="w-full mt-3 md:w-1/3 px-2">
            <p className="mb-1 text-sm text-[#38BDF8]">
              Emergency Contact Details
            </p>
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Emergency Contact Name"
              {...register("emergencyContactName", { required: true })}
            />
            {errors.emergencyContactName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full mt-3 md:w-1/3 px-2">
            <p className="mb-1 text-sm text-black">g</p>
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Emergency Contact Number"
              {...register("emergencyContactNumber", { required: true })}
            />
            {errors.emergencyContactNumber && (
              <span className="text-red-600">* Required</span>
            )}
          </div>

          <p className="mb-1 w-full px-2 text-sm text-[#38BDF8]">
            Communication Details
          </p>

          <div className="w-full mt-3 md:w-1/3 px-2">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Door No."
              {...register("doorNumber", { required: true })}
            />
            {errors.doorNumber && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full mt-3 md:w-1/3 px-2">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Street Name"
              {...register("streetName", {
                required: true,
              })}
            />
            {errors.streetName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full mt-3 md:w-1/3 px-2">
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Pincode"
              {...register("pincode", {
                required: true,
              })}
            />
            {errors.pincode && (
              <span className="text-red-600">* Invalid Pincode</span>
            )}
          </div>
        </div>

        <div className="px-2">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};
