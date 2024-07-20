import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
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

const Form = ({
  setShowForm,
}: {
  setShowForm: (showForm: boolean) => void;
}) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    setError("");
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
    } else {
      try {
        const { data, status } = await axios.post(
          "https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/create-account",
          formData
        );
        if (status === 200) {
          setError("");
          setShowForm(false);
          console.log(data);
          console.log(formData);
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        const err = error as AxiosError;
        const errorMsg = err.response?.data as { message: string };
        setError(errorMsg.message);
        setLoading(false);
      }
    }
  };

  const formFields = [
    { name: "name", label: "Your Name", type: "text" },
    { name: "schoolName", label: "School Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "number" },
    { name: "employeeSize", label: "Employee Size", type: "number" },
    { name: "studentSize", label: "Students Size", type: "number" },
    { name: "schoolAddress", label: "School Address", type: "text" },
    { name: "district", label: "District", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <div className=" relative bg-[#151515] bg-opacity-30 backdrop-blur-xl p-6 rounded-lg shadow-[0_-4px_10px_rgba(255,255,255,0.1)] w-full max-w-fit">
      <h2 className="text-2xl font-bold text-center text-white mb-2">
        Start Your 7 Day Free Trial !
      </h2>
      <form
        onChange={() => {
          setError("");
          setLoading(false);
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 pb-5"
      >
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-white">
              {field.label}
            </label>
            <input
              autoComplete="off"
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
              <span className=" text-sm mt-2 text-transparent">.</span>
            )}
          </div>
        ))}
        <div className=" flex flex-col items-center justify-center md:col-span-full gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button
              type="submit"
              className=" p-2 bg-[#1877F2] text-white rounded transition duration-200"
            >
              Sign Up For Verification
            </button>
          )}

          <a
            href="/"
            className="text-[#70707B]  hover:underline text-sm text-center md:col-span-2"
          >
            Already have an account? Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <div className="relative bg-[#151515] flex flex-col bg-opacity-30 backdrop-blur-xl p-8 rounded-lg shadow-[0_-4px_10px_rgba(255,255,255,0.1)] max-w-md">
      <p className="text-center text-[#70707B] mb-2">Welcome To Skolar Minds</p>
      <h2 className="text-xl font-bold text-center text-white mb-6">
        Account Created Successfully!
      </h2>
      <img
        className="w-28 h-28 object-cover rounded-full self-center"
        src="https://i.ibb.co/mCFDxwH/tick-icon.png"
      />
      <p className="text-green-600 text-center mt-4">
        🎉 Welcome aboard! Your account has been successfully created.
        <br />{" "}
        <span className="text-white">
          You will be able to log in once we verify your account. We will notify
          you once the verification is complete.
        </span>
      </p>

      <div className="flex justify-center text-center mt-4 ">
        <p className="text-[#70707B] text-sm">
          Click Here To Sign In
          <br />
          <a className="text-[#70707B] hover:underline" href="/">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

const SignUpPage = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <div className="relative min-h-screen p-10 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/tY1mPz1/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {showForm ? <Form setShowForm={setShowForm} /> : <SuccessMessage />}
    </div>
  );
};

export default SignUpPage;
