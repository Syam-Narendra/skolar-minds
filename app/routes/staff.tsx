import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Dashboard from "~/customComponents/Dashboard";
import { checkCookie } from "~/server/authentication";
import { AddEmployee } from "~/customComponents/StaffSection/AddEmployee/AddEmployee";
import { AllEmployees } from "~/customComponents/StaffSection/AllEmployees";
import { AppointmentLetter } from "~/customComponents/StaffSection/AppoinmentLetter";
import { EmployeeIdCard } from "~/customComponents/StaffSection/EmployeeIdCard";
const employeeCategoryList = [
  {
    category: "All Employees",
    component: <AllEmployees />,
  },
  {
    category: "Add Employee",
    component: <AddEmployee />,
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
  const loader = useLoaderData();
  const [employeeCategory, setEmployeeCategory] = useState(
    employeeCategoryList[0]
  );
  return (
    <Dashboard>
      <div className="flex flex-col flex-wrap justify-around items-center">
        <div className="items-center flex flex-wrap">
          {employeeCategoryList.map((each, index) => {
            const activeButton =
              employeeCategory.category === each.category
                ? "bg-black text-white border border-[#9CA3AF]"
                : "bg-[#0C0A09] text-[#9CA3AF]";
            return (
              <button
                onClick={() => setEmployeeCategory(each)}
                key={index}
                className={`items-center content-center w-52 h-24 rounded-2xl p-4 m-2`}
              >
                <h2 className="flex justify-around items-center text-lg text-center font-semibold">
                  {each.category}
                </h2>
              </button>
            );
          })}
        </div>
        <h1>{employeeCategory.component}</h1>
      </div>
    </Dashboard>
  );
}
