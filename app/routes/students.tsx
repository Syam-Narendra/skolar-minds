import { useState } from "react";
import Dashboard from "~/customComponents/Dashboard";
import StudentForm from "~/customComponents/StudentSection/AddNewStudent";
import { AllStudents } from "~/customComponents/StudentSection/AllStudents";

const studentCategoryList = [
  {
    category: "All Students",
    component: <AllStudents/>,
  },
  {
    category: "Add Student",
    component: <StudentForm/>,
  },
];

export default function Students() {
  const [activeTab, setActiveTab] = useState(studentCategoryList[0]);

  return (
    <Dashboard>
      <div className="w-full flex flex-col">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studentCategoryList.map((each) => (
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
          <div key={activeTab.category}>{activeTab.component}</div>
        </div>
      </div>
    </Dashboard>
  );
}
