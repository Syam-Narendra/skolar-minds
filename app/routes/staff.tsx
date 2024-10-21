import { LoaderFunction, Session } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CombinedForm } from "~/customComponents/StaffSection/AddEmployee";
import { AllEmployees } from "~/customComponents/StaffSection/AllEmployees";
import { AppointmentLetter } from "~/customComponents/StaffSection/AppoinmentLetter";
import { EmployeeIdCard } from "~/customComponents/StaffSection/EmployeeIdCard";

import { useState } from "react";
import { checkSession } from "~/server/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = (await checkSession(request)) as Session;
  return session;
};

export default function Staff() {
  const session = useLoaderData<typeof loader>();
  const employeeCategoryList = [
    {
      category: "All Employees",
      component: <AllEmployees session={session} />,
    },
    {
      category: "Add Employee",
      component: <CombinedForm session={session} />,
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
