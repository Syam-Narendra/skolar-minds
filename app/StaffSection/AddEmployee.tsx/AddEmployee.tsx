import { useState } from "react";
import { IntialDetailsForm } from "~/StaffSection/AddEmployee.tsx/intialDetailsForm";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { CommunicationDetailsForm } from "./CommunicationDetailsForm";

const formTypes = {
  EmployeeDetails: "EmployeeDetailsForm",
  PersonalDetails: "PersonalDetailsForm",
  CommunicationDetails: "CommunicationDetailsForm",
};

export const AddEmployee = () => {
  const [activeForm, setActiveForm] = useState(formTypes.EmployeeDetails);

  const renderActiveForm = () => {
    switch (activeForm) {
      case formTypes.EmployeeDetails:
        return <IntialDetailsForm />;
      case formTypes.PersonalDetails:
        return <PersonalDetailsForm />;
      case formTypes.CommunicationDetails:
        return <CommunicationDetailsForm />;
      default:
        return null;
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
          Communicaton Details
        </button>
      </div>

      <div className="space-y-4 pl-5">{renderActiveForm()}</div>
    </div>
  );
};
