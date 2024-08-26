import { useState } from "react";
import { AllClasses } from "~/customComponents/ClassSection/AllClasses";
import CreateNewClass from "~/customComponents/ClassSection/CreateNewClass";
import Dashboard from "~/customComponents/Dashboard";

const classesList = [
  {
    title: "All Classes",
    component: <AllClasses />,
  },
  {
    title: "Create Class",
    component: <CreateNewClass/>,
  },
];
export default function Classess() {
  const [activeTab, setActiveTab] = useState(classesList[0]);
  return (
    <Dashboard>
      <div className="w-full flex flex-col">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classesList.map((each) => (
            <button
              key={each.title}
              onClick={() => setActiveTab(each)}
              className={`py-2 px-4 text-center focus:outline-none ${
                activeTab.title === each.title
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {each.title}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div>{activeTab.component}</div>
        </div>
      </div>
    </Dashboard>
  );
}
