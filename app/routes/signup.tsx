import { SubmitHandler, useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const onSubmit: SubmitHandler<{ email: string; password: string }> = (data) =>
    console.log(data);
  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "employeeSize", label: "Employee Size", type: "number" },
    { name: "studentsSize", label: "Students Size", type: "number" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    { name: "schoolName", label: "School Name", type: "text" },
    { name: "schoolAddress", label: "School Address", type: "text" },
    { name: "district", label: "District", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('https://i.ibb.co/tY1mPz1/bg.png')]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(path_to_your_image.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className=" relative bg-[#151515] bg-opacity-30 backdrop-blur-xl p-8 rounded-lg shadow-[0_-4px_10px_rgba(255,255,255,0.1)] w-full max-w-fit">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Start Your 7 Day Free Trial !
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 pb-5"
        >
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-white mb-1" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                // placeholder={field.placeholder}
                id={field.name}
                {...register(field.name as "email" | "password", {
                  required: `${field.label} is required`,
                })}
                type={field.type}
                className="p-2 rounded-lg bg-transparent border-2 border-[#70707B] text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
              />
              {errors[field.name as "email" | "password"] && (
                <span className="text-red-500 text-sm">
                  {errors[
                    field.name as "email" | "password"
                  ]?.message?.toString()}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-2 bg-[#1877F2] text-white rounded mt-3 hover:bg-gray-200 transition duration-200"
            >
              Sign Up For Verification
            </button>
          </div>
          <a href="/" className="text-[#70707B] hover:underline text-sm content-center text-right md:col-span-2">
            Already have an account? Sign In
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
