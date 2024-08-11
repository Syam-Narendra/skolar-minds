import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Dashboard from "~/customComponents/Dashboard";
import { checkCookie } from "~/server/authentication";
import { CombinedForm } from "~/customComponents/StaffSection/AddEmployee/AddEmployee";
import { AllEmployees } from "~/customComponents/StaffSection/AllEmployees";
import { AppointmentLetter } from "~/customComponents/StaffSection/AppoinmentLetter";
import { EmployeeIdCard } from "~/customComponents/StaffSection/EmployeeIdCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useState } from "react";

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
  return checkCookie({ request });
};

export default function Staff() {
  const loaderData = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState(employeeCategoryList[0].category);

  return (
    <Dashboard>
      <div className="w-full flex flex-col">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {employeeCategoryList.map((each) => (
            <button
              key={each.category}
              onClick={() => setActiveTab(each.category)}
              className={`py-2 px-4 text-center focus:outline-none ${
                activeTab === each.category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {each.category}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {employeeCategoryList.map(
            (each) =>
              activeTab === each.category && (
                <div key={each.category}>{each.component}</div>
              )
          )}
        </div>
      </div>
    </Dashboard>
  );
}
