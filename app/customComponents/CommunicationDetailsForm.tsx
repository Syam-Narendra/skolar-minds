import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  parentName: string;
  nationality: string;
  idType: string;
  gender: string;
  salary: number;
  bloodGroup: string;
  email: string;
};

export const CommunicationDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
              {...register("parentName", { required: true })}
            />
            {errors.parentName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full mt-3 md:w-1/3 px-2">
            <p className="mb-1 text-sm text-black">g</p>
            <input
              className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Emergency Contact Number"
              {...register("parentName", { required: true })}
            />
            {errors.parentName && (
              <span className="text-red-600">* Required</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-2"></div>

          <div className="w-full mt-3 md:w-1/3 px-2">
            <p className="mb-1 text-sm text-[#38BDF8]">Communication Details</p>
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
