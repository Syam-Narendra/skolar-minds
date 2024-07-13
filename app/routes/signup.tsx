import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface FormFields {
  name: string;
  email: string;
  mobile: string;
  employeeSize: string;
  studentsSize: string;
  schoolName: string;
  schoolAddress: string;
  district: string;
  state: string;
  country: string;
  pincode: number;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) =>{
    if( data.password !== data.confirmPassword){
      setError("Passwords do not match");
    }else{
      fetch("http://localhost:3000/api/create-account",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          setError("");
          console.log("success");
        } else {
          setError("Something went wrong");
        }
      })
    }

    console.log(data);
  }
    


  const formFields = [
    { name: "name", label: "Your Name", type: "text" },
    { name: "schoolName", label: "School Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "number" },
    { name: "employeeSize", label: "Employee Size", type: "number" },
    { name: "studentsSize", label: "Students Size", type: "number" },
    { name: "schoolAddress", label: "School Address", type: "text" },
    { name: "district", label: "District", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/tY1mPz1/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className=" relative bg-[#151515] bg-opacity-30 backdrop-blur-xl p-8 rounded-lg shadow-[0_-4px_10px_rgba(255,255,255,0.1)] w-full max-w-fit">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Start Your 7 Day Free Trial !
        </h2>
        <form
          onChange={() => setError("")}
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 pb-5"
        >
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <input
                autoComplete="off"
                placeholder={field.label}
                id={field.name}
                {...register(field.name as keyof FormFields, {
                  required: `${field.label} is required`,
                })}
                type={field.type}
                className={`p-2 rounded-lg bg-transparent border-2  border-[#70707B] text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent`}
              />
              {errors[field.name as keyof FormFields] ? (
                <span className="text-red-500 text-sm mt-2">
                  {errors[field.name as keyof FormFields]?.message?.toString()}
                </span>
              ) : (
                <span className="text-white text-sm mt-2 text-transparent">
                  .
                </span>
              )}
            </div>
          ))}
          <div className=" flex flex-col items-center justify-center md:col-span-full gap-4">
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              type="submit"
              className=" p-2 bg-[#1877F2] text-white rounded mt-3 transition duration-200"
            >
              Sign Up For Verification
            </button>
            <a
              href="/"
              className="text-[#70707B]  hover:underline text-sm text-center md:col-span-2"
            >
              Already have an account? Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
