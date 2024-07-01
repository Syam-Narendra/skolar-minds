import { useState } from "react";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { CommunicationDetailsForm } from "./CommunicationDetailsForm";
import { IntialDetailsForm } from "./IntialDetailsForm";
import { formTypes } from "./globalVariables";

export const AddEmployee = () => {
  const [activeForm, setActiveForm] = useState<string>(
    formTypes.EmployeeDetails
  );

  const renderActiveForm = () => {
    switch (activeForm) {
      case formTypes.EmployeeDetails:
        return <IntialDetailsForm changeTab={setActiveForm} />;
      case formTypes.PersonalDetails:
        return <PersonalDetailsForm changeTab={setActiveForm} />;
      case formTypes.CommunicationDetails:
        return <CommunicationDetailsForm />;
      default:
        return <h1>Something Went Wrong</h1>;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row m-5 p-2 bg-stone-950 rounded-[0.5rem] bg-272727">
        <button
          onClick={() => setActiveForm(formTypes.EmployeeDetails)}
          className={`${
            activeForm === formTypes.EmployeeDetails && "bg-black text-white"
          } w-full md:w-1/3  p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Employee Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.PersonalDetails)}
          className={`${
            activeForm === formTypes.PersonalDetails && "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveForm(formTypes.CommunicationDetails)}
          className={`${
            activeForm === formTypes.CommunicationDetails &&
            "bg-black text-white"
          } w-full md:w-1/3 p-2 text-gray-400 font-bold rounded-[0.5rem]`}
        >
          Communication Details
        </button>
      </div>

      <div className="space-y-4 pl-5">{renderActiveForm()}</div>
    </div>
  );
};
