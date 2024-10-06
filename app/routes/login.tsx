import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { commitSession, getSession } from "~/server/sessions";

export const action = async ({ request }: { request: Request }) => {
  const token = await request.json();
  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", token);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return redirect("/");
  }
  return null;
};

const SigninPage = () => {
  const loader = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ loginEmail: string; loginPassword: string }>();
  const [responseError, setResponseError] = useState<{
    colour: string;
    message: string;
  }>({ colour: "", message: "" });
  const [isLoading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<{
    loginEmail: string;
    loginPassword: string;
  }> = async (data) => {
    setResponseError({ colour: "", message: "" });
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        message: string;
        token: string;
      };
      console.log(result);
      setLoading(false);
      if (response.status === 202) {
        setResponseError({
          colour: "text-yellow-500",
          message: result.message,
        });
      } else if (
        response.status === 404 ||
        response.status === 401 ||
        response.status === 400
      ) {
        setResponseError({
          colour: "text-red-500",
          message: result.message,
        });
      } else if (response.status === 200) {
        // Cookies.set("token", result.token, { expires: 1 });
        // navigate("/", { replace: true });
        await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: result.token,
          }),
        });
      }
    } catch (error) {
      setLoading(false);
      const err = error as Error;
      setResponseError({
        colour: "text-red-500",
        message: err.message,
      });
    }
  };
  const formFields = [
    {
      name: "loginEmail",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "loginPassword",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/tY1mPz1/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative bg-[#151515] bg-opacity-30 backdrop-blur-xl p-8 rounded-lg shadow-[0_-4px_10px_rgba(255,255,255,0.1)] w-full max-w-sm">
        <p className="text-center text-[#70707B] mb-2">Welcome Back</p>
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign in to Skolar Minds
        </h2>
        <form
          method="POST"
          action="/login"
          className="grid grid-cols-1 gap-3 pt-5 pb-5"
          onChange={() => setResponseError({ colour: "", message: "" })}
        >
          <div className="flex flex-col">
            <label className="text-white mb-1" htmlFor="loginEmail">
              Email
            </label>
            <input
              placeholder="Enter your email"
              id="loginEmail"
              {...register("loginEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="text"
              className="p-2 rounded-lg bg-transparent border-2 border-[#70707B] text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
            />
            {errors.loginEmail && (
              <span className="text-red-500 text-sm mt-2">
                {errors.loginEmail?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1" htmlFor="loginPassword">
              Password
            </label>
            <input
              placeholder="Enter your password"
              id="loginPassword"
              {...register("loginPassword", {
                required: "Password is required",
              })}
              type="password"
              className="p-2 rounded-lg bg-transparent border-2 border-[#70707B] text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
            />
            {errors.loginPassword && (
              <span className="text-red-500 text-sm mt-2">
                {errors.loginPassword?.message}
              </span>
            )}
          </div>

          <p className={responseError.colour}>{responseError.message}</p>
          <div className="flex flex-col items-center justify-center">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full p-2 bg-[#1877F2] text-white rounded mt-3 transition duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
        <div className="flex justify-between ">
          <p className="text-[#70707B] text-sm">
            Don't have an account?
            <br />
            <a className="text-[#70707B] hover:underline" href="/signup">
              Sign Up
            </a>
          </p>
          <p className="text-[#70707B] text-sm">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
