import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  employeeName: string;
  mobileNumber: number;
  employeeType: string;
  employeeRole: string;
  specifyEmployeeType: string;
};

const formTypes = {
  EmployeeDetails: "EmployeeDetailsForm",
  PersonalDetails: "PersonalDetailsForm",
  CommunicationDetails: "CommunicationDetailsForm",
};

const employeeSpecializationTypes = {
  TeachingStaff: "Teaching Staff",
  NonTeachingStaff: "Non Teaching Staff",
  Management: "Management",
};

export default function App() {
  const [activeForm, setActiveForm] = useState(formTypes.EmployeeDetails);

  const EmployeeDetailsForm = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>();
    const watchedValues = watch();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);
      setActiveForm(formTypes.PersonalDetails);
    };

    const EmployeeSpecializationForm = () => {
      const managementStaff = [
        "Principal",
        "Vice Principal",
        "Operations Manager",
        "Activities Director",
        "Accountant",
        "Stationary Manager",
      ];

      const nonTeachingStaff = [
        "Food Service Staff",
        "Support Staff",
        "Custodial Staff",
        "Security Personnel ",
        "Bus Drivers",
        "Bus Aides",
        "Other Technicians",
      ];

      switch (watchedValues.employeeRole) {
        case employeeSpecializationTypes.TeachingStaff:
          return (
            <option value="Teaching" className="text-white bg-black">
              Teaching
            </option>
          );
        case employeeSpecializationTypes.Management:
          return (
            <>
              {managementStaff.map((each) => (
                <option key={each} className="text-white bg-black">
                  {each}
                </option>
              ))}
            </>
          );
        case employeeSpecializationTypes.NonTeachingStaff:
          return (
            <>
              {nonTeachingStaff.map((each) => (
                <option key={each} className="bg-black text-white">
                  {each}
                </option>
              ))}
            </>
          );
      }
    };

    return (
      <div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-y-3 flex-wrap">
            <div className="w-full mt-3 md:w-1/3 px-2">
              <input
                className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
                placeholder="Name"
                {...register("employeeName", { required: true })}
              />
              {errors.employeeName && (
                <span className="text-red-600">* Required</span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2 ">
              <input
                className="border border-slate-600 rounded-md p-2 w-full bg-transparent text-white focus:outline-none"
                placeholder="Mobile Number"
                type="number"
                {...register("mobileNumber", { required: true, maxLength: 10 })}
              />
              {errors.mobileNumber && (
                <span className="text-red-600">* Invalid Mobile Number</span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2">
              <select
                id="employeeType"
                {...register("employeeType", { required: true })}
                className="w-full bg-transparent border border-slate-600 rounded-md p-2 text-white focus:outline-none"
              >
                <option hidden value="" className="bg-black text-slate-400">
                  Employee Type
                </option>
                <option value="Part Time" className="bg-black">
                  Part Time
                </option>
                <option value="Full Time" className="bg-black">
                  Full Time
                </option>
              </select>
              {errors.employeeType && (
                <span className="text-red-600">
                  * Please select an Employee Type
                </span>
              )}
            </div>

            <div className="w-full md:w-1/3 px-2">
              <select
                id="employeeRole"
                {...register("employeeRole", { required: true })}
                className="w-full bg-transparent border border-slate-600 rounded-md p-2 text-white focus:outline-none"
              >
                <option hidden value="" className="bg-black text-slate-400">
                  Employee Role
                </option>

                {Object.values(employeeSpecializationTypes).map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-black text-white"
                  >
                    {type}
                  </option>
                ))}
              </select>
              {errors.employeeRole && (
                <span className="text-red-600">
                  * Please select an Employee Role
                </span>
              )}
            </div>
            <div className="w-full md:w-1/3 px-2">
              <select
                {...register("specifyEmployeeType", { required: true })}
                className="w-full bg-transparent border border-slate-600 rounded-md p-2 text-white focus:outline-none"
              >
                <option hidden value="" className="bg-black text-slate-400">
                  Specify Employee Role
                </option>
                <EmployeeSpecializationForm />
              </select>
              {errors.specifyEmployeeType && (
                <span className="text-red-600">
                  * Please Specify Employee Type
                </span>
              )}
            </div>
            <div className="w-full flex bg-white md:w-1/3 px-2">
              <h2 className="text-black">Choose image</h2>
              <input type="file"></input>
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

  const PersonalDetailsForm = () => <h1>fhv</h1>;

  const CommunicationDetailsForm = () => <h1>Communication Details</h1>;

  const renderActiveForm = () => {
    switch (activeForm) {
      case formTypes.EmployeeDetails:
        return <EmployeeDetailsForm />;
      case formTypes.PersonalDetails:
        return <PersonalDetailsForm />;
      case formTypes.CommunicationDetails:
        return <CommunicationDetailsForm />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row m-5 p-2 bg-stone-950 rounded-lg bg-272727">
        <button
          onClick={() => setActiveForm(formTypes.EmployeeDetails)}
          className={`${
            activeForm === formTypes.EmployeeDetails && "bg-black text-white"
          } w-full md:w-1/3  p-2 text-gray-400 font-bold rounded-lg`}
        >
          Employee Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.PersonalDetails)}
          className={`${
            activeForm === formTypes.PersonalDetails && "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-md`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.CommunicationDetails)}
          className={`${
            activeForm === formTypes.CommunicationDetails &&
            "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-md`}
        >
          Communicaton Details
        </button>
      </div>

      <div className="space-y-4 pl-5">
        <h1 className="text-white px-2">Add New Employee</h1>
        {renderActiveForm()}
      </div>
    </div>
  );
}
