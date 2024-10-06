import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CombinedForm } from "~/customComponents/StaffSection/AddEmployee";
import { AllEmployees } from "~/customComponents/StaffSection/AllEmployees";
import { AppointmentLetter } from "~/customComponents/StaffSection/AppoinmentLetter";
import { EmployeeIdCard } from "~/customComponents/StaffSection/EmployeeIdCard";

import { useState } from "react";
import { checkSession } from "~/server/sessions";

const employeeCategoryList = [
  {
    category: "All Employees",
    component: <AllEmployees />,
  },
  {
    category: "Add Employee",
    component: <CombinedForm />,
  },
  {
    category: "Employee ID Card",
    component: <EmployeeIdCard />,
  },
  {
    category: "Appointment Letter",
    component: <AppointmentLetter />,
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  return await checkSession(request);
};

export default function Staff() {
  const loaderData = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState(employeeCategoryList[0]);

  return (
    <div className="w-full flex flex-col">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {employeeCategoryList.map((each) => (
          <button
            key={each.category}
            onClick={() => setActiveTab(each)}
            className={`py-2 px-4 text-center focus:outline-none ${
              activeTab.category === each.category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {each.category}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div>{activeTab.component}</div>
      </div>
    </div>
  );
}
