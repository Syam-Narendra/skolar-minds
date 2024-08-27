import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { AllClasses } from "~/customComponents/ClassSection/AllClasses";
import Dashboard from "~/customComponents/Dashboard";
import AllSubjects from "~/customComponents/SubjectSection/AllSubjects";
import AssignNewSubject from "~/customComponents/SubjectSection/AssignNewSubject";
import { checkCookie } from "~/server/authentication";

const classesList = [
  {
    title: "All Subjects",
    component: <AllSubjects />,
  },
  {
    title: "Assign Subjects",
    component: <AssignNewSubject />,
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  return checkCookie({ request });
};
export default function Subjects() {
  const loader = useLoaderData();

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
